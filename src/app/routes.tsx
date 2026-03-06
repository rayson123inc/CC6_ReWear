import { createBrowserRouter } from "react-router";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Layout } from "./components/Layout";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Challenges } from "./pages/Challenges";
import { Leaderboard } from "./pages/Leaderboard";
import { Achievements } from "./pages/Achievements";
import { Redeem } from "./pages/Redeem";
import { HowItWorks } from "./pages/HowItWorks";
import { DaysChallenge } from "./pages/DaysChallenge";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: ProtectedRoute,
    children: [
      {
        path: "/",
        Component: Layout,
        children: [
          { index: true, Component: Dashboard },
          { path: "challenges", Component: Challenges },
          { path: "leaderboard", Component: Leaderboard },
          { path: "achievements", Component: Achievements },
          { path: "redeem", Component: Redeem },
          { path: "how-it-works", Component: HowItWorks },
          { path: "days-challenge", Component: DaysChallenge },
        ],
      },
    ],
  },
]);
