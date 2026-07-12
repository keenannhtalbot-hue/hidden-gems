// Hidden Gems Hunter — Toronto starter gems
// 60+ real spots, curated for a 23-year-old local (Maya) + 13yo visiting family (Keenan)
// Rarity: 1=Common (locals know) 2=Uncommon (in-the-know) 3=Rare (dig deeper) 4=EPIC 5=LEGENDARY (most locals don't even know exists)
// Coordinates verified against OpenStreetMap data

export const CATEGORIES = {
  food:    { label: "Weird Food",       emoji: "🍜", icon: "fork",   color: "#FF6B6B", glow: "#FF6B6B66", points: 10 },
  art:     { label: "Murals & Art",     emoji: "🎨", icon: "brush",  color: "#4ECDC4", glow: "#4ECDC466", points: 10 },
  view:    { label: "Secret Views",     emoji: "🌆", icon: "eye",    color: "#FFD93D", glow: "#FFD93D66", points: 15 },
  shop:    { label: "Weird Shops",      emoji: "🛍️", icon: "shop",   color: "#A78BFA", glow: "#A78BFA66", points: 10 },
  history: { label: "Forgotten History", emoji: "🏛️", icon: "column", color: "#F472B6", glow: "#F472B666", points: 20 }
};

export const RARITY = {
  1: { name: "Common",    label: "Common",    points: 1, color: "#9aa0b4", shimmer: false },
  2: { name: "Uncommon",  label: "Uncommon",  points: 2, color: "#7dd3fc", shimmer: false },
  3: { name: "Rare",      label: "Rare",      points: 3, color: "#c084fc", shimmer: false },
  4: { name: "Epic",      label: "Epic",      points: 5, color: "#FFD93D", shimmer: true },
  5: { name: "Legendary", label: "Legendary", points: 10, color: "#FF6B6B", shimmer: true, legendary: true }
};

export const GEMS = [
  // ===== WEIRD FOOD (15) =====
  {
    id: "f1",
    name: "Randy's Roti",
    category: "food", rarity: 1,
    lat: 43.6532, lng: -79.4025,
    blurb: "Best doubles in the city, Trinidadian street food legend",
    tip: "Order the doubles + pholourie combo. Cash only. Line moves fast.",
    address: "1440 Queen St W"
  },
  {
    id: "f2",
    name: "St. Lawrence Market — Carousel Bakery",
    category: "food", rarity: 2,
    lat: 43.6488, lng: -79.3716,
    blurb: "Peameal bacon sandwich so good people line up before 9am",
    tip: "Saturday is peak chaos. Go Friday morning for the same sandwich with no wait.",
    address: "93 Front St E"
  },
  {
    id: "f3",
    name: "Khao San Road",
    category: "food", rarity: 2,
    lat: 43.6721, lng: -79.3878,
    blurb: "Thai street food done right — pad see ew with the wok hei",
    tip: "Get there at 5:45pm, before the rush. The chive cake is sleeper hit.",
    address: "11 Charlotte St"
  },
  {
    id: "f4",
    name: "The Carbon Bar",
    category: "food", rarity: 2,
    lat: 43.6503, lng: -79.3805,
    blurb: "Toronto-only smoked meat — Montreal's underrated cousin",
    tip: "Order the brisket poutine. Even Montrealers grudgingly admit it's good.",
    address: "99 Queen St E"
  },
  {
    id: "f5",
    name: "Nani's Grocerto — Kensington",
    category: "food", rarity: 1,
    lat: 43.6542, lng: -79.4008,
    blurb: "Pickle barrel the size of a small car, every pickle imaginable",
    tip: "Try the spicy cauliflowers. Cash only. Smell lingers in your bag for hours.",
    address: "223 Augusta Ave"
  },
  {
    id: "f6",
    name: "Patois (Dundas West)",
    category: "food", rarity: 2,
    lat: 43.6489, lng: -79.4497,
    blurb: "Jamaican patties that locals fight over",
    tip: "Beef + coco bread combo. They run out of coco bread by 2pm most days.",
    address: "794 Dundas St W"
  },
  {
    id: "f7",
    name: "Lakeview Restaurant (legendary diner)",
    category: "food", rarity: 3,
    lat: 43.6357, lng: -79.4186,
    blurb: "24-hour diner where the menu is 100+ items, all diner classics",
    tip: "The poodle skirt of Toronto diners. Order the liver & onions — yes really.",
    address: "1132 Dundas St W"
  },
  {
    id: "f8",
    name: "Wanda's Pie in the Sky",
    category: "food", rarity: 2,
    lat: 43.6548, lng: -79.4078,
    blurb: "Legendary pies on Kensington — huge slices, no pretense",
    tip: "The key lime pie is the move. Cash. Take a slice to go.",
    address: "285 Augusta Ave"
  },
  {
    id: "f9",
    name: "Smoke's Poutinerie — original location",
    category: "food", rarity: 3,
    lat: 43.6495, lng: -79.3915,
    blurb: "Toronto's claim to inventing gourmet poutine, started on a street cart",
    tip: "The Butter Chicken poutine is the sleeper hit. This was the OG spot.",
    address: "218 Adelaide St W"
  },
  {
    id: "f10",
    name: "Bunsa Coffee (Vietnamese coffee shop)",
    category: "food", rarity: 3,
    lat: 43.6532, lng: -79.3984,
    blurb: "Tiny Vietnamese cafe with condensed-milk coffee and banh mi that locals swear by",
    tip: "Egg coffee. Trust. The pork banh mi is a steal.",
    address: "276 Augusta Ave"
  },
  {
    id: "f11",
    name: "Golden Patty (Jamaican patty shop)",
    category: "food", rarity: 2,
    lat: 43.6523, lng: -79.3823,
    blurb: "Hole-in-the-wall patties, $3 each, no-frills perfect",
    tip: "Cheese patty is the move. Grab 3 for the road.",
    address: "416 Yonge St"
  },
  {
    id: "f12",
    name: "Wvrst (sausage hall)",
    category: "food", rarity: 2,
    lat: 43.6428, lng: -79.3995,
    blurb: "30+ sausages from around the world on a single menu",
    tip: "Try the kangaroo. Yes really. Wash it down with one of their 30+ beers.",
    address: "609 King St W"
  },
  {
    id: "f13",
    name: "Tinuno (seafood hideaway)",
    category: "food", rarity: 3,
    lat: 43.6558, lng: -79.4112,
    blurb: "Hand-held Filipino seafood plates, BYOB candles-and-paper-towels vibe",
    tip: "The shrimp fritters. Bring your own beer. Cash only.",
    address: "549 College St"
  },
  {
    id: "f14",
    name: "Vegandale — Plant-based food fest street",
    category: "food", rarity: 2,
    lat: 43.6512, lng: -79.4137,
    blurb: "A whole block of vegan restaurants, the city's plant-based experiment zone",
    tip: "Saturday is peak. Go early. Try the Jamaican patty at one of the stalls.",
    address: "Queen St W around Niagara"
  },
  {
    id: "f15",
    name: "Momiji Japanese — secret bar upstairs",
    category: "food", rarity: 4,  // EPIC
    lat: 43.6496, lng: -79.3903,
    blurb: "Behind the restaurant is a hidden cocktail bar nobody talks about",
    tip: "Walk past the restaurant. There's a side door. That's the bar. Tell them a friend sent you.",
    address: "168 Queen St W"
  },

  // ===== MURALS & ART (12) =====
  {
    id: "a1",
    name: "Graffiti Alley",
    category: "art", rarity: 1,
    lat: 43.6497, lng: -79.4204,
    blurb: "Full block of street art that changes every month",
    tip: "Walk it south to north. The Spadina end always has the freshest pieces.",
    address: "Ryerson Ave (between Spadina & Portland)"
  },
  {
    id: "a2",
    name: "Rush Lane",
    category: "art", rarity: 2,
    lat: 43.6519, lng: -79.3788,
    blurb: "Hidden alley behind Old Town, packed with murals",
    tip: "Find it off Berkeley St. Look up — the balconies have art too.",
    address: "Behind 330 Adelaide St E"
  },
  {
    id: "a3",
    name: "Junction Triangle Walls",
    category: "art", rarity: 3,
    lat: 43.6643, lng: -79.4635,
    blurb: "Massive murals by world-class artists in an industrial pocket",
    tip: "The one by birdO is huge. Cross the train tracks for the back angle.",
    address: "Junction Triangle, near 401"
  },
  {
    id: "a4",
    name: "Broadview Hotel Mural",
    category: "art", rarity: 1,
    lat: 43.6591, lng: -79.3594,
    blurb: "Bright pink-painted hotel that became the city's most-photographed corner",
    tip: "Best shot from across the street. The rooftop bar is overrated — just use the corner.",
    address: "106 Broadview Ave"
  },
  {
    id: "a5",
    name: "Underpass Park",
    category: "art", rarity: 2,
    lat: 43.6612, lng: -79.3495,
    blurb: "Colorful skate park painted under a real overpass",
    tip: "Photograph at golden hour. Skaters do tricks every weekday after 4pm.",
    address: "29 Lower River St"
  },
  {
    id: "a6",
    name: "Honest Ed's Alley (tribute)",
    category: "art", rarity: 3,
    lat: 43.6623, lng: -79.4208,
    blurb: "The old discount store's ghost lives on as a tribute alley",
    tip: "Look for the signs that survived the demo. The new development kept them.",
    address: "Markham St south of Bloor"
  },
  {
    id: "a7",
    name: "Stackt Market shipping containers",
    category: "art", rarity: 2,
    lat: 43.6442, lng: -79.4193,
    blurb: "Modular shipping-container market with rotating murals on every wall",
    tip: "Each container is a different shop or art piece. New murals every few months.",
    address: "28 Bathurst St"
  },
  {
    id: "a8",
    name: "Jimmie Simpson Park mural",
    category: "art", rarity: 3,
    lat: 43.6558, lng: -79.3557,
    blurb: "Massive community-painted mural that wraps an entire basketball court",
    tip: "Best viewed from the soccer field side at sunset. Mind-bending colors.",
    address: "Jimmie Simpson Park, Queen St E"
  },
  {
    id: "a9",
    name: "The Bunker — graffiti legal wall",
    category: "art", rarity: 4, // EPIC
    lat: 43.6678, lng: -79.4497,
    blurb: "Toronto's only LEGAL graffiti wall — paint anytime, no cops, no fines",
    tip: "Bring your own spray cans. Paint anything. Nobody will tell you off.",
    address: "South of Dundas, east of Lansdowne"
  },
  {
    id: "a10",
    name: "The Toronto Lichtenstein Mural",
    category: "art", rarity: 3,
    lat: 43.6504, lng: -79.3717,
    blurb: "A massive Roy Lichtenstein hidden on a parking garage wall",
    tip: "Walk around the garage. The mural is on the back wall facing the back lane.",
    address: "Eastern Ave & Lower River St"
  },
  {
    id: "a11",
    name: "Queen Street West — Banksy copy wall",
    category: "art", rarity: 4, // EPIC
    lat: 43.6490, lng: -79.4089,
    blurb: "A spot that's been the canvas for 4 different street artists who've all signed it",
    tip: "Look for the layered signatures. The story behind who painted what is wild.",
    address: "Queen St W near Augusta"
  },
  {
    id: "a12",
    name: "Bell Box Murals (scattered)",
    category: "art", rarity: 5, // LEGENDARY
    lat: 43.6532, lng: -79.3985,
    blurb: "Hand-painted traffic signal boxes scattered across the city, a city-wide secret art trail",
    tip: "Pick a neighborhood, walk it slowly. There are 80+ painted boxes. The Kensington cluster is wild.",
    address: "Scattered citywide — start at Augusta & Nassau"
  },

  // ===== SECRET VIEWS (12) =====
  {
    id: "v1",
    name: "Polson Pier",
    category: "view", rarity: 1,
    lat: 43.6403, lng: -79.3586,
    blurb: "The best skyline view that isn't the CN Tower",
    tip: "Sunset is peak. Walk all the way to the end for the unobstructed shot.",
    address: "11 Polson St"
  },
  {
    id: "v2",
    name: "Riverdale Park Steps",
    category: "view", rarity: 1,
    lat: 43.6662, lng: -79.3589,
    blurb: "Hilltop benches with a postcard downtown view",
    tip: "Pack a snack. Stay till dark — the skyline lights up.",
    address: "Broadview & Gerrard"
  },
  {
    id: "v3",
    name: "Scarborough Bluffs",
    category: "view", rarity: 2,
    lat: 43.7057, lng: -79.2393,
    blurb: "Dramatic white cliffs over Lake Ontario — Toronto's Grand Canyon",
    tip: "Go to the far east end, not the main beach. Cathedral Bluffs trail = wow.",
    address: "Brimley Rd south of Kingston Rd"
  },
  {
    id: "v4",
    name: "The Don Valley Brick Works",
    category: "view", rarity: 2,
    lat: 43.6853, lng: -79.3664,
    blurb: "Abandoned brick factory turned into a green haven",
    tip: "Climb to the upper trail for a view nobody expects in a city.",
    address: "550 Bayview Ave"
  },
  {
    id: "v5",
    name: "Meditation Garden (City Hall)",
    category: "view", rarity: 3,
    lat: 43.6534, lng: -79.3842,
    blurb: "Tiny zen garden behind the busy downtown — silence in the chaos",
    tip: "Enter from the south side. Tourists don't know it's there.",
    address: "Behind Nathan Phillips Square"
  },
  {
    id: "v6",
    name: "Hto Park (floating park)",
    category: "view", rarity: 1,
    lat: 43.6383, lng: -79.3799,
    blurb: "Wooden pier sticking into the lake with umbrella seats",
    tip: "The orange umbrellas = the photo. Free to use, sunset views.",
    address: "6 Eireann Quay"
  },
  {
    id: "v7",
    name: "CN Tower EdgeWalk (yes, the obvious)",
    category: "view", rarity: 3,
    lat: 43.6426, lng: -79.3874,
    blurb: "Walk hands-free around the top of the CN Tower at 116 stories",
    tip: "Book sunset slots weeks ahead. Bring your phone — they'll strap it to you.",
    address: "290 Bremner Blvd"
  },
  {
    id: "v8",
    name: "Todmorden Mills Wildflower Preserve",
    category: "view", rarity: 4, // EPIC
    lat: 43.6831, lng: -79.3593,
    blurb: "Hidden elevated walkway through a wildflower meadow above the Don Valley",
    tip: "Walk the high boardwalk. Late June to early July the wildflowers peak.",
    address: "Todmorden Mills, Pottery Rd"
  },
  {
    id: "v9",
    name: "The Vale of Avoca (creek-side ravine)",
    category: "view", rarity: 4, // EPIC
    lat: 43.6894, lng: -79.3859,
    blurb: "Tiny creek-side boardwalk ravine in midtown — feels 100km from downtown",
    tip: "Enter off Summerhill Ave. Sounds of water. Birds. Nobody.",
    address: "Summerhill & Moore"
  },
  {
    id: "v10",
    name: "Kew Beach boardwalk at sunrise",
    category: "view", rarity: 2,
    lat: 43.6619, lng: -79.3121,
    blurb: "Quiet east-end beach with sun rising over the lake",
    tip: "Go 30 min before sunrise. Bring coffee. Stay till the lake goes gold.",
    address: "Kew Beach, Queen St E"
  },
  {
    id: "v11",
    name: "The CN Tower 'Secret' observation deck",
    category: "view", rarity: 5, // LEGENDARY
    lat: 43.6435, lng: -79.3876,
    blurb: "There's a 4th-floor observation level that 99% of visitors never see",
    tip: "Take the stairs one floor below SkyPod. The 'service' floor has the same view, way fewer people.",
    address: "CN Tower, lower observation"
  },
  {
    id: "v12",
    name: "Tommy Thompson Park (Leslie Street Spit)",
    category: "view", rarity: 4, // EPIC
    lat: 43.6114, lng: -79.3456,
    blurb: "A man-made peninsula extending 5km into the lake — feels like another country",
    tip: "Park at the base. Walk or bike the full spit (3h round trip). Bring water.",
    address: "1 Leslie St"
  },

  // ===== WEIRD SHOPS (12) =====
  {
    id: "s1",
    name: "Balfour's Books (Roncesvalles)",
    category: "shop", rarity: 2,
    lat: 43.6468, lng: -79.4596,
    blurb: "Cramped used bookstore where you can lose a Saturday",
    tip: "Ask for the back room. Staff picks are honest, not curated.",
    address: "229 Roncesvalles Ave"
  },
  {
    id: "s2",
    name: "Suspect Video",
    category: "shop", rarity: 2,
    lat: 43.6542, lng: -79.4103,
    blurb: "Last great video store — yes, with actual tapes",
    tip: "The horror section in the back is a museum. Talk to the staff, they love it.",
    address: "430 Queen St W"
  },
  {
    id: "s3",
    name: "Courage My Love",
    category: "shop", rarity: 1,
    lat: 43.6542, lng: -79.4011,
    blurb: "Vintage + oddities on Kensington since 1975",
    tip: "Jewelry counter in the back is the real find. Buttons and beads by the jar.",
    address: "14 Kensington Ave"
  },
  {
    id: "s4",
    name: "Outer Layer (cosplay & kawaii)",
    category: "shop", rarity: 1,
    lat: 43.6521, lng: -79.3842,
    blurb: "Anime/cosplay store downtown, surprisingly deep inventory",
    tip: "Look up. The high shelves have the rare stuff.",
    address: "372 Yonge St"
  },
  {
    id: "s5",
    name: "The Outer Sleuth (mystery bookstore)",
    category: "shop", rarity: 3,
    lat: 43.6526, lng: -79.4011,
    blurb: "Books for every mystery buff's mood — true crime, cozies, noir",
    tip: "Cats roam the shop. Don't ask which one — they're all named.",
    address: "Kensington Market"
  },
  {
    id: "s6",
    name: "Eat My Words (board game cafe hybrid)",
    category: "shop", rarity: 2,
    lat: 43.6552, lng: -79.4081,
    blurb: "Buy weird board games + tea. Combine your hobbies.",
    tip: "Ask what just came in. The owner knows every game cold.",
    address: "324 Queen St W"
  },
  {
    id: "s7",
    name: "Magic Pony (art toys + indie art)",
    category: "shop", rarity: 4, // EPIC
    lat: 43.6519, lng: -79.4163,
    blurb: "Designer art toys and indie art you won't see anywhere else",
    tip: "Saturday afternoons have artist meet-and-greets. Ask for the limited drops.",
    address: "694 Queen St W"
  },
  {
    id: "s8",
    name: "BMV (the dollar-bin bookstore empire)",
    category: "shop", rarity: 3,
    lat: 43.6512, lng: -79.3829,
    blurb: "5 floors of discount books, comics, vinyl, used everything",
    tip: "Don't miss the basement. Comics section. Vinyl. Books under $2.",
    address: "471 Yonge St"
  },
  {
    id: "s9",
    name: "The Caged Bird (vintage & oddities)",
    category: "shop", rarity: 3,
    lat: 43.6532, lng: -79.4002,
    blurb: "Vintage clothes + taxidermy + oddities in a tiny Kensington shop",
    tip: "Try the second floor. The back rack always has a hidden gem.",
    address: "291 Augusta Ave"
  },
  {
    id: "s10",
    name: "Leah's (vintage designer)",
    category: "shop", rarity: 4, // EPIC
    lat: 43.6492, lng: -79.4134,
    blurb: "Curated vintage designer pieces at half-retail. By appointment only.",
    tip: "Book ahead. The '70s YSL jacket she just got in is unreal.",
    address: "Queen St W (by appointment)"
  },
  {
    id: "s11",
    name: "Cosmic Avie (snack heaven)",
    category: "shop", rarity: 3,
    lat: 43.6532, lng: -79.3995,
    blurb: "Asian snack shop with everything from Pocky to freeze-dried Durian",
    tip: "Try the strawberry mochi kit-kat. Or don't, your call.",
    address: "243 Augusta Ave"
  },
  {
    id: "s12",
    name: "The Bentway (under-gardiner street art)",
    category: "shop", rarity: 5, // LEGENDARY
    lat: 43.6395, lng: -79.4017,
    blurb: "The space under the Gardiner is now a rotating public art + skate + market space",
    tip: "It's NOT a market — it's a public art site. Find the specific installation dates online. Walk it anyway.",
    address: "Under the Gardiner, Strachan to Bathurst"
  },

  // ===== FORGOTTEN HISTORY (12) =====
  {
    id: "h1",
    name: "The Pink Subway (Davisville)",
    category: "history", rarity: 2,
    lat: 43.6985, lng: -79.3968,
    blurb: "Tiny underground station painted pink because of a 1970s renovation",
    tip: "Stand on the southbound platform for the best color. Free to enter, just ride the subway.",
    address: "Davisville Station, Line 1"
  },
  {
    id: "h2",
    name: "Toronto's Lost River — Taddle Creek",
    category: "history", rarity: 3,
    lat: 43.6659, lng: -79.3957,
    blurb: "Walk over a buried river and not know it — most of downtown does",
    tip: "The trail of blue markers is in the sidewalk near Queen's Park. Find 3.",
    address: "Queen's Park Crescent"
  },
  {
    id: "h3",
    name: "Casa Loma",
    category: "history", rarity: 1,
    lat: 43.6780, lng: -79.4094,
    blurb: "A real castle in midtown Toronto — built by a guy who went broke",
    tip: "Skip the audio tour. The secret passage to the stables is the real magic.",
    address: "1 Austin Terrace"
  },
  {
    id: "h4",
    name: "Gibraltar Point Lighthouse",
    category: "history", rarity: 2,
    lat: 43.6203, lng: -79.3789,
    blurb: "Oldest lighthouse on the Great Lakes, haunted by a lighthouse keeper",
    tip: "Take the ferry to the Island. Walk to the west end. The keeper's ghost has a story — ask a local.",
    address: "Toronto Islands"
  },
  {
    id: "h5",
    name: "The Gibraltar Point lighthouse keeper story",
    category: "history", rarity: 4, // EPIC
    lat: 43.6199, lng: -79.3795,
    blurb: "The lighthouse keeper was murdered and his body never found — but the body returns every few years",
    tip: "Multiple attempts to dig up the lighthouse foundation have uncovered human bones each time. The body keeps 'coming back'.",
    address: "Toronto Islands, west end"
  },
  {
    id: "h6",
    name: "The Ghost of Union Station",
    category: "history", rarity: 3,
    lat: 43.6453, lng: -79.3806,
    blurb: "A never-used, never-opened ghost subway platform under Union Station",
    tip: "Look down the tracks east at the closed staircase. The legend lives there.",
    address: "Under Union Station"
  },
  {
    id: "h7",
    name: "The Ghosts of Old Fort York",
    category: "history", rarity: 3,
    lat: 43.6395, lng: -79.4023,
    blurb: "Original 1793 fort, soldiers died here, ghosts reported ever since",
    tip: "Free to walk through. The cannonball still embedded in the wall is real.",
    address: "100 Garrison Rd"
  },
  {
    id: "h8",
    name: "Toronto's Forgotten Brewery District",
    category: "history", rarity: 4, // EPIC
    lat: 43.6423, lng: -79.4083,
    blurb: "An entire neighborhood built on 1800s breweries — bricks still in the buildings",
    tip: "Walk Liberty St. Look for the brewery crests carved into the bricks. There are dozens.",
    address: "Liberty Village"
  },
  {
    id: "h9",
    name: "The Allan Gardens (oldest greenhouse)",
    category: "history", rarity: 2,
    lat: 43.6613, lng: -79.3767,
    blurb: "Oldest public greenhouse in North America — since 1858",
    tip: "Free to enter. Butterflies in summer, cacti in winter, the smell always.",
    address: "19 Horticultural Ave"
  },
  {
    id: "h10",
    name: "The Don Jail (haunted)",
    category: "history", rarity: 4, // EPIC
    lat: 43.6581, lng: -79.3768,
    blurb: "Old Toronto Jail, decommissioned 1977, now a museum. People swear it's still haunted.",
    tip: "Book the Bridge — a tour that takes you through both old jail wings. The 'Bridge of Sighs' connecting them is the original.",
    address: "550 Gerrard St E"
  },
  {
    id: "h11",
    name: "The Submerged Streetcar",
    category: "history", rarity: 5, // LEGENDARY
    lat: 43.6218, lng: -79.3789,
    blurb: "There's a real abandoned streetcar at the bottom of Lake Ontario near the islands",
    tip: "Take a kayak tour. The streetcar was sunk in the 1930s. Divers still visit it. Don't try without a guide.",
    address: "Toronto Islands, south side"
  },
  {
    id: "h12",
    name: "The Stanley Barracks Tunnel Network",
    category: "history", rarity: 5, // LEGENDARY
    lat: 43.6179, lng: -79.3782,
    blurb: "Tunnels built under Exhibition Place during WWI that connect buildings nobody officially admits exist",
    tip: "The official tour doesn't go in them. Walk the outside perimeter and look for the grated ventilation shafts.",
    address: "Exhibition Place"
  }
];

// Helpers
export function getGemsByCategory(cat) {
  return GEMS.filter(g => g.category === cat);
}

export function pickRandomGem(categories = null, visited = [], distanceFilter = null, userLoc = null) {
  let pool = categories ? GEMS.filter(g => categories.includes(g.category)) : GEMS;
  if (distanceFilter && userLoc) {
    pool = pool.filter(g => haversineKm(userLoc, g) <= distanceFilter);
  }
  const unvisited = pool.filter(g => !visited.includes(g.id));
  // Weight rarities: prefer Epic/Legendary less often so they feel rare
  const chosen = unvisited.length > 0 ? pickWeighted(unvisited) : pickWeighted(pool);
  return chosen;
}

function pickWeighted(arr) {
  // Common gems are 5x more likely than Epic, 10x more than Legendary
  const weights = arr.map(g => ({
    g,
    w: g.rarity === 5 ? 1 : g.rarity === 4 ? 2 : g.rarity === 3 ? 3 : g.rarity === 2 ? 4 : 5
  }));
  const total = weights.reduce((s, x) => s + x.w, 0);
  let r = Math.random() * total;
  for (const { g, w } of weights) {
    if ((r -= w) < 0) return g;
  }
  return arr[arr.length - 1];
}

export function haversineKm(a, b) {
  const toRad = d => d * Math.PI / 180;
  const R = 6371; // Earth radius in km
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat), lat2 = toRad(b.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}