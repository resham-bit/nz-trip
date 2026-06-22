export const DAYS = [
  {
    date: "Fri 29 Aug", loc: "Queenstown", color: "#378ADD", drive: null,
    title: "Arrive Queenstown 🥂", tags: ["Relaxed"],
    admin: ["Shashank collects rental car from QT Airport before arrival."],
    main: [
      { icon: "✈️", text: "Land ~6pm — Shashank picks up from arrivals, check in, freshen up." },
      { icon: "🥂", text: "Anniversary dinner — options in the section below." }
    ],
    optional: null,
    linkGroups: ["🏨 Where to stay", "🍽️ Restaurant options"],
    sleep: "🏨 Hotel or Airbnb in Queenstown — town centre.",
  },
  {
    date: "Sat 30 Aug", loc: "Queenstown", color: "#378ADD", drive: null,
    title: "Full Queenstown day", tags: ["Activity"],
    admin: null,
    main: [
      { icon: "🍔", text: "Fergburger — go before noon to beat the queue." },
      { icon: "🚡", text: "Skyline Gondola — golden hour views over the lake and Remarkables." }
    ],
    optional: [
      { icon: "🚶", text: "Queenstown Hill walk? — 2 hr return, panoramic views." },
      { icon: "🪂", text: "Kawarau Bungy? — world's first, 43m above the gorge. Book in advance." }
    ],
    linkGroups: ["🏨 Where to stay", "🍽️ Restaurant options"],
    sleep: "🏨 Same hotel/Airbnb.",
  },
  {
    date: "Sun 31 Aug", loc: "QT → Mt Cook", color: "#2A7AB5", drive: "3.5 hrs",
    title: "Drive to Mt Cook + Hooker Valley 🏔️", tags: ["Drive day", "Big hike"],
    admin: null,
    main: [
      { icon: "🚗", text: "Drive QT → Mt Cook (~3.5 hrs) via Cromwell + Twizel. Stop at Lake Pukaki." },
      { icon: "🧊", text: "Tasman Glacier View walk — 1 hr return. Iceberg lake overlook. Morning." },
      { icon: "🥾", text: "Hooker Valley Track — 4 hrs return. Three swing bridges, terminal glacier lake, Aoraki ahead. Afternoon." }
    ],
    optional: [
      { icon: "🚤", text: "Tasman Glacier boat tour? — right up to the glacier face. Check availability at The Hermitage." }
    ],
    linkGroups: ["🏨 Where to stay"],
    sleep: "🏨 The Hermitage Hotel or Glentanner Park campsite.",
    alert: "Book The Hermitage or Glentanner Park immediately — very limited beds."
  },
  {
    date: "Mon 1 Sep", loc: "Aoraki/Mt Cook", color: "#2A7AB5", drive: null,
    title: "Skydive Mt Cook 🪂", tags: ["Activity"],
    admin: ["Check weather with Skydive Mt Cook first thing — go/no-go confirmed early morning."],
    main: [
      { icon: "🪂", text: "Skydive Mt Cook — 16,500ft tandem. Aoraki, Tasman Glacier + Mackenzie Basin below. ~3 hrs total." }
    ],
    optional: [
      { icon: "🥾", text: "Kea Point Track? — 2 hrs return, easy Mueller Glacier viewpoint. Backup if skydive cancelled." },
      { icon: "🦅", text: "Spot kea — alpine parrots around the village. Will investigate your car." }
    ],
    linkGroups: [],
    sleep: "🏨 Same as previous night.",
    alert: "Book at skydivemtcook.com. Confirm the day before."
  },
  {
    date: "Tue 2 Sep", loc: "Mt Cook → Tekapo", color: "#1D9E75", drive: "1.5 hrs",
    title: "Drive to Tekapo + stargazing 🔭", tags: ["Drive day", "Stargazing"],
    admin: null,
    main: [
      { icon: "🚗", text: "Drive Mt Cook → Tekapo (~1.5 hrs). Lake Pukaki from the other direction." },
      { icon: "💙", text: "Church of the Good Shepherd + lakefront walk. Turquoise lake, iconic stone church." },
      { icon: "🔭", text: "Dark Sky Project stargazing tour (~7pm). Mt John Observatory summit. Book well ahead." }
    ],
    optional: [
      { icon: "♨️", text: "Tekapo Springs? — hot pools with lake views, before the night tour." }
    ],
    linkGroups: ["🏨 Where to stay", "🍽️ Restaurant options"],
    sleep: "🏨 Airbnb or hotel in Tekapo.",
  },
  {
    date: "Wed 3 Sep", loc: "Lake Tekapo", color: "#1D9E75", drive: null,
    title: "Tekapo slow day", tags: ["Relaxed"],
    admin: null,
    main: [
      { icon: "🏔️", text: "Mt John summit walk — 3 hrs return. 360° views over both Tekapo + Alexandrina lakes." },
      { icon: "♨️", text: "Tekapo Springs — outdoor hot pools with lake + mountain views. ~10am–9pm." }
    ],
    optional: [
      { icon: "🔭", text: "Backup stargazing? — rebook Dark Sky Project if last night was clouded out." }
    ],
    linkGroups: ["🍽️ Restaurant options"],
    sleep: "🏨 Same Airbnb/hotel.",
  },
  {
    date: "Thu 4 Sep", loc: "Tekapo → Wanaka", color: "#7F77DD", drive: "2.5 hrs",
    title: "Drive to Wanaka", tags: ["Drive day"],
    admin: null,
    main: [
      { icon: "🚗", text: "Drive Tekapo → Wanaka (~2.5 hrs) via Twizel + Cromwell." },
      { icon: "📸", text: "Wanaka Tree + lakefront — arrive for golden hour (~5:50pm)." }
    ],
    optional: [
      { icon: "🍑", text: "Stop in Cromwell? — historic stone precinct, good lunch spot." },
      { icon: "🌙", text: "Early night — Roy's Peak tomorrow." }
    ],
    linkGroups: ["🏨 Where to stay", "🍽️ Restaurant options"],
    sleep: "🏨 Hotel or Airbnb in Wanaka — town centre.",
  },
  {
    date: "Fri 5 Sep", loc: "Wanaka", color: "#7F77DD", drive: null,
    title: "Roy's Peak 🏔️", tags: ["Big hike"],
    admin: ["Check DOC conditions at doc.govt.nz the night before."],
    main: [
      { icon: "⏰", text: "Leave by 7am — headtorches needed first 30 min." },
      { icon: "🏔️", text: "Roy's Peak — 16km return, ~1,200m gain, ~6–7 hrs. Microspikes + poles for upper section." }
    ],
    optional: [
      { icon: "🎬", text: "Cinema Paradiso? — quirky cinema, couches + intermission cookies." }
    ],
    linkGroups: ["🍽️ Restaurant options"],
    sleep: "🏨 Same hotel/Airbnb.",
    weather: "Snow above 1,200m likely. Bring poles, microspikes, 3L water, full waterproofs."
  },
  {
    date: "Sat 6 Sep", loc: "Wanaka → Te Anau", color: "#D85A30", drive: "2.5 hrs",
    title: "Drive to Te Anau — glowworm caves + campervan 🚐", tags: ["Drive day", "Activity"],
    admin: [
      "Drop rental car in Te Anau — arrange one-way drop before the trip.",
      "Collect campervan — Apollo or Wilderness depot, Te Anau. Full walk-around.",
      "Stock up on food + fuel in Te Anau — nothing at Milford Sound."
    ],
    main: [
      { icon: "🚗", text: "Drive Wanaka → Te Anau (~2.5 hrs) via Kingston." },
      { icon: "🦆", text: "Te Anau Glowworm Caves — book afternoon departure. ~1.5 hrs boat tour." }
    ],
    optional: [
      { icon: "🍝", text: "Redcliff Café? — local game meats, cosy atmosphere. Best in Te Anau." }
    ],
    linkGroups: ["🍽️ Restaurant options"],
    sleep: "🚐 Campervan — Te Anau TOP 10 Holiday Park.",
    alert: "Book glowworm caves — fiordlandexpeditions.co.nz."
  },
  {
    date: "Sun 7 Sep", loc: "Te Anau → Milford Sound", color: "#D85A30", drive: "2 hrs total",
    title: "Lake Marian + drive to Milford 🏔️", tags: ["Big hike", "Drive day"],
    admin: ["Check NZTA for Milford Road conditions the night before — nzta.govt.nz."],
    main: [
      { icon: "🚗", text: "Leave Te Anau by 9:30am. Turn off at Hollyford Road past The Divide. Start hike by 11am." },
      { icon: "🏔️", text: "Lake Marian — 4–5 hrs return (allow time to sit and soak it in). Steep rainforest climb to glacial alpine lake. Don't walk around lake edge (avalanche risk)." },
      { icon: "🚗", text: "Continue Milford Road — Mirror Lakes, Homer Tunnel, Avenue of the Disappearing Mountain. Arrive ~6–6:30pm." }
    ],
    optional: [
      { icon: "🍽️", text: "Pio Pio Restaurant? — on site at Milford Sound Lodge. Book ahead, only option." }
    ],
    linkGroups: [],
    sleep: "🚐 Milford Sound Lodge Rainforest Campervan Park — powered site. Only 20 sites.",
    alert: "Book Milford Sound Lodge immediately — milfordlodge.com. Only 20 sites."
  },
  {
    date: "Mon 8 Sep", loc: "Milford Sound → Te Anau", color: "#D85A30", drive: "1.5 hrs",
    title: "Milford Sound — dawn + cruise 🛥️", tags: ["Activity"],
    admin: null,
    main: [
      { icon: "🌅", text: "First light at the fiord (~7am) — foreshore before buses arrive. Mist, silence, waterfalls." },
      { icon: "⛵", text: "Morning cruise (~9 or 10am, 2 hrs) — waterfalls at peak volume, Mitre Peak dusted in snow." },
      { icon: "🚗", text: "Drive back to Te Anau (~1.5 hrs). Stop at The Chasm — 20 min walk." }
    ],
    optional: [
      { icon: "🍺", text: "Afternoon rest in Te Anau — lakefront walk, relax." }
    ],
    linkGroups: ["🍽️ Restaurant options"],
    sleep: "🚐 Campervan — Te Anau TOP 10 or Freedom Camp lakefront.",
    alert: "Book Milford Sound cruise — realjourneys.co.nz."
  },
  {
    date: "Tue 9 Sep", loc: "Te Anau → Queenstown", color: "#378ADD", drive: "2 hrs",
    title: "Drop campervan + drive to Queenstown 🔄", tags: ["Drive day"],
    admin: [
      "Return campervan — full walk-around with attendant before handing over.",
      "Collect rental car in Te Anau — confirm pickup point in advance."
    ],
    main: [
      { icon: "🚗", text: "Drive Te Anau → Queenstown (~2 hrs) via Kingston." },
      { icon: "🌆", text: "Arrive Queenstown — check in, lakefront walk, dinner out." }
    ],
    optional: null,
    linkGroups: ["🏨 Where to stay", "🍽️ Restaurant options"],
    sleep: "🏨 Hotel or Airbnb in Queenstown.",
  },
  {
    date: "Wed 10 Sep", loc: "Queenstown", color: "#378ADD", drive: null,
    title: "Spare Day 1 — TBD", tags: ["Spare day"],
    admin: null,
    main: [
      { icon: "🗺️", text: "TBD — Glenorchy + Dart River jet boat is the top candidate." }
    ],
    optional: null,
    linkGroups: ["🍽️ Restaurant options"],
    sleep: "🏨 Hotel or Airbnb in Queenstown.",
  },
  {
    date: "Thu 11 Sep", loc: "Queenstown", color: "#378ADD", drive: null,
    title: "Spare Day 2 — TBD", tags: ["Spare day"],
    admin: null,
    main: [
      { icon: "🗺️", text: "TBD — Arrowtown, wine country, Onsen Hot Pools, or slow lakefront day." },
      { icon: "🍽️", text: "Last big dinner — Amisfield (book ahead) or Botswana Butchery." }
    ],
    optional: null,
    linkGroups: ["🍽️ Restaurant options"],
    sleep: "🏨 Hotel or Airbnb in Queenstown.",
  },
  {
    date: "Fri 12 Sep", loc: "Queenstown → Home", color: "#378ADD", drive: null,
    title: "Fly home ✈️", tags: ["Relaxed"],
    admin: ["Return rental car at QT Airport — allow 30 min before check-in."],
    main: [
      { icon: "☕", text: "Slow morning — lakefront coffee, last walk." },
      { icon: "✈️", text: "Fly home from Queenstown Airport." }
    ],
    optional: null,
    linkGroups: [],
    sleep: "",
  }
];

export const TAG_COLORS = {
  "Relaxed":    { background: "#eeedfe", color: "#534ab7" },
  "Activity":   { background: "#faeeda", color: "#854f0b" },
  "Drive day":  { background: "#e6f1fb", color: "#185fa5" },
  "Big hike":   { background: "#e1f5ee", color: "#0f6e56" },
  "Stargazing": { background: "#2c2c2a", color: "#d3d1c7" },
  "Spare day":  { background: "#f5e6fb", color: "#7a3fa8" },
};

export const CHECKLIST = [
  ["Milford Sound Lodge campervan site", "milfordlodge.com · Only 20 sites. Book immediately."],
  ["Rental car", "Aug 29 pickup QT Airport. One-way drop in Te Anau (Day 9) + same-day re-pickup."],
  ["Campervan (Fiordland)", "Pick up + drop off Te Anau, 3 nights. Apollo or Wilderness Motorhomes."],
  ["Skydive Mt Cook", "skydivemtcook.com · Day 4. Heavily weather dependent — confirm day before."],
  ["The Hermitage or Glentanner Park, Mt Cook", "Days 3–4. Very limited — book immediately."],
  ["Dark Sky Project stargazing, Tekapo", "darkskyproject.co.nz · Day 5"],
  ["Te Anau Glowworm Caves", "fiordlandexpeditions.co.nz · Day 9 afternoon"],
  ["Milford Sound cruise", "realjourneys.co.nz · Day 11"],
  ["Glendhu Bay Motor Camp, Wanaka", "Days 7–8"],
  ["Anniversary dinner", "Amisfield, Rata, or Botswana Butchery · Day 1"],
];
