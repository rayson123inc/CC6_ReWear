import {
  Shirt,
  Repeat2,
  Scissors,
  ShoppingBag,
  Trophy,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: <ShoppingBag className="w-8 h-8 text-cyan-400" />,
      title: "Log Your Actions",
      description:
        "Record sustainable textile actions like thrifting, swapping, repairing, or borrowing clothes instead of buying new.",
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      title: "Earn XP & Level Up",
      description:
        "Each action earns you experience points. Complete challenges to earn bonus XP and unlock new levels.",
    },
    {
      icon: <Trophy className="w-8 h-8 text-purple-400" />,
      title: "Join Challenges",
      description:
        "Participate in time-limited challenges like No-Buy November or Capsule Closet to stay motivated.",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-400" />,
      title: "Track Your Impact",
      description:
        "See how much CO₂ you've saved by making sustainable choices. Every action counts!",
    },
    {
      icon: <Users className="w-8 h-8 text-pink-400" />,
      title: "Compete with Friends",
      description:
        "Compare your progress on the leaderboard and inspire each other to make sustainable choices.",
    },
  ];

  const actions = [
    {
      icon: "🛍️",
      name: "Thrift Shopping",
      xp: "50-100 XP",
      co2: "~5kg CO₂ saved",
      color: "#22d3ee",
    },
    {
      icon: "🔄",
      name: "Clothes Swap",
      xp: "80 XP",
      co2: "~4kg CO₂ saved",
      color: "#a855f7",
    },
    {
      icon: "🧵",
      name: "Repair/Mend",
      xp: "60 XP",
      co2: "~3kg CO₂ saved",
      color: "#f97316",
    },
    {
      icon: "👕",
      name: "Borrow from Friend",
      xp: "40 XP",
      co2: "~5kg CO₂ saved",
      color: "#bef264",
    },
    {
      icon: "♻️",
      name: "Upcycle/DIY",
      xp: "100 XP",
      co2: "~6kg CO₂ saved",
      color: "#ec4899",
    },
    {
      icon: "🏪",
      name: "Rent Clothing",
      xp: "70 XP",
      co2: "~4kg CO₂ saved",
      color: "#3b82f6",
    },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-5xl text-white mb-4">How It Works 📚</h1>
        <p className="text-xl text-gray-400 max-w-3xl">
          ReWear gamifies sustainable fashion choices by rewarding you for
          reducing textile waste and helping the planet.
        </p>
      </div>

      {/* Steps Section */}
      <div>
        <h2 className="text-3xl text-white mb-6">Getting Started</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-3xl p-6 border border-gray-800"
            >
              <div className="p-3 bg-[#0f172a] rounded-xl border border-gray-800 inline-block mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl text-white mb-2">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions and XP Section */}
      <div>
        <h2 className="text-3xl text-white mb-6">Sustainable Actions & Rewards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {actions.map((action, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-3xl p-6 border border-gray-800"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-5xl">{action.icon}</span>
                <div
                  className="px-3 py-1 rounded-full text-sm"
                  style={{ backgroundColor: `${action.color}20`, color: action.color }}
                >
                  {action.xp}
                </div>
              </div>
              <h3 className="text-xl text-white mb-2">{action.name}</h3>
              <div
                className="text-sm"
                style={{ color: action.color }}
              >
                {action.co2}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why It Matters Section */}
      <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-3xl p-8 border border-gray-800">
        <h2 className="text-3xl text-white mb-4">Why It Matters 🌍</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-4xl text-[#bef264] mb-2">85%</div>
            <div className="text-gray-400">
              of textiles end up in landfills each year
            </div>
          </div>
          <div>
            <div className="text-4xl text-cyan-400 mb-2">10%</div>
            <div className="text-gray-400">
              of global carbon emissions come from the fashion industry
            </div>
          </div>
          <div>
            <div className="text-4xl text-purple-400 mb-2">2,700L</div>
            <div className="text-gray-400">
              of water is needed to make one cotton t-shirt
            </div>
          </div>
        </div>
        <p className="text-gray-400 mt-6">
          By choosing sustainable textile practices, you're making a real
          difference. Every thrifted item, every repair, and every swap reduces
          the demand for new clothing production and helps protect our planet.
        </p>
      </div>

      {/* Levels Section */}
      <div>
        <h2 className="text-3xl text-white mb-6">Progression System</h2>
        <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-3xl p-6 border border-gray-800">
          <div className="space-y-4">
            {[
              { level: 1, name: "Eco Newbie", xp: "0-200 XP", color: "#94a3b8" },
              { level: 3, name: "Conscious Consumer", xp: "200-500 XP", color: "#22d3ee" },
              { level: 5, name: "Thrift Champion", xp: "500-1000 XP", color: "#a855f7" },
              { level: 8, name: "Eco Warrior", xp: "1000-2000 XP", color: "#bef264" },
              { level: 10, name: "Sustainability Hero", xp: "2000-4000 XP", color: "#f59e0b" },
              { level: 12, name: "Planet Protector", xp: "4000+ XP", color: "#ec4899" },
            ].map((level, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-[#0f172a] rounded-xl border border-gray-800"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                    style={{ backgroundColor: `${level.color}20`, color: level.color }}
                  >
                    {level.level}
                  </div>
                  <div>
                    <div className="text-white">{level.name}</div>
                    <div className="text-sm text-gray-400">{level.xp}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
