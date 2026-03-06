import { useMemo, useState } from "react";
import { CalendarDays, Leaf, Trophy } from "lucide-react";

type StatKey = "social" | "environment" | "economy";

interface Choice {
  label: string;
  impact: Record<StatKey, number>;
}

interface EventCard {
  category:
    | "Design"
    | "Production"
    | "Distribution"
    | "Responsible Consumption"
    | "Repurposing Clothes"
    | "Waste Recycling";
  title: string;
  prompt: string;
  choices: Choice[];
}

const STARTING_STATS: Record<StatKey, number> = {
  social: 45,
  environment: 45,
  economy: 45,
};
const PASSIVE_DRAIN = 2;

const EVENTS: EventCard[] = [
  {
    category: "Design",
    title: "Fast-Fashion Flash Sale",
    prompt: "A huge flash sale ends tonight, and everyone in your class is buying.",
    choices: [
      { label: "Buy 2 trendy items", impact: { social: 11, environment: -16, economy: -14 } },
      { label: "Skip the sale and thrift later", impact: { social: -5, environment: 10, economy: 4 } },
      { label: "Repair and restyle old pieces", impact: { social: -8, environment: 12, economy: 8 } },
    ],
  },
  {
    category: "Production",
    title: "Work Dress Code Change",
    prompt: "Your office suddenly requires formal wear for a presentation week.",
    choices: [
      { label: "Buy new formal pieces", impact: { social: 8, environment: -14, economy: -15 } },
      { label: "Rent one outfit and repeat", impact: { social: 3, environment: 8, economy: -5 } },
      { label: "Borrow and tailor lightly", impact: { social: 6, environment: 9, economy: 2 } },
    ],
  },
  {
    category: "Distribution",
    title: "Rainy Week Laundry",
    prompt: "Nothing dries fast this week and you are running out of clean clothes.",
    choices: [
      { label: "Use dryer every night", impact: { social: 3, environment: -12, economy: -9 } },
      { label: "Cold wash + indoor racks", impact: { social: -2, environment: 7, economy: 3 } },
      { label: "Repeat outfits strategically", impact: { social: -6, environment: 10, economy: 6 } },
    ],
  },
  {
    category: "Responsible Consumption",
    title: "Festival Outfit Pressure",
    prompt: "You are invited to a 3-day festival where everyone posts new looks daily.",
    choices: [
      { label: "Buy 3 new outfits", impact: { social: 12, environment: -18, economy: -16 } },
      { label: "Mix-and-match old pieces", impact: { social: -3, environment: 8, economy: 5 } },
      { label: "Swap looks with friends", impact: { social: 8, environment: 9, economy: 4 } },
    ],
  },
  {
    category: "Repurposing Clothes",
    title: "Broken Zipper",
    prompt: "Your go-to jacket zipper breaks before a commute-heavy week.",
    choices: [
      { label: "Replace jacket entirely", impact: { social: 2, environment: -12, economy: -12 } },
      { label: "Pay for quick repair service", impact: { social: 1, environment: 8, economy: -6 } },
      { label: "DIY repair tonight", impact: { social: -4, environment: 10, economy: 6 } },
    ],
  },
  {
    category: "Waste Recycling",
    title: "Family Gift Day",
    prompt: "Relatives expect new clothes for a big family photo tradition.",
    choices: [
      { label: "Buy matching sets for everyone", impact: { social: 10, environment: -15, economy: -15 } },
      { label: "Coordinate existing wardrobe colors", impact: { social: 2, environment: 8, economy: 8 } },
      { label: "Rent coordinated outfits", impact: { social: 6, environment: 6, economy: -4 } },
    ],
  },
  {
    category: "Design",
    title: "Influencer Trend Drop",
    prompt: "A trend you love might disappear next week.",
    choices: [
      { label: "Impulse buy now", impact: { social: 9, environment: -13, economy: -12 } },
      { label: "Wait 48 hours to decide", impact: { social: -2, environment: 5, economy: 6 } },
      { label: "Create trend using existing items", impact: { social: 4, environment: 8, economy: 7 } },
    ],
  },
  {
    category: "Production",
    title: "Commute Crisis",
    prompt: "Public transport delays add stress and you need durable shoes fast.",
    choices: [
      { label: "Buy cheap fast-fashion shoes", impact: { social: 4, environment: -12, economy: -10 } },
      { label: "Repair old soles locally", impact: { social: -1, environment: 9, economy: -4 } },
      { label: "Borrow backup shoes", impact: { social: 5, environment: 7, economy: 6 } },
    ],
  },
  {
    category: "Waste Recycling",
    title: "Office Charity Drive",
    prompt: "Coworkers are donating old clothes, but some pieces are still usable.",
    choices: [
      { label: "Throw everything out quickly", impact: { social: 0, environment: -11, economy: 0 } },
      { label: "Sort for reuse and donation", impact: { social: 3, environment: 9, economy: 2 } },
      { label: "Host a mini office swap first", impact: { social: 9, environment: 7, economy: 3 } },
    ],
  },
  {
    category: "Distribution",
    title: "Travel Packing Limit",
    prompt: "Airline baggage is strict and weather forecast keeps changing.",
    choices: [
      { label: "Buy destination outfits", impact: { social: 5, environment: -13, economy: -13 } },
      { label: "Pack capsule wardrobe only", impact: { social: -3, environment: 10, economy: 8 } },
      { label: "Share luggage with a friend", impact: { social: 6, environment: 6, economy: 4 } },
    ],
  },
  {
    category: "Responsible Consumption",
    title: "Wedding Season",
    prompt: "You have 3 weddings this month with overlapping guests.",
    choices: [
      { label: "Buy a fresh look for each event", impact: { social: 11, environment: -17, economy: -17 } },
      { label: "Rent one outfit and style differently", impact: { social: 4, environment: 8, economy: -5 } },
      { label: "Rewear and accessorize creatively", impact: { social: -2, environment: 11, economy: 8 } },
    ],
  },
  {
    category: "Design",
    title: "Heatwave Week",
    prompt: "Your current clothes feel too warm during an unexpected heatwave.",
    choices: [
      { label: "Buy fast lightweight clothes", impact: { social: 3, environment: -12, economy: -11 } },
      { label: "Alter existing clothes", impact: { social: -3, environment: 8, economy: 5 } },
      { label: "Borrow season-appropriate items", impact: { social: 5, environment: 7, economy: 5 } },
    ],
  },
  {
    category: "Production",
    title: "Team Photoshoot",
    prompt: "Your team wants coordinated outfits for social media branding.",
    choices: [
      { label: "Order matching branded tees", impact: { social: 8, environment: -11, economy: -9 } },
      { label: "Use existing color palette", impact: { social: 3, environment: 6, economy: 4 } },
      { label: "Thrift similar pieces together", impact: { social: 7, environment: 8, economy: 3 } },
    ],
  },
  {
    category: "Responsible Consumption",
    title: "Closet Overflow",
    prompt: "You can barely close your wardrobe, but you still feel you have nothing to wear.",
    choices: [
      { label: "Buy organizers and keep everything", impact: { social: 1, environment: -8, economy: -8 } },
      { label: "Do a strict 30-item capsule reset", impact: { social: -5, environment: 10, economy: 7 } },
      { label: "Swap excess items with friends", impact: { social: 7, environment: 8, economy: 5 } },
    ],
  },
  {
    category: "Distribution",
    title: "Last-Minute Interview",
    prompt: "You need a polished outfit by tomorrow morning.",
    choices: [
      { label: "Buy same-day express fashion", impact: { social: 6, environment: -13, economy: -14 } },
      { label: "Borrow + steam tonight", impact: { social: 5, environment: 8, economy: 4 } },
      { label: "Rework existing formal wear", impact: { social: 2, environment: 7, economy: 6 } },
    ],
  },
  {
    category: "Production",
    title: "Gymwear Breakdown",
    prompt: "Your workout clothes are stretched and tearing.",
    choices: [
      { label: "Buy cheap multi-pack", impact: { social: 2, environment: -12, economy: -10 } },
      { label: "Buy one durable piece only", impact: { social: 1, environment: -3, economy: -5 } },
      { label: "Repair + rotate old sets", impact: { social: -4, environment: 9, economy: 7 } },
    ],
  },
  {
    category: "Responsible Consumption",
    title: "Friend's Birthday Theme",
    prompt: "The party theme requires an outfit color you never wear.",
    choices: [
      { label: "Buy one-time-use outfit", impact: { social: 9, environment: -14, economy: -11 } },
      { label: "Borrow from a friend", impact: { social: 7, environment: 8, economy: 5 } },
      { label: "DIY dye existing piece", impact: { social: 3, environment: 4, economy: 2 } },
    ],
  },
  {
    category: "Repurposing Clothes",
    title: "Repair Queue",
    prompt: "Three clothing items need mending and your weekend is already full.",
    choices: [
      { label: "Replace all three quickly", impact: { social: 0, environment: -16, economy: -16 } },
      { label: "Repair one, postpone two", impact: { social: -2, environment: 4, economy: -2 } },
      { label: "Host group mending night", impact: { social: 8, environment: 10, economy: 5 } },
    ],
  },
  {
    category: "Waste Recycling",
    title: "Online Return Hassle",
    prompt: "A low-quality online order arrived, and return shipping is inconvenient.",
    choices: [
      { label: "Keep it and buy better one too", impact: { social: 1, environment: -13, economy: -13 } },
      { label: "Return it despite the effort", impact: { social: -2, environment: 7, economy: 4 } },
      { label: "Upcycle the item at home", impact: { social: -1, environment: 9, economy: 6 } },
    ],
  },
  {
    category: "Design",
    title: "Climate Rally",
    prompt: "You are invited to speak at a local climate event.",
    choices: [
      { label: "Buy new statement outfit", impact: { social: 10, environment: -12, economy: -12 } },
      { label: "Rewear old outfit confidently", impact: { social: 4, environment: 10, economy: 8 } },
      { label: "Wear thrifted + share story", impact: { social: 8, environment: 11, economy: 5 } },
    ],
  },
  {
    category: "Repurposing Clothes",
    title: "End-of-Month Budget Crunch",
    prompt: "You still need a reliable outfit for daily work but funds are very low.",
    choices: [
      { label: "Use credit to buy new set", impact: { social: 6, environment: -11, economy: -18 } },
      { label: "Repeat wardrobe and accessorize", impact: { social: -3, environment: 7, economy: 8 } },
      { label: "Clothing swap + minor repair", impact: { social: 6, environment: 9, economy: 6 } },
    ],
  },
];

export function DaysChallenge() {
  const [inGame, setInGame] = useState(false);
  const [day, setDay] = useState(1);
  const [stats, setStats] = useState(STARTING_STATS);
  const [bestDays, setBestDays] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [lastRunDays, setLastRunDays] = useState(0);
  const [eventIndex, setEventIndex] = useState(0);
  const [currentChoices, setCurrentChoices] = useState<Choice[]>([]);

  const currentEvent = EVENTS[eventIndex];
  const survivalTitle =
    stats.environment >= 70 ? "Environment Guardian" : stats.environment >= 50 ? "Eco Balancer" : "Learning Recycler";

  const leaderboard = useMemo(() => {
    return [
      { name: "Maya K.", days: 41, badge: "🦋" },
      { name: "Alex M.", days: 36, badge: "🌿" },
      { name: "Jade R.", days: 29, badge: "🏠" },
      { name: "You", days: Math.max(bestDays, lastRunDays), badge: "⚡" },
    ].sort((a, b) => b.days - a.days);
  }, [bestDays, lastRunDays]);

  const startGame = () => {
    const firstEvent = EVENTS[0];
    setInGame(true);
    setGameOver(false);
    setDay(1);
    setStats(STARTING_STATS);
    setEventIndex(0);
    setCurrentChoices(shuffleChoices(firstEvent.choices));
  };

  const endGame = (survivedDays: number) => {
    setInGame(false);
    setGameOver(true);
    setLastRunDays(survivedDays);
    setBestDays((prev) => Math.max(prev, survivedDays));
  };

  const applyChoice = (choice: Choice) => {
    const nextStats: Record<StatKey, number> = {
      social: Math.max(0, Math.min(100, stats.social + choice.impact.social - PASSIVE_DRAIN)),
      environment: Math.max(0, Math.min(100, stats.environment + choice.impact.environment - PASSIVE_DRAIN)),
      economy: Math.max(0, Math.min(100, stats.economy + choice.impact.economy - PASSIVE_DRAIN)),
    };

    if (nextStats.social === 0 || nextStats.environment === 0 || nextStats.economy === 0) {
      endGame(day);
      return;
    }

    const nextDay = day + 1;
    const nextEventIndex = (eventIndex + 1) % EVENTS.length;
    setStats(nextStats);
    setDay(nextDay);
    setEventIndex(nextEventIndex);
    setCurrentChoices(shuffleChoices(EVENTS[nextEventIndex].choices));
  };

  const shuffleChoices = (choices: Choice[]) => {
    const shuffled = [...choices];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-5xl text-white mb-3">Days Challenge 🎮</h1>
        <p className="text-gray-400 text-lg max-w-3xl">
          Survive as many days as possible by balancing social life, environment, and economy.
          Hard mode uses a 20-question event pool and your rank is based on number of days survived.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-3xl p-6 border border-gray-800">
          {!inGame ? (
            <div className="space-y-5">
              <div className="text-2xl text-white">Ready to start a new run?</div>
              <div className="text-gray-400">Start from Day 1 and make daily sustainability decisions.</div>
              <button
                onClick={startGame}
                className="px-6 py-3 rounded-full bg-[#bef264] text-black hover:bg-[#a8d957] transition-colors"
              >
                Start Game
              </button>
              {gameOver && (
                <div className="bg-[#0f172a] border border-gray-800 rounded-2xl p-4">
                  <div className="text-xl text-white mb-1">Game Over</div>
                  <div className="text-gray-300">You survived <span className="text-[#bef264]">{lastRunDays}</span> days.</div>
                  <div className="text-gray-400 text-sm mt-1">Title earned: {survivalTitle}</div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0f172a] border border-gray-800 text-gray-200">
                  <CalendarDays className="w-4 h-4 text-cyan-400" />
                  Day {day}
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">{currentEvent.title}</div>
                  <div className="text-xs text-[#bef264]">{currentEvent.category}</div>
                </div>
              </div>

              <div className="bg-[#0f172a] border border-gray-800 rounded-2xl p-5">
                <div className="text-xl text-white mb-4">{currentEvent.prompt}</div>
                <div className="space-y-3">
                  {currentChoices.map((choice, index) => (
                    <button
                      key={index}
                      onClick={() => applyChoice(choice)}
                      className="w-full text-left px-4 py-3 rounded-xl bg-[#1e293b] border border-gray-700 hover:border-[#bef264] text-gray-100 transition-colors"
                    >
                      {index + 1}. {choice.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-3">
                  <div className="text-xs text-gray-400 mb-1">Social</div>
                  <div className="text-lg text-pink-300">{stats.social}</div>
                </div>
                <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-3">
                  <div className="text-xs text-gray-400 mb-1">Environment</div>
                  <div className="text-lg text-[#bef264]">{stats.environment}</div>
                </div>
                <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-3">
                  <div className="text-xs text-gray-400 mb-1">Economy</div>
                  <div className="text-lg text-cyan-300">{stats.economy}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-3xl p-6 border border-gray-800">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <h2 className="text-xl text-white">Days Leaderboard</h2>
          </div>
          <div className="space-y-3">
            {leaderboard.map((entry, index) => (
              <div
                key={entry.name}
                className={`flex items-center justify-between p-3 rounded-xl border ${
                  entry.name === "You"
                    ? "bg-[#bef264]/10 border-[#bef264]/40"
                    : "bg-[#0f172a] border-gray-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 w-5">{index + 1}</span>
                  <span className="text-xl">{entry.badge}</span>
                  <span className={entry.name === "You" ? "text-[#bef264]" : "text-white"}>{entry.name}</span>
                </div>
                <span className="text-cyan-300">{entry.days} days</span>
              </div>
            ))}
          </div>

          <div className="mt-5 p-4 rounded-xl bg-[#0f172a] border border-gray-800">
            <div className="flex items-center gap-2 text-gray-300 mb-1">
              <Leaf className="w-4 h-4 text-[#bef264]" />
              Best Run
            </div>
            <div className="text-2xl text-white">{bestDays} days</div>
          </div>
        </div>
      </div>
    </div>
  );
}
