import { Trophy, Medal, Award } from "lucide-react";
import { useApp } from "../contexts/AppContext";

export function Leaderboard() {
  const { totalCO2Saved, streak, actions, challenges, level } = useApp();
  const lifetimeXP = actions.reduce((sum, action) => sum + action.xpEarned, 0);

  const globalLeaders = [
    { rank: 1, name: "Sarah Chen", xp: 4580, icon: "🌟", level: "Level 12" },
    { rank: 2, name: "Alex Martinez", xp: 4210, icon: "🔥", level: "Level 11" },
    { rank: 3, name: "Maya K.", xp: 2840, icon: "🦋", level: "Level 9" },
    { rank: 4, name: "Jordan Lee", xp: 2650, icon: "🌿", level: "Level 9" },
    { rank: 5, name: "Jade R.", xp: 2210, icon: "🏠", level: "Level 8" },
    { rank: 6, name: "Sam Thompson", xp: 2180, icon: "⭐", level: "Level 8" },
    { rank: 7, name: "Riley Park", xp: 1980, icon: "🌸", level: "Level 8" },
    { rank: 8, name: "Casey Brown", xp: 1650, icon: "🌊", level: "Level 7" },
    { rank: 9, name: "Morgan Davis", xp: 1420, icon: "🍃", level: "Level 7" },
    { rank: 27, name: "You", xp: lifetimeXP, icon: "⚡", level: `Level ${level}` },
  ];

  const friendLeaders = [
    { rank: 1, name: "Maya K.", xp: 2840, icon: "🦋", level: "Level 9" },
    { rank: 2, name: "Jade R.", xp: 2210, icon: "🏠", level: "Level 8" },
    { rank: 3, name: "Taylor Swift", xp: 980, icon: "🎵", level: "Level 6" },
    { rank: 4, name: "Chris Evans", xp: 650, icon: "🛡️", level: "Level 5" },
    { rank: 5, name: "You", xp: lifetimeXP, icon: "⚡", level: `Level ${level}` },
  ];

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-orange-400" />;
      default:
        return <span className="text-xl text-gray-400">{rank}</span>;
    }
  };

  const activeChallenges = challenges.filter((c) => c.status === "joined").length;

  return (
    <div className="space-y-6">
      <h1 className="text-5xl text-white mb-8">
        Leaderboard 🏆
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Global Leaderboard */}
        <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-3xl p-6 border border-gray-800">
          <div className="flex items-center gap-2 mb-6">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <h2 className="text-2xl text-white">Global Leaders</h2>
          </div>

          <div className="space-y-3">
            {globalLeaders.map((player, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                  player.name === "You"
                    ? "bg-[#bef264]/10 border border-[#bef264]/30"
                    : "bg-[#0f172a] border border-gray-800"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 flex items-center justify-center">
                    {getRankBadge(player.rank)}
                  </div>
                  <span className="text-2xl">{player.icon}</span>
                  <div>
                    <div
                      className={
                        player.name === "You" ? "text-[#bef264]" : "text-white"
                      }
                    >
                      {player.name}
                    </div>
                    <div className="text-xs text-gray-400">{player.level}</div>
                  </div>
                </div>
                <span className="text-[#bef264]">{player.xp} XP</span>
              </div>
            ))}
          </div>
        </div>

        {/* Friends Leaderboard */}
        <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-3xl p-6 border border-gray-800">
          <div className="flex items-center gap-2 mb-6">
            <Trophy className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl text-white">Friends</h2>
          </div>

          <div className="space-y-3">
            {friendLeaders.map((player, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                  player.name === "You"
                    ? "bg-[#bef264]/10 border border-[#bef264]/30"
                    : "bg-[#0f172a] border border-gray-800"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 flex items-center justify-center">
                    {getRankBadge(player.rank)}
                  </div>
                  <span className="text-2xl">{player.icon}</span>
                  <div>
                    <div
                      className={
                        player.name === "You" ? "text-[#bef264]" : "text-white"
                      }
                    >
                      {player.name}
                    </div>
                    <div className="text-xs text-gray-400">{player.level}</div>
                  </div>
                </div>
                <span className="text-[#bef264]">{player.xp} XP</span>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <h3 className="text-white mb-4">Your Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0f172a] p-4 rounded-xl border border-gray-800">
                <div className="text-2xl text-[#bef264] mb-1">{streak}</div>
                <div className="text-sm text-gray-400">Day Streak</div>
              </div>
              <div className="bg-[#0f172a] p-4 rounded-xl border border-gray-800">
                <div className="text-2xl text-cyan-400 mb-1">-{totalCO2Saved.toFixed(1)}kg</div>
                <div className="text-sm text-gray-400">CO₂ Saved</div>
              </div>
              <div className="bg-[#0f172a] p-4 rounded-xl border border-gray-800">
                <div className="text-2xl text-purple-400 mb-1">{activeChallenges}</div>
                <div className="text-sm text-gray-400">Challenges Active</div>
              </div>
              <div className="bg-[#0f172a] p-4 rounded-xl border border-gray-800">
                <div className="text-2xl text-orange-400 mb-1">{actions.length}</div>
                <div className="text-sm text-gray-400">Actions Logged</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
