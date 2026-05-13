import { useState, useEffect, useRef } from "react";

const CITIES = [
  { id: 1, name: "Mumbai", country: "Maharashtra", img: "🏙️", tag: "Tech & Dreams", temp: "30°C", vibe: "Electric" },
  { id: 2, name: "Jaipur", country: "Rajasthan", img: "🏰", tag: "Royal Heritage", temp: "35°C", vibe: "Historic" },
  { id: 3, name: "Varanasi", country: "Uttar Pradesh", img: "🛕", tag: "Spiritual", temp: "32°C", vibe: "Mystic" },
  { id: 4, name: "Goa", country: "Goa", img: "🏖️", tag: "Beaches & Party", temp: "31°C", vibe: "Vibrant" },
  { id: 5, name: "Kochi", country: "Kerala", img: "🌴", tag: "Backwaters", temp: "28°C", vibe: "Serene" },
  { id: 6, name: "Manali", country: "Himachal", img: "🏔️", tag: "Mountains", temp: "15°C", vibe: "Tranquil" },
];

const EXPERIENCES = [
  { id: 1, city: "Mumbai", title: "Bollywood Studio Tour", category: "Culture", rating: 4.8, reviews: 312, price: "₹2,500", icon: "🎬", duration: "4h" },
  { id: 2, city: "Varanasi", title: "Ganga Aarti Boat Ride", category: "Spiritual", rating: 4.9, reviews: 507, price: "₹500", icon: "🪔", duration: "2h" },
  { id: 3, city: "Jaipur", title: "Amer Fort Sunrise Walk", category: "History", rating: 4.7, reviews: 228, price: "₹800", icon: "🐘", duration: "3h" },
  { id: 4, city: "Kochi", title: "Spice Market & Cooking Class", category: "Food", rating: 4.9, reviews: 189, price: "₹1,200", icon: "🌶️", duration: "3.5h" },
  { id: 5, city: "Goa", title: "Grande Island Scuba Dive", category: "Adventure", rating: 4.6, reviews: 145, price: "₹3,000", icon: "🤿", duration: "5h" },
  { id: 6, city: "Manali", title: "Rohtang Pass Trek", category: "Nature", rating: 5.0, reviews: 421, price: "₹1,500", icon: "⛰️", duration: "6h" },
];

const RESTAURANTS = [
  { name: "Bademiya", city: "Mumbai", cuisine: "Street Kebabs", rating: 4.7, price: "₹₹", local: true, img: "🍢" },
  { name: "Chokhi Dhani", city: "Jaipur", cuisine: "Rajasthani Thali", rating: 4.8, price: "₹₹₹", local: false, img: "🍛" },
  { name: "Kashi Chat Bhandar", city: "Varanasi", cuisine: "Street Chaat", rating: 4.9, price: "₹", local: true, img: "🥔" },
  { name: "Thalassa", city: "Goa", cuisine: "Greek & Goan", rating: 4.6, price: "₹₹₹", local: false, img: "🍤" },
  { name: "Paragon", city: "Kochi", cuisine: "Kerala Seafood", rating: 4.9, price: "₹₹", local: true, img: "🐟" },
  { name: "Johnson's Cafe", city: "Manali", cuisine: "Pahari & Trout", rating: 4.8, price: "₹₹", local: true, img: "🍽️" },
];

const TRANSPORT_OPTIONS = [
  { name: "Uber", type: "Rideshare", icon: "🚗", available: true, eta: "4 min", price: "₹150–300" },
  { name: "Ola", type: "Rideshare", icon: "🟡", available: true, eta: "6 min", price: "₹140–280" },
  { name: "Rapido", type: "Bike Taxi", icon: "🏍️", available: true, eta: "2 min", price: "₹40–80" },
  { name: "Auto Rickshaw", type: "Local", icon: "🛺", available: true, eta: "1 min", price: "Metered" },
  { name: "Metro", type: "Rail", icon: "🚇", available: true, eta: "8 min", price: "₹20–50" },
  { name: "Local Train", type: "Rail", icon: "🚆", available: true, eta: "12 min", price: "₹10–30" },
];

const BUDDIES = [
  { name: "Aisha S.", age: 24, from: "Delhi", going: "Goa", vibe: "Beach Bum", match: 94, avatar: "🧡" },
  { name: "Rahul V.", age: 28, from: "Bengaluru", going: "Manali", vibe: "Trekker", match: 87, avatar: "💚" },
  { name: "Priya K.", age: 22, from: "Pune", going: "Jaipur", vibe: "Culture + Art", match: 91, avatar: "💜" },
  { name: "Liam H.", age: 26, from: "UK", going: "Varanasi", vibe: "Solo Backpacker", match: 83, avatar: "💛" },
];

const EVENTS = [
  { name: "Ganesh Chaturthi", city: "Mumbai", date: "Sep 7–17", type: "Cultural", icon: "🐘" },
  { name: "Pushkar Camel Fair", city: "Jaipur", date: "Nov 9–15", type: "Traditional", icon: "🐪" },
  { name: "Sunburn Festival", city: "Goa", date: "Dec 28–30", type: "Music & Party", icon: "🎧" },
  { name: "Dev Deepawali", city: "Varanasi", date: "Nov 15", type: "Spiritual", icon: "🪔" },
  { name: "Kochi Biennale", city: "Kochi", date: "Dec–Apr", type: "Art & Culture", icon: "🎨" },
  { name: "Winter Carnival", city: "Manali", date: "Jan 2–6", type: "Nature & Local", icon: "❄️" },
];

const WEATHER_MOCK = {
  city: "Mumbai", temp: 30, condition: "Partly Cloudy", humidity: 75, wind: "14 km/h",
  forecast: [
    { day: "Mon", icon: "⛅", high: 32, low: 26 },
    { day: "Tue", icon: "🌤️", high: 33, low: 27 },
    { day: "Wed", icon: "🌧️", high: 29, low: 25 },
    { day: "Thu", icon: "☀️", high: 34, low: 28 },
    { day: "Fri", icon: "🌤️", high: 32, low: 26 },
  ],
  crowds: [
    { place: "Marine Drive", level: 85, status: "Very Busy" },
    { place: "Bandra Bandstand", level: 60, status: "Moderate" },
    { place: "Sanjay Gandhi Park", level: 40, status: "Calm" },
    { place: "Colaba Causeway", level: 92, status: "Packed" },
  ],
};

const LANGUAGE_TIPS = [
  { lang: "Hindi", phrase: "Namaste", meaning: "Hello / Greetings", icon: "🙏" },
  { lang: "Marathi", phrase: "Kasa ahes?", meaning: "How are you?", icon: "👋" },
  { lang: "Malayalam", phrase: "Nanni", meaning: "Thank you", icon: "🤝" },
  { lang: "Konkani", phrase: "Dev boro dis dium", meaning: "May God give you a good day", icon: "☀️" },
];

const STUDENT_DEALS = [
  { brand: "Zostel", discount: "20% off", type: "Hostel Stay", icon: "🏨" },
  { brand: "MakeMyTrip", discount: "₹600 off", type: "Flights", icon: "✈️" },
  { brand: "IRCTC", discount: "Student Concession", type: "Railways", icon: "🚂" },
  { brand: "BookMyShow", discount: "15% off", type: "Experiences", icon: "🎟️" },
];

const AI_RESPONSES = [
  "🗺️ I've crafted a 5-day Jaipur itinerary for you! Day 1: Amer Fort & Jal Mahal. Day 2: Hawa Mahal, City Palace & shopping at Johari Bazaar. Day 3: Chokhi Dhani for an authentic Rajasthani dinner. Want me to book a cab?",
  "🥟 Based on your love for street food, I recommend: **Vada Pav at Kirti College** (Mumbai), **Tamatar Chaat** (Varanasi), and a **seafood crawl** in North Goa. Budget estimate: ₹1,500/day.",
  "🚆 Best way to get around Mumbai on a budget: Local Trains (Western/Central lines). Get a daily pass for under ₹100! Avoid cabs from South Bombay to Andheri during peak hours (6–8 PM).",
  "🪔 November is peak season for Varanasi! Dev Deepawali will have millions of diyas lit on the ghats. Book a boat ride weeks in advance. Shall I add this to your itinerary?",
];

function StarRating({ rating }) {
  return (
    <span className="text-amber-400 text-xs">
      {"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}
      <span className="text-gray-400 ml-1">{rating}</span>
    </span>
  );
}

function Badge({ children, color = "indigo" }) {
  const colors = {
    indigo: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    emerald: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    rose: "bg-rose-500/20 text-rose-300 border-rose-500/30",
    amber: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    violet: "bg-violet-500/20 text-violet-300 border-violet-500/30",
    cyan: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  };
  return <span className={`text-xs px-2 py-0.5 rounded-full border ${colors[color]} font-medium`}>{children}</span>;
}

function GlassCard({ children, className = "", hover = true, onClick }) {
  return (
    <div onClick={onClick} className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl ${hover ? "hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] transition-all duration-300 cursor-pointer" : ""} ${className}`}>
      {children}
    </div>
  );
}

function SectionHeader({ title, subtitle, accent = "from-violet-400 to-cyan-400" }) {
  return (
    <div className="mb-8">
      <h2 className={`text-3xl font-bold bg-gradient-to-r ${accent} bg-clip-text text-transparent`}>{title}</h2>
      {subtitle && <p className="text-gray-400 mt-1 text-sm">{subtitle}</p>}
    </div>
  );
}

function HomePage({ onNavigate }) {
  const [searchDest, setSearchDest] = useState("");
  const [searchInterest, setSearchInterest] = useState("");
  const [activeInterest, setActiveInterest] = useState("All");
  const interests = ["All", "🍛 Food", "🎭 Culture", "🛕 Spiritual", "🛍️ Bazaars", "🏔️ Nature"];

  return (
    <div className="space-y-20">
      <div className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-3xl" />
        </div>

        <div className="relative mb-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-gray-300">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          AI-Powered India Travel Intelligence
        </div>

        <h1 className="relative text-6xl md:text-8xl font-black tracking-tight mb-4">
          <span className="bg-gradient-to-br from-orange-300 via-white to-green-300 bg-clip-text text-transparent">Explore</span>
          <br />
          <span className="text-white">Like a</span>
          <span className="bg-gradient-to-r from-orange-400 to-green-400 bg-clip-text text-transparent"> Local</span>
        </h1>

        <p className="relative text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Wandrr connects you with authentic local experiences, AI-crafted itineraries, and a community of explorers navigating the magic of India.
        </p>

        <div className="relative w-full max-w-2xl">
          <GlassCard className="p-2" hover={false}>
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3">
                <span className="text-orange-400">📍</span>
                <input className="bg-transparent text-white placeholder-gray-500 outline-none w-full text-sm" placeholder="Where to? Mumbai, Goa..." value={searchDest} onChange={(e) => setSearchDest(e.target.value)} />
              </div>
              <div className="flex-1 flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3">
                <span className="text-green-400">✨</span>
                <input className="bg-transparent text-white placeholder-gray-500 outline-none w-full text-sm" placeholder="Interests: Food, Spiritual..." value={searchInterest} onChange={(e) => setSearchInterest(e.target.value)} />
              </div>
              <button onClick={() => onNavigate("explore")} className="bg-gradient-to-r from-orange-600 to-green-600 hover:from-orange-500 hover:to-green-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 text-sm whitespace-nowrap">
                Explore →
              </button>
            </div>
          </GlassCard>
        </div>

        <div className="relative flex flex-wrap justify-center gap-2 mt-6">
          {interests.map((i) => (
            <button key={i} onClick={() => setActiveInterest(i)}
              className={`px-4 py-1.5 rounded-full text-sm transition-all duration-200 border ${activeInterest === i ? "bg-orange-600 border-orange-500 text-white" : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"}`}>
              {i}
            </button>
          ))}
        </div>

        <div className="relative flex gap-8 mt-10 text-center">
          {[["28", "States"], ["1.4M", "Explorers"], ["85K", "Experiences"]].map(([num, label]) => (
            <div key={label}>
              <div className="text-2xl font-black text-white">{num}</div>
              <div className="text-gray-500 text-xs">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 md:px-8">
        <SectionHeader title="Featured Destinations" subtitle="Handpicked spots across India" accent="from-orange-400 to-green-400" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {CITIES.map((city) => (
            <GlassCard key={city.id} className="p-5 group" onClick={() => onNavigate("explore")}>
              <div className="text-4xl mb-3">{city.img}</div>
              <div className="text-white font-bold text-lg">{city.name}</div>
              <div className="text-gray-500 text-xs mb-2">{city.country}</div>
              <div className="flex items-center justify-between">
                <Badge color="amber">{city.tag}</Badge>
                <span className="text-orange-400 text-xs font-mono">{city.temp}</span>
              </div>
              <div className="mt-2 text-xs text-gray-500">Vibe: <span className="text-gray-300">{city.vibe}</span></div>
            </GlassCard>
          ))}
        </div>
      </div>

      <div className="px-4 md:px-8">
        <SectionHeader title="Trending Experiences" subtitle="What travelers are loving right now" accent="from-green-400 to-cyan-400" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {EXPERIENCES.slice(0, 3).map((exp) => (
            <GlassCard key={exp.id} className="p-5">
              <div className="flex items-start gap-3">
                <div className="text-3xl">{exp.icon}</div>
                <div className="flex-1">
                  <div className="text-white font-semibold text-sm">{exp.title}</div>
                  <div className="text-gray-500 text-xs">{exp.city}</div>
                  <StarRating rating={exp.rating} />
                  <div className="flex items-center gap-2 mt-2">
                    <Badge color="emerald">{exp.category}</Badge>
                    <span className="text-gray-400 text-xs">{exp.duration}</span>
                    <span className="text-orange-400 text-xs font-bold ml-auto">{exp.price}</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
        <div className="mt-4 text-center">
          <button onClick={() => onNavigate("explore")} className="text-orange-400 hover:text-orange-300 text-sm underline underline-offset-4 transition">View all experiences →</button>
        </div>
      </div>

      <div className="px-4 md:px-8">
        <GlassCard hover={false} className="p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/30 to-green-900/30 pointer-events-none" />
          <h3 className="relative text-3xl font-black text-white mb-3">Ready to wander smarter?</h3>
          <p className="relative text-gray-400 mb-6 max-w-md mx-auto text-sm">Let our AI plan your perfect Indian trip while you focus on the adventure.</p>
          <div className="relative flex gap-3 justify-center">
            <button onClick={() => onNavigate("ai")} className="bg-gradient-to-r from-orange-600 to-green-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition">🤖 Plan with AI</button>
            <button onClick={() => onNavigate("social")} className="bg-white/10 border border-white/20 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-white/15 transition">👥 Find a Buddy</button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

function ExplorePage() {
  const [activeCity, setActiveCity] = useState("Mumbai");
  const [activeTab, setActiveTab] = useState("Food");
  const tabs = ["Food", "Fashion", "Culture", "History"];

  const photographers = [
    { name: "Yuki T.", city: "Varanasi", shots: 842, icon: "📸" },
    { name: "Ana M.", city: "Goa", shots: 530, icon: "🎞️" },
    { name: "Raj P.", city: "Mumbai", shots: 711, icon: "🌅" },
  ];

  const tabContent = {
    Food: RESTAURANTS.filter((r) => r.city === activeCity).length ? RESTAURANTS.filter((r) => r.city === activeCity) : RESTAURANTS.slice(0, 2),
    Fashion: [
      { name: "Colaba Street Style", img: "👗", desc: "Boho chic & oxidized jewelry" },
      { name: "Bandra Boutiques", img: "🧣", desc: "Mumbai's trendy fashion hub" },
    ],
    Culture: [
      { name: "Bollywood Cinema", img: "🎬", desc: "The heart of Indian film" },
      { name: "Marathi Theatre", img: "🎭", desc: "Deeply rooted local arts" },
    ],
    History: [
      { name: "Maratha Empire", img: "🏯", desc: "Historic forts and legends" },
      { name: "British Colonial Era", img: "🏛️", desc: "Victorian Gothic architecture" },
    ],
  };

  return (
    <div className="space-y-10 px-4 md:px-8">
      <SectionHeader title="Explore" subtitle="Discover India from the inside out" accent="from-orange-400 to-amber-400" />
      <div className="flex flex-wrap gap-2">
        {CITIES.map((c) => (
          <button key={c.name} onClick={() => setActiveCity(c.name)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all border ${activeCity === c.name ? "bg-orange-600 border-orange-500 text-white" : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"}`}>
            {c.img} {c.name}
          </button>
        ))}
      </div>

      <div className="flex gap-1 bg-white/5 p-1 rounded-xl w-fit">
        {tabs.map((t) => (
          <button key={t} onClick={() => setActiveTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === t ? "bg-orange-600 text-white" : "text-gray-400 hover:text-white"}`}>
            {t === "Food" ? "🍲" : t === "Fashion" ? "👗" : t === "Culture" ? "🎭" : "🏛️"} {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(tabContent[activeTab] || []).map((item, i) => (
          <GlassCard key={i} className="p-5">
            {item.cuisine ? (
              <div className="flex items-center gap-3">
                <div className="text-3xl">{item.img}</div>
                <div>
                  <div className="text-white font-semibold">{item.name}</div>
                  <div className="text-gray-500 text-xs">{item.cuisine}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <StarRating rating={item.rating} />
                    <Badge color={item.local ? "emerald" : "cyan"}>{item.local ? "Local Fave" : "Popular"}</Badge>
                    <span className="text-gray-400 text-xs">{item.price}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="text-3xl">{item.img}</div>
                <div>
                  <div className="text-white font-semibold">{item.name}</div>
                  <div className="text-gray-400 text-sm">{item.desc}</div>
                </div>
              </div>
            )}
          </GlassCard>
        ))}
      </div>

      <div>
        <h3 className="text-white font-bold text-xl mb-4">📸 Local Photographers</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {photographers.map((p) => (
            <GlassCard key={p.name} className="p-5 text-center">
              <div className="text-4xl mb-2">{p.icon}</div>
              <div className="text-white font-semibold">{p.name}</div>
              <div className="text-gray-500 text-xs">{p.city}</div>
              <div className="text-orange-400 text-xs mt-1">{p.shots} shots</div>
              <button className="mt-3 text-xs bg-white/10 hover:bg-white/20 text-gray-300 px-3 py-1.5 rounded-lg transition">View Portfolio</button>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}

function FoodPage() {
  const cuisines = ["Vada Pav", "Rajasthani Thali", "Kerala Sadhya", "Goan Fish Curry", "Chaat", "Pahari Food"];
  const fashionTrends = [
    { city: "Mumbai", trend: "Bandra Street Wear", icon: "🕶️", hot: true },
    { city: "Jaipur", trend: "Block Print Kurtas", icon: "🥻", hot: false },
    { city: "Goa", trend: "Boho Beachwear", icon: "🐚", hot: true },
    { city: "Varanasi", trend: "Banarasi Silks", icon: "✨", hot: true },
  ];

  return (
    <div className="space-y-10 px-4 md:px-8">
      <SectionHeader title="Food & Lifestyle" subtitle="Eat, dress, and live like a local" accent="from-orange-400 to-rose-400" />
      <div>
        <h3 className="text-white font-bold text-xl mb-4">🍽️ Famous Restaurants & Stalls</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {RESTAURANTS.map((r, i) => (
            <GlassCard key={i} className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">{r.img}</span>
                <Badge color={r.local ? "emerald" : "violet"}>{r.local ? "Local Secret" : "Tourist Fave"}</Badge>
              </div>
              <div className="text-white font-bold">{r.name}</div>
              <div className="text-gray-400 text-xs mb-2">{r.city} · {r.cuisine}</div>
              <div className="flex items-center justify-between">
                <StarRating rating={r.rating} />
                <span className="text-orange-400 text-sm font-bold">{r.price}</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-white font-bold text-xl mb-4">🌍 Must-Try Cuisines</h3>
        <div className="flex flex-wrap gap-2">
          {cuisines.map((c) => (
            <span key={c} className="bg-gradient-to-r from-orange-900/30 to-rose-900/30 border border-orange-500/30 text-orange-300 px-4 py-2 rounded-xl text-sm cursor-pointer hover:border-orange-400/50 transition">{c}</span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-white font-bold text-xl mb-4">👗 Fashion Trends</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fashionTrends.map((f, i) => (
            <GlassCard key={i} className="p-5 flex items-center gap-4">
              <div className="text-3xl">{f.icon}</div>
              <div className="flex-1">
                <div className="text-white font-semibold">{f.trend}</div>
                <div className="text-gray-500 text-xs">{f.city}</div>
              </div>
              {f.hot && <Badge color="rose">🔥 Trending</Badge>}
            </GlassCard>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-white font-bold text-xl mb-4">🧠 Cultural Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Temples", icon: "🙏", tip: "Remove your shoes and cover your head before entering temples or gurudwaras." },
            { title: "Eating", icon: "✋", tip: "Eat with your right hand when enjoying traditional meals like Thalis or Sadhya." },
            { title: "Bargaining", icon: "🗣️", tip: "Polite haggling is expected in street markets like Colaba or Johari Bazaar." },
          ].map((insight) => (
            <GlassCard key={insight.title} className="p-5">
              <div className="text-2xl mb-2">{insight.icon}</div>
              <div className="text-white font-bold mb-1">{insight.title}</div>
              <div className="text-gray-400 text-sm">{insight.tip}</div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}

function TransportPage() {
  const [origin, setOrigin] = useState("Bandra Station");
  const [dest, setDest] = useState("Gateway of India");

  return (
    <div className="space-y-10 px-4 md:px-8">
      <SectionHeader title="Transport Hub" subtitle="Get around India effortlessly" accent="from-blue-400 to-cyan-400" />
      <GlassCard hover={false} className="p-6">
        <h3 className="text-white font-bold text-lg mb-4">🗺️ Route Planner</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3">
            <span className="text-green-400 text-lg">●</span>
            <input className="bg-transparent text-white placeholder-gray-500 outline-none w-full text-sm" value={origin} onChange={(e) => setOrigin(e.target.value)} />
          </div>
          <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3">
            <span className="text-red-400 text-lg">●</span>
            <input className="bg-transparent text-white placeholder-gray-500 outline-none w-full text-sm" value={dest} onChange={(e) => setDest(e.target.value)} />
          </div>
        </div>
        <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition">Find Routes</button>
        <div className="mt-4 p-4 bg-blue-900/20 border border-blue-500/20 rounded-xl">
          <div className="text-blue-300 text-sm font-medium mb-2">📍 Best Route: {origin} → {dest}</div>
          <div className="text-gray-400 text-xs">Local Train (Western) to Churchgate → Cab to Gateway (45 min · ₹60)</div>
        </div>
      </GlassCard>

      <div>
        <h3 className="text-white font-bold text-xl mb-4">🚦 Available Now</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TRANSPORT_OPTIONS.map((t) => (
            <GlassCard key={t.name} className={`p-5 ${!t.available ? "opacity-50" : ""}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{t.icon}</span>
                  <div>
                    <div className="text-white font-bold">{t.name}</div>
                    <div className="text-gray-500 text-xs">{t.type}</div>
                  </div>
                </div>
                <span className={`w-2 h-2 rounded-full ${t.available ? "bg-emerald-400" : "bg-gray-600"}`} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-xs">ETA: <span className="text-white">{t.eta}</span></span>
                <span className="text-orange-400 font-bold text-sm">{t.price}</span>
              </div>
              {t.available && <button className="w-full mt-3 bg-white/10 hover:bg-white/20 text-white text-xs py-2 rounded-lg transition">Book Now</button>}
            </GlassCard>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-white font-bold text-xl mb-4">🚗 Vehicle Rental</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { type: "Scooter (Activa)", icon: "🛵", price: "₹300/day", rating: 4.7 },
            { type: "Car (Hatchback)", icon: "🚙", price: "₹1500/day", rating: 4.5 },
            { type: "Royal Enfield", icon: "🏍️", price: "₹800/day", rating: 4.8 },
          ].map((v) => (
            <GlassCard key={v.type} className="p-5 text-center">
              <div className="text-4xl mb-2">{v.icon}</div>
              <div className="text-white font-bold">{v.type}</div>
              <div className="text-orange-400 font-bold text-lg mt-1">{v.price}</div>
              <StarRating rating={v.rating} />
              <button className="mt-3 w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs py-2 rounded-lg hover:opacity-90 transition">Reserve</button>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}

function DashboardPage() {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);

  return (
    <div className="space-y-8 px-4 md:px-8">
      <SectionHeader title="Live Dashboard" subtitle={`${time.toLocaleTimeString()} · Live data for Mumbai`} accent="from-emerald-400 to-teal-400" />
      <GlassCard hover={false} className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="text-6xl font-black text-white">{WEATHER_MOCK.temp}°C</div>
            <div className="text-gray-400">{WEATHER_MOCK.condition}</div>
            <div className="flex gap-4 mt-3 text-sm text-gray-400">
              <span>💧 {WEATHER_MOCK.humidity}%</span>
              <span>🌬️ {WEATHER_MOCK.wind}</span>
            </div>
          </div>
          <div className="flex gap-3 overflow-x-auto">
            {WEATHER_MOCK.forecast.map((d) => (
              <div key={d.day} className="text-center min-w-[60px] bg-white/5 rounded-xl p-3">
                <div className="text-gray-400 text-xs">{d.day}</div>
                <div className="text-xl my-1">{d.icon}</div>
                <div className="text-white text-xs font-bold">{d.high}°</div>
                <div className="text-gray-500 text-xs">{d.low}°</div>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      <div>
        <h3 className="text-white font-bold text-xl mb-4">🔴 Live Crowd Levels</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {WEATHER_MOCK.crowds.map((c) => (
            <GlassCard key={c.place} hover={false} className="p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="text-white font-semibold">{c.place}</div>
                <Badge color={c.level > 80 ? "rose" : c.level > 50 ? "amber" : "emerald"}>{c.status}</Badge>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className={`h-2 rounded-full transition-all duration-500 ${c.level > 80 ? "bg-rose-500" : c.level > 50 ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: `${c.level}%` }} />
              </div>
              <div className="text-gray-400 text-xs mt-1">{c.level}% capacity</div>
            </GlassCard>
          ))}
        </div>
      </div>

      <GlassCard hover={false} className="p-6">
        <h3 className="text-white font-bold text-lg mb-4">🗺️ Map Preview · Mumbai</h3>
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl h-64 flex items-center justify-center relative overflow-hidden border border-white/10">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          {[{ x: "30%", y: "40%", label: "Marine Drive 🔴" }, { x: "55%", y: "30%", label: "Bandra 🟠" }, { x: "70%", y: "55%", label: "Gateway 🟢" }].map((pin) => (
            <div key={pin.label} className="absolute text-xs bg-black/80 px-2 py-1 rounded-lg text-white border border-white/20" style={{ left: pin.x, top: pin.y }}>{pin.label}</div>
          ))}
          <div className="text-center z-10">
            <div className="text-4xl">🇮🇳</div>
            <div className="text-gray-400 text-xs mt-1">Interactive map · Tap to explore</div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

function AIPage() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "👋 Hey! I'm Wandrr AI — your personal India travel companion. Tell me where you want to go and I'll craft the perfect itinerary. Try: *Plan a 5-day Jaipur trip* or *Best street food in Varanasi*" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [savedTrips] = useState([
    { name: "Jaipur 5-Day", city: "Jaipur", days: 5, saved: "2 days ago" },
    { name: "Goa Weekend", city: "Goa", days: 2, saved: "1 week ago" },
  ]);
  const chatRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: input }]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "ai", text: AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)] }]);
      setLoading(false);
    }, 1200);
  };

  useEffect(() => { if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight; }, [messages, loading]);

  return (
    <div className="space-y-8 px-4 md:px-8">
      <SectionHeader title="AI Trip Planner" subtitle="Powered by Wandrr Intelligence" accent="from-orange-400 to-pink-400" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <GlassCard hover={false} className="flex flex-col h-[500px]">
            <div className="p-4 border-b border-white/10 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-600 to-pink-600 flex items-center justify-center text-sm">🤖</div>
              <div>
                <div className="text-white font-semibold text-sm">Wandrr AI</div>
                <div className="text-emerald-400 text-xs flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block" /> Online</div>
              </div>
            </div>
            <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${m.role === "user" ? "bg-orange-600 text-white rounded-br-sm" : "bg-white/10 text-gray-200 rounded-bl-sm"}`}>{m.text}</div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-bl-sm">
                    <div className="flex gap-1">{[0,1,2].map((i) => <span key={i} className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}</div>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 outline-none text-sm focus:border-orange-500 transition" placeholder="Ask about any city..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} />
                <button onClick={sendMessage} className="bg-gradient-to-r from-orange-600 to-pink-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition">↑</button>
              </div>
              <div className="flex gap-2 mt-2 flex-wrap">
                {["5-day Jaipur", "Varanasi food", "Cheap Goa"].map((s) => (
                  <button key={s} onClick={() => setInput(s)} className="text-xs bg-white/5 border border-white/10 text-gray-400 px-2.5 py-1 rounded-lg hover:bg-white/10 transition">{s}</button>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
        <div className="space-y-4">
          <h3 className="text-white font-bold text-lg">📌 Saved Trips</h3>
          {savedTrips.map((trip) => (
            <GlassCard key={trip.name} className="p-4">
              <div className="text-white font-semibold">{trip.name}</div>
              <div className="text-gray-500 text-xs mt-1">{trip.days} days · {trip.saved}</div>
              <div className="flex gap-2 mt-3">
                <button className="flex-1 text-xs bg-orange-600/30 border border-orange-500/30 text-orange-300 py-1.5 rounded-lg hover:bg-orange-600/50 transition">View</button>
                <button className="flex-1 text-xs bg-white/5 border border-white/10 text-gray-400 py-1.5 rounded-lg hover:bg-white/10 transition">Share</button>
              </div>
            </GlassCard>
          ))}
          <GlassCard className="p-4 border-dashed border-white/20 text-center"><div className="text-gray-500 text-sm">+ New Trip</div></GlassCard>
        </div>
      </div>
    </div>
  );
}

function SocialPage() {
  const posts = [
    { user: "Zara K.", city: "Varanasi", content: "The Ganga Aarti is life-changing. Went alone, sat by the ghats, pure peace 🪔", time: "2h ago", likes: 142 },
    { user: "Leo M.", city: "Jaipur", content: "Caught sunset at Nahargarh Fort. A local auto driver showed me a secret spot — incredible views! 🌅", time: "5h ago", likes: 98 },
    { user: "Nina P.", city: "Mumbai", content: "Had Vada Pav outside Mithibai College. The chutney was so spicy but so good! 🌶️", time: "1d ago", likes: 231 },
  ];

  return (
    <div className="space-y-10 px-4 md:px-8">
      <SectionHeader title="Social" subtitle="Travel together, experience more" accent="from-pink-400 to-orange-400" />
      <div>
        <h3 className="text-white font-bold text-xl mb-4">🧑‍🤝‍🧑 Travel Buddy Matcher</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BUDDIES.map((b) => (
            <GlassCard key={b.name} className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-2xl flex-shrink-0">{b.avatar}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="text-white font-bold">{b.name}</div>
                  <Badge color="amber">{b.match}% match</Badge>
                </div>
                <div className="text-gray-500 text-xs">Age {b.age} · From {b.from}</div>
                <div className="text-gray-400 text-xs mt-1">Going to: <span className="text-orange-400">{b.going}</span></div>
                <div className="text-gray-400 text-xs">Vibe: {b.vibe}</div>
              </div>
              <button className="text-xs bg-pink-600/30 border border-pink-500/30 text-pink-300 px-3 py-1.5 rounded-lg hover:bg-pink-600/50 transition flex-shrink-0">Connect</button>
            </GlassCard>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-white font-bold text-xl mb-4">📸 Traveler Posts</h3>
        <div className="space-y-4">
          {posts.map((p, i) => (
            <GlassCard key={i} hover={false} className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-600 to-pink-600 flex items-center justify-center text-xs text-white font-bold">{p.user[0]}</div>
                <div>
                  <div className="text-white font-semibold text-sm">{p.user}</div>
                  <div className="text-gray-500 text-xs">{p.city} · {p.time}</div>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{p.content}</p>
              <div className="flex items-center gap-4 mt-3">
                <button className="text-gray-400 hover:text-red-400 text-xs transition">♥ {p.likes}</button>
                <button className="text-gray-400 hover:text-cyan-400 text-xs transition">💬 Reply</button>
                <button className="text-gray-400 hover:text-orange-400 text-xs transition">↗ Share</button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}

function StudentPage() {
  const [verified, setVerified] = useState(false);
  return (
    <div className="space-y-8 px-4 md:px-8">
      <SectionHeader title="Student Offers" subtitle="Travel smart on a student budget" accent="from-amber-400 to-yellow-400" />
      {!verified ? (
        <GlassCard hover={false} className="p-6 border-amber-500/30">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="text-4xl">🎓</div>
            <div className="flex-1">
              <div className="text-white font-bold text-lg">Verify Student Status</div>
              <div className="text-gray-400 text-sm">Upload your College ID to unlock exclusive discounts</div>
            </div>
            <button onClick={() => setVerified(true)} className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:opacity-90 transition">Verify Now</button>
          </div>
        </GlassCard>
      ) : (
        <GlassCard hover={false} className="p-4 border-emerald-500/30 bg-emerald-900/10">
          <div className="flex items-center gap-3"><span className="text-2xl">✅</span><div className="text-emerald-300 font-semibold">Student verified! All discounts unlocked.</div></div>
        </GlassCard>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {STUDENT_DEALS.map((deal) => (
          <GlassCard key={deal.brand} className="p-5 flex items-center gap-4">
            <div className="text-3xl">{deal.icon}</div>
            <div className="flex-1">
              <div className="text-white font-bold">{deal.brand}</div>
              <div className="text-gray-500 text-xs">{deal.type}</div>
              <div className="text-amber-400 font-bold text-lg mt-1">{deal.discount}</div>
            </div>
            <button className={`text-xs px-3 py-1.5 rounded-lg transition ${verified ? "bg-amber-600/30 border border-amber-500/30 text-amber-300 hover:bg-amber-600/50" : "bg-white/5 border border-white/10 text-gray-500 cursor-not-allowed"}`}>{verified ? "Claim" : "Locked 🔒"}</button>
          </GlassCard>
        ))}
      </div>
      <div>
        <h3 className="text-white font-bold text-xl mb-4">💡 Budget Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { tip: "Book Zostel or Hosteller dorms for ₹500/night vs expensive hotels", icon: "🛏️" },
            { tip: "Use Sleeper Class in Indian Railways for overnight inter-city travel", icon: "🚂" },
            { tip: "Eat at local dhabas and street food carts for authentic, cheap meals", icon: "🍛" },
          ].map((t, i) => (
            <GlassCard key={i} className="p-4 flex gap-3"><span className="text-2xl flex-shrink-0">{t.icon}</span><p className="text-gray-300 text-sm">{t.tip}</p></GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}

function SafetyPage() {
  const [sosActive, setSosActive] = useState(false);
  const emergencyContacts = [
    { name: "National Emergency", number: "112" },
    { name: "Police", number: "100" },
    { name: "Ambulance", number: "108" },
    { name: "Women Helpline", number: "1091" },
  ];

  return (
    <div className="space-y-8 px-4 md:px-8">
      <SectionHeader title="Safety Center" subtitle="Your safety is our priority" accent="from-red-400 to-rose-400" />
      <GlassCard hover={false} className="p-8 text-center border-red-500/30 bg-red-900/10">
        <div className="text-lg text-gray-400 mb-4">Press and hold in an emergency</div>
        <button onClick={() => setSosActive(!sosActive)}
          className={`w-32 h-32 rounded-full border-4 font-black text-2xl transition-all duration-300 mx-auto flex items-center justify-center ${sosActive ? "bg-red-600 border-red-400 text-white scale-110 shadow-lg shadow-red-500/50 animate-pulse" : "bg-red-900/30 border-red-500 text-red-400 hover:bg-red-800/40"}`}>
          SOS
        </button>
        {sosActive && <div className="mt-4 text-red-300 font-semibold animate-pulse">🚨 Alert sent to emergency contacts & local authorities</div>}
        {sosActive && <button onClick={() => setSosActive(false)} className="mt-3 text-xs text-gray-400 underline">Cancel Alert</button>}
      </GlassCard>
      <div>
        <h3 className="text-white font-bold text-xl mb-4">📞 Emergency Contacts</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {emergencyContacts.map((ec) => (
            <GlassCard key={ec.name} hover={false} className="p-4 text-center">
              <div className="text-gray-400 text-xs mb-1">{ec.name}</div>
              <div className="text-white font-bold text-2xl">{ec.number}</div>
            </GlassCard>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-white font-bold text-xl mb-4">🛡️ Safety Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { tip: "Share your live WhatsApp location with family when travelling alone", icon: "📍" },
            { tip: "Keep a digital copy of your Aadhaar card in Digilocker", icon: "📄" },
            { tip: "Avoid displaying expensive items in crowded local trains/bazaars", icon: "👜" },
            { tip: "Always negotiate Auto fares or insist on the meter before getting in", icon: "🛺" },
          ].map((t, i) => (
            <GlassCard key={i} className="p-4 flex gap-3 items-start"><span className="text-xl flex-shrink-0">{t.icon}</span><p className="text-gray-300 text-sm">{t.tip}</p></GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}

function SmartPage() {
  const [offlineMode, setOfflineMode] = useState(false);
  const [arActive, setArActive] = useState(false);

  return (
    <div className="space-y-10 px-4 md:px-8">
      <SectionHeader title="Smart Features" subtitle="AI-powered tools for modern travelers" accent="from-cyan-400 to-blue-400" />
      <div>
        <h3 className="text-white font-bold text-xl mb-4">🗣️ Local Language Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {LANGUAGE_TIPS.map((l) => (
            <GlassCard key={l.phrase} className="p-5 flex items-center gap-4">
              <div className="text-3xl">{l.icon}</div>
              <div>
                <div className="text-xs text-gray-500">{l.lang}</div>
                <div className="text-white font-bold text-lg">{l.phrase}</div>
                <div className="text-gray-400 text-sm">{l.meaning}</div>
              </div>
              <button className="ml-auto text-xs bg-cyan-600/20 border border-cyan-500/30 text-cyan-300 px-3 py-1.5 rounded-lg hover:bg-cyan-600/30 transition">🔊 Play</button>
            </GlassCard>
          ))}
        </div>
      </div>
      <GlassCard hover={false} className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-white font-bold text-lg">📴 Offline Mode</h3>
            <p className="text-gray-400 text-sm mt-1">Download your city guide for offline access</p>
          </div>
          <button onClick={() => setOfflineMode(!offlineMode)} className={`relative w-12 h-6 rounded-full transition-all duration-300 ${offlineMode ? "bg-cyan-600" : "bg-white/20"}`}>
            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${offlineMode ? "left-7" : "left-1"}`} />
          </button>
        </div>
        {offlineMode && (
          <div className="space-y-2">
            {["Maps & Navigation", "Restaurant Guide", "Transport Info", "Emergency Contacts"].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm">
                <span className="text-emerald-400">✓</span>
                <span className="text-gray-300">{item}</span>
                <span className="ml-auto text-gray-500 text-xs">Synced</span>
              </div>
            ))}
          </div>
        )}
      </GlassCard>
      <GlassCard hover={false} className="p-6">
        <h3 className="text-white font-bold text-lg mb-2">🥽 AR Monument Guide</h3>
        <p className="text-gray-400 text-sm mb-4">Point your camera at any landmark to see AI-powered insights</p>
        <div onClick={() => setArActive(!arActive)} className={`relative rounded-xl overflow-hidden h-48 flex items-center justify-center cursor-pointer transition-all ${arActive ? "border-2 border-cyan-400" : "border border-white/10 bg-white/5"}`}>
          {arActive ? (
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <div className="border-2 border-cyan-400 w-32 h-32 rounded-xl relative">
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />
                  <div className="absolute inset-0 flex items-center justify-center text-3xl">🏛️</div>
                </div>
                <div className="mt-3 bg-black/70 px-3 py-1.5 rounded-lg text-cyan-300 text-xs font-mono">Gateway of India · Built 1924 · Indo-Saracenic Style</div>
              </div>
            </div>
          ) : (
            <div className="text-center"><div className="text-4xl mb-2">📷</div><div className="text-gray-400 text-sm">Tap to activate AR Camera</div></div>
          )}
        </div>
      </GlassCard>
    </div>
  );
}

function EventsPage() {
  const [selectedType, setSelectedType] = useState("All");
  const types = ["All", "Cultural", "Traditional", "Music & Party", "Spiritual", "Art & Culture"];
  const filtered = selectedType === "All" ? EVENTS : EVENTS.filter((e) => e.type === selectedType);

  return (
    <div className="space-y-8 px-4 md:px-8">
      <SectionHeader title="Culture & Events" subtitle="Festivals, traditions & local celebrations" accent="from-rose-400 to-amber-400" />
      <div className="flex flex-wrap gap-2">
        {types.map((t) => (
          <button key={t} onClick={() => setSelectedType(t)}
            className={`px-4 py-1.5 rounded-full text-sm border transition ${selectedType === t ? "bg-rose-600 border-rose-500 text-white" : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"}`}>
            {t}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((event) => (
          <GlassCard key={event.name} className="p-5">
            <div className="text-4xl mb-3">{event.icon}</div>
            <div className="text-white font-bold">{event.name}</div>
            <div className="text-gray-500 text-xs mt-1">{event.city}</div>
            <div className="flex items-center justify-between mt-3">
              <Badge color="rose">{event.type}</Badge>
              <span className="text-orange-400 text-xs font-mono">{event.date}</span>
            </div>
            <button className="w-full mt-3 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-xs py-2 rounded-lg transition">Add to Itinerary</button>
          </GlassCard>
        ))}
      </div>
      <div>
        <h3 className="text-white font-bold text-xl mb-4">🏛️ Historical Highlights</h3>
        <div className="space-y-3">
          {[
            { city: "Jaipur", fact: "Known as the Pink City. Founded in 1727 by the Rajput ruler Jai Singh II.", icon: "👑" },
            { city: "Varanasi", fact: "One of the oldest continuously inhabited cities in the world.", icon: "🗺️" },
            { city: "Kochi", fact: "The 'Queen of the Arabian Sea', a major spice trading center from the 14th century.", icon: "📜" },
          ].map((h) => (
            <GlassCard key={h.city} className="p-4 flex items-center gap-4">
              <span className="text-2xl">{h.icon}</span>
              <div>
                <div className="text-white font-semibold">{h.city}</div>
                <div className="text-gray-400 text-sm">{h.fact}</div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}

function MapPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedPin, setSelectedPin] = useState(null);
  const filters = ["All", "🍛 Food", "🎭 Attractions", "🚆 Transport", "🏨 Stay"];
  const pins = [
    { id: 1, label: "Khau Galli", type: "Food", icon: "🍛", x: "25%", y: "35%", desc: "Famous street food lane. Try the Pav Bhaji.", price: "₹100–300" },
    { id: 2, label: "Marine Drive", type: "Attractions", icon: "🌊", x: "45%", y: "60%", desc: "The Queen's Necklace. Best at sunset.", price: "Free" },
    { id: 3, label: "CSMT Station", type: "Transport", icon: "🚆", x: "35%", y: "40%", desc: "Historic railway terminus & architectural marvel.", price: "₹10–50" },
    { id: 4, label: "Gateway of India", type: "Attractions", icon: "🏛️", x: "65%", y: "30%", desc: "Iconic arch overlooking the Arabian Sea.", price: "Free" },
    { id: 5, label: "Leopold Cafe", type: "Food", icon: "🍽️", x: "55%", y: "50%", desc: "Historic cafe in Colaba, popular with tourists.", price: "₹800–1200" },
    { id: 6, label: "Taj Mahal Palace", type: "Stay", icon: "🏨", x: "70%", y: "65%", desc: "Premium heritage hotel next to the Gateway.", price: "₹18,000/night" },
  ];
  const filteredPins = activeFilter === "All" ? pins : pins.filter((p) => activeFilter.includes(p.type));

  return (
    <div className="space-y-6 px-4 md:px-8">
      <SectionHeader title="Interactive Map" subtitle="Explore Mumbai pin by pin" accent="from-teal-400 to-cyan-400" />
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button key={f} onClick={() => setActiveFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm border transition ${activeFilter === f ? "bg-teal-600 border-teal-500 text-white" : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"}`}>
            {f}
          </button>
        ))}
      </div>
      <div className="relative">
        <GlassCard hover={false} className="overflow-hidden" style={{ height: "480px" }}>
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, #0f172a 0%, #020617 100%)" }}>
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(rgba(251,146,60,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(251,146,60,0.3) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
            <svg className="absolute inset-0 w-full h-full opacity-20">
              <line x1="0" y1="45%" x2="100%" y2="45%" stroke="#ea580c" strokeWidth="2" />
              <line x1="0" y1="65%" x2="100%" y2="65%" stroke="#ea580c" strokeWidth="1" />
              <line x1="40%" y1="0" x2="40%" y2="100%" stroke="#ea580c" strokeWidth="2" />
              <line x1="60%" y1="0" x2="60%" y2="100%" stroke="#ea580c" strokeWidth="1" />
            </svg>
          </div>
          {filteredPins.map((pin) => (
            <button key={pin.id} onClick={() => setSelectedPin(selectedPin?.id === pin.id ? null : pin)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 group" style={{ left: pin.x, top: pin.y }}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all text-lg ${selectedPin?.id === pin.id ? "bg-orange-600 border-orange-400 scale-125 shadow-lg shadow-orange-500/50" : "bg-gray-900/90 border-white/30 group-hover:border-orange-400 group-hover:scale-110"}`}>
                {pin.icon}
              </div>
              <div className="absolute bottom-11 left-1/2 -translate-x-1/2 bg-black/90 px-2 py-0.5 rounded-lg text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition border border-white/20">{pin.label}</div>
            </button>
          ))}
          {selectedPin && (
            <div className="absolute bottom-4 left-4 right-4 bg-gray-900/95 border border-orange-500/40 rounded-xl p-4 z-20 backdrop-blur">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{selectedPin.icon}</span>
                <div className="flex-1">
                  <div className="text-white font-bold">{selectedPin.label}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{selectedPin.desc}</div>
                  <div className="flex items-center gap-3 mt-2">
                    <Badge color="amber">{selectedPin.type}</Badge>
                    <span className="text-orange-400 text-xs font-bold">{selectedPin.price}</span>
                  </div>
                </div>
                <button onClick={() => setSelectedPin(null)} className="text-gray-500 hover:text-white text-lg">×</button>
              </div>
            </div>
          )}
        </GlassCard>
      </div>
      <div className="flex flex-wrap gap-4 text-xs text-gray-400">
        {[["🍛", "Food"], ["🎭", "Attractions"], ["🚆", "Transport"], ["🏨", "Stay"]].map(([icon, label]) => (
          <div key={label} className="flex items-center gap-1"><span>{icon}</span> {label}</div>
        ))}
      </div>
    </div>
  );
}

export default function WandrApp() {
  const [activePage, setActivePage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const pages = {
    home: <HomePage onNavigate={setActivePage} />,
    explore: <ExplorePage />,
    food: <FoodPage />,
    transport: <TransportPage />,
    dashboard: <DashboardPage />,
    ai: <AIPage />,
    social: <SocialPage />,
    student: <StudentPage />,
    safety: <SafetyPage />,
    smart: <SmartPage />,
    events: <EventsPage />,
    map: <MapPage />,
  };

  const navLabels = {
    home: "🏠 Home", explore: "🧭 Explore", food: "🍽️ Food & Life", transport: "🛺 Transport",
    dashboard: "🌦️ Dashboard", ai: "🤖 AI Planner", social: "👥 Social", student: "🎓 Student",
    safety: "🛡️ Safety", smart: "🧠 Smart", events: "🎉 Events", map: "🗺️ Map",
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white" style={{ fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif" }}>
      <header className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <button onClick={() => setActivePage("home")} className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-500 to-green-600 flex items-center justify-center text-xs font-black">W</div>
            <span className="text-white font-black text-lg tracking-tight">Wandrr</span>
            <span className="text-orange-400 text-xs font-medium hidden sm:block">India</span>
          </button>
          <nav className="hidden lg:flex items-center gap-1">
            {Object.entries(navLabels).slice(0, 6).map(([id, label]) => (
              <button key={id} onClick={() => setActivePage(id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activePage === id ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>
                {label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-3 py-1 text-xs text-gray-400">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />Live
            </div>
            <button onClick={() => setMenuOpen(!menuOpen)} className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-gray-400 hover:bg-white/20 transition lg:hidden">
              {menuOpen ? "✕" : "☰"}
            </button>
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-green-500 flex items-center justify-center text-xs font-bold hidden md:flex">S</div>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-gray-950/95 backdrop-blur-xl pt-14 lg:hidden">
          <div className="p-4 grid grid-cols-2 gap-2 overflow-y-auto max-h-[calc(100vh-56px)]">
            {Object.entries(navLabels).map(([id, label]) => (
              <button key={id} onClick={() => { setActivePage(id); setMenuOpen(false); }}
                className={`p-4 rounded-xl text-left text-sm font-medium border transition ${activePage === id ? "bg-orange-600/30 border-orange-500/50 text-white" : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"}`}>
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="bg-gray-900/50 border-b border-white/5 overflow-x-auto sticky top-14 z-40">
        <div className="flex items-center px-4 h-10 gap-1 min-w-max">
          {Object.entries(navLabels).map(([id, label]) => (
            <button key={id} onClick={() => setActivePage(id)}
              className={`px-3 py-1 rounded-md text-xs whitespace-nowrap transition ${activePage === id ? "bg-orange-600 text-white font-semibold" : "text-gray-500 hover:text-gray-300"}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto py-8 pb-20">{pages[activePage]}</main>

      <div className="fixed bottom-0 left-0 right-0 bg-gray-950/95 backdrop-blur-xl border-t border-white/5 z-50 lg:hidden">
        <div className="flex justify-around py-2 px-2">
          {[["home","🏠"],["explore","🧭"],["ai","🤖"],["map","🗺️"],["safety","🛡️"]].map(([id, icon]) => (
            <button key={id} onClick={() => setActivePage(id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition ${activePage === id ? "text-orange-400" : "text-gray-600 hover:text-gray-400"}`}>
              <span className="text-xl">{icon}</span>
              <span className="text-[9px] capitalize">{id === "ai" ? "AI" : id}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}