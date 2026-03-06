import { Gift, Ticket, Sparkles } from "lucide-react";
import { useApp } from "../contexts/AppContext";

export function Redeem() {
  const { totalXP } = useApp();

  const rewards = [
    { name: "5% Thrift Store Voucher", cost: 150, type: "Voucher" },
    { name: "10% Thrift Store Voucher", cost: 300, type: "Voucher" },
    { name: "15% Sustainable Brand Coupon", cost: 450, type: "Voucher" },
    { name: "$10 Eco Marketplace Credit", cost: 650, type: "Voucher" },
    { name: "Free Repair Workshop Pass", cost: 500, type: "Experience" },
    { name: "Virtual Styling Session", cost: 750, type: "Experience" },
    { name: "Swap Event VIP Access", cost: 950, type: "Experience" },
    { name: "Sustainable Tote Bag", cost: 700, type: "Merch" },
    { name: "ReWear Enamel Pin Set", cost: 520, type: "Merch" },
    { name: "Eco Water Bottle", cost: 820, type: "Merch" },
    { name: "Limited Hoodie", cost: 1300, type: "Merch" },
    { name: "Reusable Laundry Bag Kit", cost: 980, type: "Merch" },
    { name: "Eco Challenge Booster", cost: 900, type: "Power-up" },
    { name: "Double XP (24h)", cost: 1100, type: "Power-up" },
    { name: "Streak Shield (1 day)", cost: 600, type: "Power-up" },
    { name: "Challenge Skip Token", cost: 1450, type: "Power-up" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-5xl text-white mb-8">Redeem 🎁</h1>

      <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-3xl p-6 border border-gray-800">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-6 h-6 text-[#bef264]" />
          <h2 className="text-2xl text-white">Your Reward Wallet</h2>
        </div>
        <p className="text-gray-400">
          Available balance: <span className="text-[#bef264]">{totalXP} XP</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rewards.map((reward) => {
          const canRedeem = totalXP >= reward.cost;

          return (
            <div
              key={reward.name}
              className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-3xl p-6 border border-gray-800"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Gift className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-xl text-white">{reward.name}</h3>
                </div>
                <div className="text-sm text-gray-400">{reward.type}</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#bef264]">
                  <Ticket className="w-4 h-4" />
                  <span>{reward.cost} XP</span>
                </div>
                <button
                  disabled={!canRedeem}
                  className={`px-5 py-2 rounded-full text-sm transition-colors ${
                    canRedeem
                      ? "bg-[#bef264] text-black hover:bg-[#a8d957]"
                      : "bg-gray-800 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {canRedeem ? "Redeem" : "Need More XP"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
