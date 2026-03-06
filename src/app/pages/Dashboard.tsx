import { Zap, Flame, Globe2, Trophy } from "lucide-react";
import { useApp } from "../contexts/AppContext";

export function Dashboard() {
  const { actions, totalXP, totalCO2Saved, streak, level } = useApp();

  const streakDays = [
    { day: "M", active: true },
    { day: "T", active: true },
    { day: "W", active: true },
    { day: "T", active: true },
    { day: "F", active: true },
    { day: "S", active: true },
    { day: "S", active: true },
    { day: "M", active: true },
    { day: "T", active: true },
    { day: "W", active: true },
    { day: "T", active: true },
    { day: "F", active: true },
    { day: "S", active: true },
    { day: "S", active: true },
    { day: "M", active: false, current: true },
  ];

  const prevWeekDays = [
    { day: "T", active: false },
    { day: "W", active: false },
    { day: "T", active: false },
    { day: "F", active: false },
    { day: "S", active: false },
  ];

  // Get most recent actions (up to 3)
  const recentActions = actions.slice(0, 3);

  const getActionColor = (type: string) => {
    const colors: { [key: string]: string } = {
      thrift: "#bef264",
      swap: "#22d3ee",
      repair: "#fb923c",
      borrow: "#a855f7",
      upcycle: "#ec4899",
      rent: "#3b82f6",
    };
    return colors[type] || "#bef264";
  };

  const leaderboard = [
    { rank: 1, name: "Maya K.", xp: 2840, icon: "🦋" },
    { rank: 2, name: "Jade R.", xp: 2210, icon: "🏠" },
    { rank: 3, name: "You", xp: totalXP, icon: "⚡" },
  ];

  const levelProgress = ((totalXP % 200) / 200) * 100;
  const levelName =
    level >= 8 ? "Eco Warrior" : level >= 5 ? "Thrift Champion" : "Conscious Consumer";

  return (
    <div className="space-y-6">
      <h1 className="text-5xl text-white mb-8">
        Your Sustainability HQ 🏠
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Total XP Card */}
        <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-3xl p-6 border border-gray-800">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-orange-400" fill="currentColor" />
            <span className="text-xs text-gray-400 uppercase tracking-wide">
              Total XP
            </span>
          </div>
          <div className="text-5xl mb-2" style={{ color: "#a855f7" }}>
            {totalXP}
          </div>
          <div className="text-sm text-gray-400 mb-4">+80 XP this week</div>

          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-400">Level {level} — {levelName}</span>
            <span className="text-gray-400">{Math.round(levelProgress)}%</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${levelProgress}%`,
                background: "linear-gradient(to right, #a855f7, #ec4899)",
              }}
            ></div>
          </div>
        </div>

        {/* Current Streak Card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-3xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-400" fill="currentColor" />
              <span className="text-xs text-gray-400 uppercase tracking-wide">
                Current Streak
              </span>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-400 uppercase tracking-wide">
                This Month
              </div>
              <div className="text-2xl text-[#bef264]">22/30</div>
              <div className="text-xs text-gray-400">days active</div>
            </div>
          </div>
          <div className="text-5xl text-orange-400 mb-2">{streak} Days</div>
          <div className="text-sm text-gray-400 mb-4">
            Personal best! Keep it going ✨
          </div>

          <div className="flex gap-2 mb-2">
            {streakDays.map((item, index) => (
              <div
                key={index}
                className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm ${
                  item.current
                    ? "bg-orange-400 text-black"
                    : item.active
                    ? "bg-[#bef264] text-black"
                    : "bg-gray-800 text-gray-600"
                }`}
              >
                {item.day}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            {prevWeekDays.map((item, index) => (
              <div
                key={index}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-sm bg-gray-800 text-gray-600"
              >
                {item.day}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Carbon Footprint Tracker */}
        <div className="lg:col-span-2 bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-3xl p-6 border border-gray-800">
          <div className="flex items-center gap-2 mb-2">
            <Globe2 className="w-5 h-5 text-cyan-400" />
            <span className="text-xs text-gray-400 uppercase tracking-wide">
              Carbon Footprint Tracker
            </span>
          </div>
          <div className="mb-1">
            <span className="text-4xl text-cyan-400">
              -{totalCO2Saved.toFixed(1)} kg CO
            </span>
            <span className="text-2xl text-cyan-400">₂</span>
          </div>
          <div className="text-sm text-gray-400 mb-6">
            saved vs buying new this month
          </div>

          <div className="space-y-4">
            {recentActions.length > 0 ? (
              recentActions.map((action) => (
                <div key={action.id}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{action.icon}</span>
                      <span className="text-white">{action.name}</span>
                    </div>
                    <span className="text-cyan-400">
                      -{action.co2Saved.toFixed(1)} kg
                    </span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.min(action.co2Saved * 10, 100)}%`,
                        backgroundColor: getActionColor(action.type),
                      }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                No actions logged yet. Click "Log Action" to get started!
              </div>
            )}
          </div>
        </div>

        {/* Friend Leaderboard */}
        <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-3xl p-6 border border-gray-800">
          <div className="flex items-center gap-2 mb-6">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="text-xs text-gray-400 uppercase tracking-wide">
              Friend Leaderboard
            </span>
          </div>

          <div className="space-y-4">
            {leaderboard.map((player, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-[#0f172a] rounded-xl border border-gray-800"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xl ${
                      player.rank === 1 ? "text-yellow-400" : "text-gray-400"
                    }`}
                  >
                    {player.rank}
                  </span>
                  <span className="text-2xl">{player.icon}</span>
                  <span
                    className={
                      player.name === "You" ? "text-[#bef264]" : "text-white"
                    }
                  >
                    {player.name}
                  </span>
                </div>
                <span className="text-[#bef264]">{player.xp} XP</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}