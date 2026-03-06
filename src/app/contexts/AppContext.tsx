import { createContext, useContext, useState, ReactNode } from "react";

export interface Action {
  id: string;
  type: string;
  name: string;
  icon: string;
  co2Saved: number;
  xpEarned: number;
  date: Date;
  challengeId?: string;
}

export interface Challenge {
  id: string;
  icon: string;
  title: string;
  description: string;
  totalSteps: number;
  currentProgress: number;
  xp: number;
  gradient: string;
  daysLeft: string;
  status: "joined" | "available" | "upcoming";
  category: string;
}

interface AppContextType {
  actions: Action[];
  challenges: Challenge[];
  totalXP: number;
  totalCO2Saved: number;
  streak: number;
  level: number;
  user: { name: string; email?: string } | null;
  addAction: (action: Omit<Action, "id" | "date">) => void;
  redeemXP: (amount: number) => boolean;
  joinChallenge: (challengeId: string) => void;
  getChallengeProgress: (challengeId: string) => number;
  login: (name: string, email?: string) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ name: string; email?: string } | null>(null);
  const [spentXP, setSpentXP] = useState(0);
  
  const [actions, setActions] = useState<Action[]>([
    {
      id: "1",
      type: "thrift",
      name: "Summer Dress (thrifted)",
      icon: "👗",
      co2Saved: 6.2,
      xpEarned: 80,
      date: new Date("2026-03-04"),
    },
    {
      id: "2",
      type: "swap",
      name: "Sneakers (swapped)",
      icon: "👟",
      co2Saved: 4.4,
      xpEarned: 80,
      date: new Date("2026-03-03"),
      challengeId: "swap5",
    },
    {
      id: "3",
      type: "repair",
      name: "Jacket (repaired)",
      icon: "🧥",
      co2Saved: 3.3,
      xpEarned: 60,
      date: new Date("2026-03-02"),
    },
  ]);

  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: "nobuy",
      icon: "ShoppingBag",
      title: "No-Buy November",
      description: "Go 30 days without buying any new fast fashion. Thrift, swap, or borrow instead.",
      totalSteps: 30,
      currentProgress: 14,
      xp: 200,
      gradient: "from-[#22d3ee] via-[#3b82f6] to-[#8b5cf6]",
      daysLeft: "16 days left",
      status: "joined",
      category: "no-buy",
    },
    {
      id: "capsule",
      icon: "Shirt",
      title: "Capsule Closet",
      description: "Build a 10-item capsule wardrobe and wear only those pieces for a week.",
      totalSteps: 10,
      currentProgress: 3,
      xp: 150,
      gradient: "from-[#ec4899] via-[#f97316] to-[#fbbf24]",
      daysLeft: "5 days left",
      status: "joined",
      category: "capsule",
    },
    {
      id: "swap5",
      icon: "Repeat2",
      title: "Swap 5 Items",
      description: "Swap clothes with 5 different people. Post your swaps to inspire others!",
      totalSteps: 5,
      currentProgress: 2,
      xp: 120,
      gradient: "from-[#8b5cf6] via-[#3b82f6] to-[#22d3ee]",
      daysLeft: "12 days left",
      status: "available",
      category: "swap",
    },
    {
      id: "repair",
      icon: "Wrench",
      title: "Mend & Repair Week",
      description: "Fix instead of toss. Repair at least 3 damaged items in your wardrobe.",
      totalSteps: 3,
      currentProgress: 0,
      xp: 80,
      gradient: "from-[#22d3ee] via-[#3b82f6] to-[#8b5cf6]",
      daysLeft: "7 days left",
      status: "available",
      category: "repair",
    },
    {
      id: "thriftflip",
      icon: "Camera",
      title: "#ThriftFlip Selfie",
      description: "Share a before & after of your thrift flip transformation. Tag 3 friends!",
      totalSteps: 1,
      currentProgress: 0,
      xp: 60,
      gradient: "from-[#ec4899] via-[#f97316] to-[#fbbf24]",
      daysLeft: "Ongoing",
      status: "available",
      category: "thriftflip",
    },
    {
      id: "zerowaste",
      icon: "ShoppingBasket",
      title: "Zero Waste Winter",
      description: "Don't buy any new clothing items for the entire winter season. Hardcore mode!",
      totalSteps: 90,
      currentProgress: 0,
      xp: 250,
      gradient: "from-[#8b5cf6] via-[#3b82f6] to-[#22d3ee]",
      daysLeft: "Starts soon",
      status: "upcoming",
      category: "no-buy",
    },
  ]);

  const earnedXP = actions.reduce((sum, action) => sum + action.xpEarned, 0);
  const totalXP = Math.max(earnedXP - spentXP, 0);
  const totalCO2Saved = actions.reduce((sum, action) => sum + action.co2Saved, 0);
  const streak = 14; // Simplified for now
  const level = Math.floor(earnedXP / 200) + 1;

  const addAction = (actionData: Omit<Action, "id" | "date">) => {
    const newAction: Action = {
      ...actionData,
      id: Date.now().toString(),
      date: new Date(),
    };
    setActions((prev) => [newAction, ...prev]);

    // Update challenge progress if action is linked to a challenge
    if (actionData.challengeId) {
      setChallenges((prev) =>
        prev.map((challenge) => {
          if (challenge.id === actionData.challengeId) {
            return {
              ...challenge,
              currentProgress: Math.min(
                challenge.currentProgress + 1,
                challenge.totalSteps
              ),
            };
          }
          return challenge;
        })
      );
    }

    // Auto-update challenges based on action type
    setChallenges((prev) =>
      prev.map((challenge) => {
        // Update based on action category matching challenge category
        if (
          challenge.status === "joined" &&
          actionData.type === challenge.category
        ) {
          return {
            ...challenge,
            currentProgress: Math.min(
              challenge.currentProgress + 1,
              challenge.totalSteps
            ),
          };
        }
        return challenge;
      })
    );
  };

  const joinChallenge = (challengeId: string) => {
    setChallenges((prev) =>
      prev.map((challenge) => {
        if (challenge.id === challengeId) {
          return {
            ...challenge,
            status:
              challenge.status === "joined" ? "available" : "joined",
          } as Challenge;
        }
        return challenge;
      })
    );
  };

  const redeemXP = (amount: number) => {
    if (amount <= 0 || totalXP < amount) {
      return false;
    }
    setSpentXP((prev) => prev + amount);
    return true;
  };

  const getChallengeProgress = (challengeId: string) => {
    const challenge = challenges.find((c) => c.id === challengeId);
    return challenge
      ? Math.round((challenge.currentProgress / challenge.totalSteps) * 100)
      : 0;
  };

  const login = (name: string, email?: string) => {
    setUser({ name, email });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        actions,
        challenges,
        totalXP,
        totalCO2Saved,
        streak,
        level,
        user,
        addAction,
        redeemXP,
        joinChallenge,
        getChallengeProgress,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
