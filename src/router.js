import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage/HomePage";
import LeaderboardPage from "./pages/LeaderboardPage/LeaderboardPage";
import NewPollPage from "./pages/NewPollPage/NewPollPage";
import PollPage from "./pages/PollPage/PollPage";
import LoginPage from "./pages/LoginPage/LoginPage";

const NotFound = () => {
  return (
    <>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for could not be found.</p>
    </>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
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
