import { useMemo, useState } from "react";
import { CalendarDays, Leaf, Trophy } from "lucide-react";

type StatKey = "social" | "environment" | "economy";

interface Choice {
  label: string;
  impact: Record<StatKey, number>;
}

interface EventCard {
  title: string;
  prompt: string;
  choices: Choice[];
}

const STARTING_STATS: Record<StatKey, number> = {
  social: 50,
  environment: 50,
  economy: 50,
};

const EVENTS: EventCard[] = [
  {
    title: "Weekend Invite",
    prompt: "Your friends want to go mall shopping today. What do you do?",
    choices: [
      { label: "Go shopping with friends", impact: { social: 10, environment: -15, economy: -10 } },
      { label: "Suggest a thrift trip instead", impact: { social: 6, environment: 10, economy: 5 } },
      { label: "Stay home and mend your clothes", impact: { social: -5, environment: 12, economy: 8 } },
    ],
  },
  {
    title: "Closet Refresh",
    prompt: "You need a new outfit for an event.",
    choices: [
      { label: "Buy a brand-new outfit", impact: { social: 6, environment: -12, economy: -12 } },
      { label: "Borrow from a friend", impact: { social: 8, environment: 10, economy: 6 } },
      { label: "Re-style something you already own", impact: { social: 2, environment: 8, economy: 8 } },
    ],
  },
  {
    title: "Laundry Day",
    prompt: "Your laundry basket is full.",
    choices: [
      { label: "Hot wash + tumble dry", impact: { social: 0, environment: -10, economy: -6 } },
      { label: "Cold wash + line dry", impact: { social: 0, environment: 10, economy: 6 } },
      { label: "Wash only essentials", impact: { social: -2, environment: 8, economy: 8 } },
    ],
  },
  {
    title: "Community Event",
    prompt: "Your neighborhood is hosting a swap event.",
    choices: [
      { label: "Host a swap table", impact: { social: 12, environment: 10, economy: 5 } },
      { label: "Attend as a guest", impact: { social: 7, environment: 6, economy: 3 } },
      { label: "Skip and shop online", impact: { social: -3, environment: -10, economy: -8 } },
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
    setInGame(true);
    setGameOver(false);
    setDay(1);
    setStats(STARTING_STATS);
    setEventIndex(0);
  };

  const endGame = (survivedDays: number) => {
    setInGame(false);
    setGameOver(true);
    setLastRunDays(survivedDays);
    setBestDays((prev) => Math.max(prev, survivedDays));
  };

  const applyChoice = (choice: Choice) => {
    const nextStats: Record<StatKey, number> = {
      social: Math.max(0, Math.min(100, stats.social + choice.impact.social)),
      environment: Math.max(0, Math.min(100, stats.environment + choice.impact.environment)),
      economy: Math.max(0, Math.min(100, stats.economy + choice.impact.economy)),
    };

    if (nextStats.social === 0 || nextStats.environment === 0 || nextStats.economy === 0) {
      endGame(day);
      return;
    }

    const nextDay = day + 1;
    setStats(nextStats);
    setDay(nextDay);
    setEventIndex((prev) => (prev + 1) % EVENTS.length);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-5xl text-white mb-3">Days Challenge 🎮</h1>
        <p className="text-gray-400 text-lg max-w-3xl">
          Survive as many days as possible by balancing social life, environment, and economy.
          Your rank here is based on number of days survived.
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
                <div className="text-sm text-gray-400">{currentEvent.title}</div>
              </div>

              <div className="bg-[#0f172a] border border-gray-800 rounded-2xl p-5">
                <div className="text-xl text-white mb-4">{currentEvent.prompt}</div>
                <div className="space-y-3">
                  {currentEvent.choices.map((choice, index) => (
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
