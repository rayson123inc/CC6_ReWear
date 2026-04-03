import { ShoppingBag, Shirt, Repeat2, Wrench, Camera, ShoppingBasket } from "lucide-react";
import { useApp } from "../contexts/AppContext";

export function Challenges() {
  const { challenges, joinChallenge, getChallengeProgress } = useApp();

  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
      ShoppingBag: <ShoppingBag className="w-8 h-8 text-cyan-400" />,
      Shirt: <Shirt className="w-8 h-8 text-pink-400" />,
      Repeat2: <Repeat2 className="w-8 h-8 text-blue-400" />,
      Wrench: <Wrench className="w-8 h-8 text-orange-400" />,
      Camera: <Camera className="w-8 h-8 text-purple-400" />,
      ShoppingBasket: <ShoppingBasket className="w-8 h-8 text-pink-500" />,
    };

    return iconMap[iconName] || <ShoppingBag className="w-8 h-8 text-cyan-400" />;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-5xl text-white mb-8">
        Pick Your Next Mission {"\u{1F3AF}"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => {
          const percentage = getChallengeProgress(challenge.id);

          return (
            <div
              key={challenge.id}
              className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-3xl p-6 border border-gray-800 hover:border-gray-700 transition-all"
            >
              <div
                className={`h-1 rounded-full mb-6 bg-gradient-to-r ${challenge.gradient}`}
              ></div>

              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-[#0f172a] rounded-xl border border-gray-800">
                  {getIcon(challenge.icon)}
                </div>
                <div className="px-3 py-1 bg-[#3a4a3a] rounded-full">
                  <span className="text-[#bef264] text-sm">+{challenge.xp} XP</span>
                </div>
              </div>

              <h3 className="text-2xl text-white mb-2">{challenge.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{challenge.description}</p>

              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-400">
                    {challenge.currentProgress} / {challenge.totalSteps} {challenge.progressUnit}
                  </span>
                  <span className="text-gray-400">{percentage}%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${challenge.gradient}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-pink-400">{"\u23F0"}</span>
                  <span className="text-gray-400">{challenge.daysLeft}</span>
                </div>
                <button
                  onClick={() => joinChallenge(challenge.id)}
                  className={`px-6 py-2 rounded-full text-sm transition-colors ${
                    challenge.status === "joined"
                      ? "bg-[#bef264] text-black hover:bg-[#a8d957]"
                      : challenge.status === "upcoming"
                        ? "bg-gray-800 text-gray-400 cursor-not-allowed"
                        : "bg-[#1e293b] text-white border border-gray-700 hover:bg-[#2e3a4b]"
                  }`}
                  disabled={challenge.status === "upcoming"}
                >
                  {challenge.status === "joined"
                    ? "\u2713 Leave"
                    : challenge.status === "upcoming"
                      ? "Coming Soon"
                      : "Join Challenge"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
