import { useState } from "react";
import { X } from "lucide-react";
import { useApp } from "../contexts/AppContext";

interface LogActionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LogActionModal({ isOpen, onClose }: LogActionModalProps) {
  const { addAction, challenges } = useApp();
  const [actionType, setActionType] = useState("");
  const [itemName, setItemName] = useState("");
  const [selectedChallenge, setSelectedChallenge] = useState("");

  const actionTypes = [
    { value: "thrift", label: "🛍️ Thrift Shopping", xp: 80, co2: 5.5, icon: "🛍️" },
    { value: "swap", label: "🔄 Clothes Swap", xp: 80, co2: 4.5, icon: "🔄" },
    { value: "repair", label: "🧵 Repair/Mend", xp: 60, co2: 3.0, icon: "🧵" },
    { value: "borrow", label: "👕 Borrow from Friend", xp: 40, co2: 5.0, icon: "👕" },
    { value: "upcycle", label: "♻️ Upcycle/DIY", xp: 100, co2: 6.0, icon: "♻️" },
    { value: "rent", label: "🏪 Rent Clothing", xp: 70, co2: 4.0, icon: "🏪" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedType = actionTypes.find((type) => type.value === actionType);
    const trimmedItemName = itemName.trim();
    if (!selectedType || !trimmedItemName) return;

    const actionDescriptionByType: Record<string, string> = {
      thrift: "thrifted",
      swap: "swapped",
      repair: "repaired",
      borrow: "borrowed",
      upcycle: "upcycled",
      rent: "rented",
    };
    const actionDescription = actionDescriptionByType[actionType];
    const actionName = actionDescription
      ? `${trimmedItemName} (${actionDescription})`
      : trimmedItemName;

    addAction({
      type: actionType,
      name: actionName,
      icon: selectedType.icon,
      co2Saved: selectedType.co2,
      xpEarned: selectedType.xp,
      challengeId: selectedChallenge || undefined,
    });

    // Reset form
    setActionType("");
    setItemName("");
    setSelectedChallenge("");
    onClose();
  };

  if (!isOpen) return null;

  const joinedChallenges = challenges.filter((c) => c.status === "joined");

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1e293b] rounded-3xl max-w-lg w-full p-8 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl text-white">Log Action ✨</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Action Type
            </label>
            <select
              value={actionType}
              onChange={(e) => setActionType(e.target.value)}
              className="w-full bg-[#0f172a] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#bef264]"
              required
            >
              <option value="">Select an action...</option>
              {actionTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label} (+{type.xp} XP, -{type.co2}kg CO₂)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Item Name
            </label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="e.g., Blue denim jacket"
              className="w-full bg-[#0f172a] border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#bef264]"
              required
            />
          </div>

          {joinedChallenges.length > 0 && (
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Link to Challenge (Optional)
              </label>
              <select
                value={selectedChallenge}
                onChange={(e) => setSelectedChallenge(e.target.value)}
                className="w-full bg-[#0f172a] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#bef264]"
              >
                <option value="">None</option>
                {joinedChallenges.map((challenge) => (
                  <option key={challenge.id} value={challenge.id}>
                    {challenge.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          {actionType && (
            <div className="bg-[#0f172a] rounded-xl p-4 border border-gray-800">
              <div className="text-sm text-gray-400 mb-2">You'll earn:</div>
              <div className="flex items-center gap-4">
                <div>
                  <div className="text-[#bef264] text-xl">
                    +{actionTypes.find((t) => t.value === actionType)?.xp} XP
                  </div>
                </div>
                <div className="text-gray-600">·</div>
                <div>
                  <div className="text-cyan-400 text-xl">
                    -{actionTypes.find((t) => t.value === actionType)?.co2}kg CO₂
                  </div>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#bef264] text-black py-4 rounded-full hover:bg-[#a8d957] transition-colors"
          >
            Log Action
          </button>
        </form>
      </div>
    </div>
  );
}
