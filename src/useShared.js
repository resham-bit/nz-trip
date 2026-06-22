import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://fcyiofflkgdmilvgojfl.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_e4R8VBK8uKLhvouRHqLaaQ_oYFHjfW-";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const cache = {};
const listeners = {};

function notify(key) {
  (listeners[key] || []).forEach(fn => fn());
}

async function fetchKey(key) {
  const { data } = await supabase
    .from("trip_data")
    .select("value")
    .eq("key", key)
    .single();
  if (data) {
    try { cache[key] = JSON.parse(data.value); } catch(e) { cache[key] = data.value; }
  }
  notify(key);
}

async function writeKey(key, value) {
  await supabase
    .from("trip_data")
    .upsert({ key, value: JSON.stringify(value) }, { onConflict: "key" });
}

export function useShared(key, defaultValue) {
  const [, forceRender] = useState(0);
  const [syncing, setSyncing] = useState(false);
  const writeTimer = useRef(null);

  useEffect(() => {
    if (!listeners[key]) listeners[key] = [];
    const fn = () => forceRender(n => n + 1);
    listeners[key].push(fn);
    if (cache[key] === undefined) fetchKey(key);

    const channel = supabase
      .channel(`realtime:${key}`)
      .on("postgres_changes", {
        event: "*", schema: "public", table: "trip_data", filter: `key=eq.${key}`
      }, (payload) => {
        if (payload.new?.value) {
          try { cache[key] = JSON.parse(payload.new.value); } catch(e) { cache[key] = payload.new.value; }
          notify(key);
        }
      }).subscribe();

    return () => {
      listeners[key] = listeners[key].filter(f => f !== fn);
      supabase.removeChannel(channel);
    };
  }, [key]);

  const value = cache[key] !== undefined ? cache[key] : defaultValue;

  const setValue = useCallback((newVal) => {
    cache[key] = newVal;
    notify(key);
    setSyncing(true);
    if (writeTimer.current) clearTimeout(writeTimer.current);
    writeTimer.current = setTimeout(async () => {
      await writeKey(key, newVal);
      setSyncing(false);
    }, 600);
  }, [key]);

  return [value, setValue, syncing];
}

export { supabase };
