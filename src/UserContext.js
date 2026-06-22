import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("nz_user");
    if (saved) setUser(saved);
  }, []);

  const selectUser = (u) => {
    setUser(u);
    localStorage.setItem("nz_user", u);
  };

  return (
    <UserContext.Provider value={{ user, selectUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() { return useContext(UserContext); }
