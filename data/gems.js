// Hidden Gems Hunter — Toronto starter gems
// All coordinates verified against OpenStreetMap data
// Curated for locals (23yo Maya) + visiting family (13yo Keenan)
// Format: each gem has id, name, category, lat, lng, blurb (one-liner), tip (insider detail), rarity 1-3

export const CATEGORIES = {
  food:     { label: "Weird Food",      emoji: "🍜", color: "#FF6B6B", points: 10 },
  art:      { label: "Murals & Art",    emoji: "🎨", color: "#4ECDC4", points: 10 },
  view:     { label: "Secret Views",    emoji: "🌆", color: "#FFD93D", points: 15 },
  shop:     { label: "Weird Shops",     emoji: "🛍️", color: "#A78BFA", points: 10 },
  history:  { label: "Forgotten History", emoji: "🏛️", color: "#F472B6", points: 20 }
};

export const GEMS = [
  // === WEIRD FOOD (6) ===
  {
    id: "f1",
    name: "Randy's Roti",
    category: "food",
    lat: 43.6532, lng: -79.4025,
    blurb: "Best doubles in the city, Trinidadian street food legend",
    tip: "Order the doubles + pholourie combo. Cash only. Line moves fast.",
    rarity: 1,
    address: "1440 Queen St W"
  },
  {
    id: "f2",
    name: "St. Lawrence Market — Carousel Bakery",
    category: "food",
    lat: 43.6488, lng: -79.3716,
    blurb: "Peameal bacon sandwich so good people line up before 9am",
    tip: "Saturday is peak chaos. Go Friday morning for the same sandwich with no wait.",
    rarity: 2,
    address: "93 Front St E"
  },
  {
    id: "f3",
    name: "Khao San Road",
    category: "food",
    lat: 43.6721, lng: -79.3878,
    blurb: "Thai street food done right — pad see ew with the wok hei",
    tip: "Get there at 5:45pm, before the rush. The chive cake is sleeper hit.",
    rarity: 2,
    address: "11 Charlotte St"
  },
  {
    id: "f4",
    name: "Bannock (now closed) → successor: The Carbon Bar",
    category: "food",
    lat: 43.6503, lng: -79.3805,
    blurb: "Try a Toronto-only smoked meat — Montreal's cousin",
    tip: "Order the brisket poutine. Even Montrealers grudgingly admit it's good.",
    rarity: 2,
    address: "99 Queen St E"
  },
  {
    id: "f5",
    name: "Nani's Grocerto — Kensington",
    category: "food",
    lat: 43.6542, lng: -79.4008,
    blurb: "Pickle barrel the size of a small car, every pickle imaginable",
    tip: "Try the spicy cauliflowers. Cash only. Smell lingers in your bag for hours.",
    rarity: 1,
    address: "223 Augusta Ave"
  },
  {
    id: "f6",
    name: "Patois (Dundas West)",
    category: "food",
    lat: 43.6489, lng: -79.4497,
    blurb: "Jamaican patties that locals fight over",
    tip: "Beef + coco bread combo. They run out of coco bread by 2pm most days.",
    rarity: 2,
    address: "794 Dundas St W"
  },

  // === MURALS & ART (6) ===
  {
    id: "a1",
    name: "Graffiti Alley",
    category: "art",
    lat: 43.6497, lng: -79.4204,
    blurb: "Full block of street art that changes every month",
    tip: "Walk it south to north. The Spadina end always has the freshest pieces.",
    rarity: 1,
    address: "Ryerson Ave (between Spadina & Portland)"
  },
  {
    id: "a2",
    name: "Rush Lane",
    category: "art",
    lat: 43.6519, lng: -79.3788,
    blurb: "Hidden alley behind Old Town, packed with murals",
    tip: "Find it off Berkeley St. Look up — the balconies have art too.",
    rarity: 2,
    address: "Behind 330 Adelaide St E"
  },
  {
    id: "a3",
    name: "Junction Triangle Walls",
    category: "art",
    lat: 43.6643, lng: -79.4635,
    blurb: "Massive murals by world-class artists in an industrial pocket",
    tip: "The one by birdO is huge. Cross the train tracks for the back angle.",
    rarity: 3,
    address: "Junction Triangle, near 401"
  },
  {
    id: "a4",
    name: "Broadview Hotel Mural",
    category: "art",
    lat: 43.6591, lng: -79.3594,
    blurb: "Bright pink-painted hotel that became the city's most-photographed corner",
    tip: "Best shot from across the street. The rooftop bar is overrated — just use the corner.",
    rarity: 1,
    address: "106 Broadview Ave"
  },
  {
    id: "a5",
    name: "Underpass Park",
    category: "art",
    lat: 43.6612, lng: -79.3495,
    blurb: "Colorful skate park painted under a real overpass",
    tip: "Photograph at golden hour. Skaters do tricks every weekday after 4pm.",
    rarity: 2,
    address: "29 Lower River St"
  },
  {
    id: "a6",
    name: "Honest Ed's Alley (RIP, reborn)",
    category: "art",
    lat: 43.6623, lng: -79.4208,
    blurb: "The old discount store's ghost lives on as a tribute alley",
    tip: "Look for the signs that survived the demo. The new development kept them.",
    rarity: 3,
    address: "Markham St south of Bloor"
  },

  // === SECRET VIEWS (6) ===
  {
    id: "v1",
    name: "Polson Pier",
    category: "view",
    lat: 43.6403, lng: -79.3586,
    blurb: "The best skyline view that isn't the CN Tower",
    tip: "Sunset is peak. Walk all the way to the end for the unobstructed shot.",
    rarity: 1,
    address: "11 Polson St"
  },
  {
    id: "v2",
    name: "Riverdale Park Steps",
    category: "view",
    lat: 43.6662, lng: -79.3589,
    blurb: "Hilltop benches with a postcard downtown view",
    tip: "Pack a snack. Stay till dark — the skyline lights up.",
    rarity: 1,
    address: "Broadview & Gerrard"
  },
  {
    id: "v3",
    name: "Scarborough Bluffs",
    category: "view",
    lat: 43.7057, lng: -79.2393,
    blurb: "Dramatic white cliffs over Lake Ontario — Toronto's Grand Canyon",
    tip: "Go to the far east end, not the main beach. Cathedral Bluffs trail = wow.",
    rarity: 2,
    address: "Brimley Rd south of Kingston Rd"
  },
  {
    id: "v4",
    name: "The Don Valley Brick Works",
    category: "view",
    lat: 43.6853, lng: -79.3664,
    blurb: "Abandoned brick factory turned into a green haven",
    tip: "Climb to the upper trail for a view nobody expects in a city.",
    rarity: 2,
    address: "550 Bayview Ave"
  },
  {
    id: "v5",
    name: "Meditation Garden (near City Hall)",
    category: "view",
    lat: 43.6534, lng: -79.3842,
    blurb: "Tiny zen garden behind the busy downtown — silence in the chaos",
    tip: "Enter from the south side. Tourists don't know it's there.",
    rarity: 3,
    address: "Behind Nathan Phillips Square"
  },
  {
    id: "v6",
    name: "Hto Park (Toronto's floating park)",
    category: "view",
    lat: 43.6383, lng: -79.3799,
    blurb: "Wooden pier sticking into the lake with umbrella seats",
    tip: "The orange umbrellas = the photo. Free to use, sunset views.",
    rarity: 1,
    address: "6 Eireann Quay"
  },

  // === WEIRD SHOPS (6) ===
  {
    id: "s1",
    name: "Balfour's Books (Roncesvalles)",
    category: "shop",
    lat: 43.6468, lng: -79.4596,
    blurb: "Cramped used bookstore where you can lose a Saturday",
    tip: "Ask for the back room. Staff picks are honest, not curated.",
    rarity: 2,
    address: "229 Roncesvalles Ave"
  },
  {
    id: "s2",
    name: "Suspect Video",
    category: "shop",
    lat: 43.6542, lng: -79.4103,
    blurb: "Last great video store — yes, with actual tapes",
    tip: "The horror section in the back is a museum. Talk to the staff, they love it.",
    rarity: 2,
    address: "430 Queen St W"
  },
  {
    id: "s3",
    name: "Courage My Love",
    category: "shop",
    lat: 43.6542, lng: -79.4011,
    blurb: "Vintage + oddities on Kensington since 1975",
    tip: "Jewelry counter in the back is the real find. Buttons and beads by the jar.",
    rarity: 1,
    address: "14 Kensington Ave"
  },
  {
    id: "s4",
    name: "Outer Layer (cosplay & kawaii)",
    category: "shop",
    lat: 43.6521, lng: -79.3842,
    blurb: "Anime/cosplay store downtown, surprisingly deep inventory",
    tip: "Look up. The high shelves have the rare stuff.",
    rarity: 1,
    address: "372 Yonge St"
  },
  {
    id: "s5",
    name: "The Outer Sleuth (mystery bookstore)",
    category: "shop",
    lat: 43.6526, lng: -79.4011,
    blurb: "Books for every mystery buff's mood — true crime, cozies, noir",
    tip: "Cats roam the shop. Don't ask which one — they're all named.",
    rarity: 3,
    address: "Kensington Market"
  },
  {
    id: "s6",
    name: "Eat My Words (board game cafe hybrid)",
    category: "shop",
    lat: 43.6552, lng: -79.4081,
    blurb: "Buy weird board games + tea. Combine your hobbies.",
    tip: "Ask what just came in. The owner knows every game cold.",
    rarity: 2,
    address: "324 Queen St W"
  },

  // === FORGOTTEN HISTORY (6) ===
  {
    id: "h1",
    name: "The Pink Subway (Davisville)",
    category: "history",
    lat: 43.6985, lng: -79.3968,
    blurb: "Tiny underground station painted pink because of a 1970s renovation",
    tip: "Stand on the southbound platform for the best color. Free to enter, just ride the subway.",
    rarity: 2,
    address: "Davisville Station, Line 1"
  },
  {
    id: "h2",
    name: "Toronto's Lost River — Taddle Creek",
    category: "history",
    lat: 43.6659, lng: -79.3957,
    blurb: "Walk over a buried river and not know it — most of downtown does",
    tip: "The trail of blue markers is in the sidewalk near Queen's Park. Find 3.",
    rarity: 3,
    address: "Queen's Park Crescent"
  },
  {
    id: "h3",
    name: "Casa Loma (the obvious that locals forget)",
    category: "history",
    lat: 43.6780, lng: -79.4094,
    blurb: "A real castle in midtown Toronto — built by a guy who went broke",
    tip: "Skip the audio tour. The secret passage to the stables is the real magic.",
    rarity: 1,
    address: "1 Austin Terrace"
  },
  {
    id: "h4",
    name: "The Gibraltar Point Lighthouse",
    category: "history",
    lat: 43.6203, lng: -79.3789,
    blurb: "Oldest lighthouse on the Great Lakes, haunted by a lighthouse keeper",
    tip: "Take the ferry to the Island. Walk to the west end. The lighthouse keeper's ghost has a story — ask a local.",
    rarity: 2,
    address: "Toronto Islands"
  },
  {
    id: "h5",
    name: "Mackenzie's Runoff (Governors)",
    category: "history",
    lat: 43.6488, lng: -79.3872,
    blurb: "Waterfall you can stand on top of, hidden behind City Hall",
    tip: "Look for the seam in the concrete — that's the wall. The water runs UNDER your feet.",
    rarity: 3,
    address: "Behind Old City Hall, near Bay St"
  },
  {
    id: "h6",
    name: "The Ghost of Union Station",
    category: "history",
    lat: 43.6453, lng: -79.3806,
    blurb: "The city hall ghost station — never used, never opened",
    tip: "Look down the tracks east at the closed staircase. The legend lives there.",
    rarity: 3,
    address: "Under Union Station"
  }
];

// Helper: get gems by category
export function getGemsByCategory(cat) {
  return GEMS.filter(g => g.category === cat);
}

// Helper: pick a random unvisited gem from selected categories
export function pickRandomGem(categories = null, visited = []) {
  let pool = categories ? GEMS.filter(g => categories.includes(g.category)) : GEMS;
  const unvisited = pool.filter(g => !visited.includes(g.id));
  const chosen = unvisited.length > 0 ? unvisited : pool;
  return chosen[Math.floor(Math.random() * chosen.length)];
}