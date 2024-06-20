import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage/HomePage";
import LeaderboardPage from "./pages/LeaderboardPage/LeaderboardPage";
import NewPollPage from "./pages/NewPollPage/NewPollPage";
import PollPage from "./pages/PollPage/PollPage";
import LoginPage from "./pages/LoginPage/LoginPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "questions",
        element: <HomePage />,
      },
      { path: "leaderboard", element: <LeaderboardPage /> },
      { path: "new-poll", element: <NewPollPage /> },
      { path: "questions/:question_id", element: <PollPage /> },
    ],
  },
  { path: "login", element: <LoginPage /> },
]);
