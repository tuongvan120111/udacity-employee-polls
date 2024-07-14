import React from "react";
import { screen, waitFor } from "@testing-library/react";
import LeaderboardPage from "../../pages/LeaderboardPage/LeaderboardPage";
import renderWithProvider from "../../utils/test-utils";
import { getLeaderBoardData } from "../../utils/get-leader-board-data";

const question = {
  "8xf0y6ziyjabvozdd253nd": {
    id: "8xf0y6ziyjabvozdd253nd",
    author: "sarahedo",
    timestamp: 1467166872634,
    optionOne: {
      votes: ["sarahedo"],
      text: "Build our new application with Javascript",
    },
    optionTwo: {
      votes: [],
      text: "Build our new application with Typescript",
    },
  },
};
const users = {
  sarahedo: {
    id: "sarahedo",
    password: "password123",
    name: "Sarah Edo",
    avatarURL: "",
    answers: {
      "8xf0y6ziyjabvozdd253nd": "optionOne",
      "6ni6ok3ym7mf1p33lnez": "optionOne",
      am8ehyc8byjqgar0jgpub9: "optionTwo",
      loxhs1bqm25b708cmbf3g: "optionTwo",
    },
    questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
  },
};

describe("LeaderboardPage DOM Testing", () => {
  let userMock;
  let questionMock;
  let userCurMock;

  beforeEach(() => {
    userMock = JSON.parse(JSON.stringify(users));
    userCurMock = userMock["sarahedo"];
    questionMock = JSON.parse(JSON.stringify(question));

    jest.restoreAllMocks();
  });

  test("Should render UI with one user score", async () => {
    const leaderBoard = getLeaderBoardData(userMock);

    renderWithProvider(<LeaderboardPage />, {
      preloadedState: { leaderBoard },
    });

    await waitFor(() => {
      const rows = screen.getAllByRole("row");
      expect(rows.length).toEqual(2);
    });
  });
});
