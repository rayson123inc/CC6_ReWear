import { Award, Lock } from "lucide-react";
import { useApp } from "../contexts/AppContext";

export function Achievements() {
  const { actions, totalXP, streak, totalCO2Saved, level, challenges } = useApp();

  const actionCountByType = actions.reduce<Record<string, number>>((acc, action) => {
    acc[action.type] = (acc[action.type] || 0) + 1;
    return acc;
  }, {});

  const joinedChallenges = challenges.filter((challenge) => challenge.status === "joined").length;

  const achievements = [
    {
      title: "First Thrift",
      icon: "🌱",
      description: "Log your first thrift action",
      reward: "50 XP",
      unlocked: (actionCountByType.thrift || 0) >= 1,
    },
    {
      title: "On Fire",
      icon: "🔥",
      description: "Reach a 14-day streak",
      reward: "100 XP",
      unlocked: streak >= 14,
    },
    {
      title: "Recycler",
      icon: "♻️",
      description: "Log 5 total actions",
      reward: "80 XP",
      unlocked: actions.length >= 5,
    },
    {
      title: "Planet Saver",
      icon: "🌍",
      description: "Save at least 25kg CO2",
      reward: "150 XP",
      unlocked: totalCO2Saved >= 25,
    },
    {
      title: "Swap Queen",
      icon: "🤝",
      description: "Complete 3 swap actions",
      reward: "120 XP",
      unlocked: (actionCountByType.swap || 0) >= 3,
    },
    {
      title: "Mend It",
      icon: "🧵",
      description: "Complete 2 repair actions",
      reward: "100 XP",
      unlocked: (actionCountByType.repair || 0) >= 2,
    },
    {
      title: "Eco Royalty",
      icon: "👑",
      description: "Reach 2000 total XP",
      reward: "300 XP",
      unlocked: totalXP >= 2000,
    },
    {
      title: "Capsule Pro",
      icon: "💎",
      description: "Log 10 total actions",
      reward: "200 XP",
      unlocked: actions.length >= 10,
    },
    {
      title: "30 Day Hero",
      icon: "🌈",
      description: "Reach a 30-day streak",
      reward: "350 XP",
      unlocked: streak >= 30,
    },
    {
      title: "Transformer",
      icon: "🦋",
      description: "Complete 2 upcycle actions",
      reward: "150 XP",
      unlocked: (actionCountByType.upcycle || 0) >= 2,
    },
    {
      title: "Speed Swapper",
      icon: "⚡",
      description: "Log 3 actions in total",
      reward: "70 XP",
      unlocked: actions.length >= 3,
    },
    {
      title: "#1 Friend",
      icon: "🏆",
      description: "Reach 1500 total XP",
      reward: "250 XP",
      unlocked: totalXP >= 1500,
    },
    {
      title: "Borrow Buddy",
      icon: "👕",
      description: "Borrow 2 items from friends",
      reward: "90 XP",
      unlocked: (actionCountByType.borrow || 0) >= 2,
    },
    {
      title: "Rental Ranger",
      icon: "🏪",
      description: "Rent 2 clothing items",
      reward: "90 XP",
      unlocked: (actionCountByType.rent || 0) >= 2,
    },
    {
      title: "Challenge Chaser",
      icon: "🎯",
      description: "Join 3 challenges",
      reward: "160 XP",
      unlocked: joinedChallenges >= 3,
    },
    {
      title: "Level Climber",
      icon: "🧗",
      description: "Reach Level 6",
      reward: "180 XP",
      unlocked: level >= 6,
    },
    {
      title: "Carbon Crusher",
      icon: "🌿",
      description: "Save at least 40kg CO2",
      reward: "280 XP",
      unlocked: totalCO2Saved >= 40,
    },
    {
      title: "Legend",
      icon: "🛡️",
      description: "Reach 3000 total XP",
      reward: "400 XP",
      unlocked: totalXP >= 3000,
    },
  ];

  const unlockedCount = achievements.filter((item) => item.unlocked).length;

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-300 to-orange-500 flex items-center justify-center shadow-lg shadow-yellow-500/20">
            <Award className="w-6 h-6 text-[#1a203b]" />
          </div>
          <h1 className="text-5xl text-white">Achievements</h1>
        </div>
        <p className="text-gray-300 uppercase tracking-wide text-sm">Badges Earned</p>
        <p className="text-gray-400 text-2xl mt-1">
          {unlockedCount} / {achievements.length} unlocked
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.title}
            className={`rounded-3xl p-5 border min-h-[168px] transition-all ${
              achievement.unlocked
                ? "bg-gradient-to-br from-[#22284b] to-[#151b35] border-[#2e365f] shadow-lg shadow-black/20"
                : "bg-[#121933] border-[#232b4a] opacity-55"
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="text-4xl">{achievement.icon}</div>
              {achievement.unlocked ? (
                <span className="w-6 h-6 rounded-full bg-[#bef264] text-black text-xs flex items-center justify-center">
                  ✓
                </span>
              ) : (
                <Lock className="w-6 h-6 text-gray-500" />
              )}
            </div>

            <h3
              className={`text-xl mb-2 ${
                achievement.unlocked ? "text-white" : "text-gray-400"
              }`}
            >
              {achievement.title}
            </h3>
            <p className="text-xs text-gray-400 mb-3 leading-relaxed">{achievement.description}</p>
            <div className="text-xs text-[#bef264]">{achievement.reward}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
