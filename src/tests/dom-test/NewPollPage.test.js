import React, { useEffect } from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import LeaderboardPage from "../../pages/LeaderboardPage/LeaderboardPage";
import renderWithProvider from "../../utils/test-utils";
import NewPollPage from "../../pages/NewPollPage/NewPollPage";
import { _saveQuestion, formatQuestion } from "../../_DATA";
import { saveAnswer, saveQuestion } from "../../slice/employee-poll-slice";

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

const questionSave = {
  id: "vthrdm985a262al8qx3do",
  author: "tylermcginnis",
  timestamp: 1489579767190,
  optionOne: {
    votes: ["tylermcginnis"],
    text: "take a course on ReactJS",
  },
  optionTwo: {
    votes: ["mtsamis"],
    text: "take a course on unit testing with Jest",
  },
};

jest.mock("../../_DATA", () => {
  return {
    _saveQuestion: jest.fn(),
  };
});

describe("NewPollPage DOM Testing", () => {
  let userMock;
  let questionMock;
  let userCurMock;

  beforeEach(() => {
    userMock = JSON.parse(JSON.stringify(users));
    userCurMock = userMock["sarahedo"];
    questionMock = JSON.parse(JSON.stringify(question));
  });

  test("Should add question in state after submit question", async () => {
    const mockState = { user: userMock };
    _saveQuestion.mockReturnValue(questionSave);
    const { container, store } = renderWithProvider(<NewPollPage />, {
      preloadedState: mockState,
    });

    await waitFor(() => {
      const firstOpt = container.querySelector("#FirstOption");
      const secondOpt = container.querySelector("#SecondOption");
      const [submitBtn] = screen.getAllByRole("button", { name: "Submit" });
      fireEvent.change(firstOpt, { target: { value: "This is first option" } });
      fireEvent.change(secondOpt, {
        target: { value: "This is second option" },
      });

      fireEvent.click(submitBtn);
    });
    const state = store.getState();
    expect(Object.values(state.question).length).toEqual(1);
  });
});
