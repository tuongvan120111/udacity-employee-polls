import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import renderWithProvider from "../../utils/test-utils";
import PollPage from "../../pages/PollPage/PollPage";
import { _getQuestions, _getUsers, _saveQuestionAnswer } from "../../_DATA";

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

jest.mock("react-router-dom", () => {
  return {
    useParams: () => ({
      question_id: "8xf0y6ziyjabvozdd253nd",
    }),
  };
});

jest.mock("../../_DATA", () => {
  return {
    _saveQuestionAnswer: jest.fn(),
    _getUsers: jest.fn(),
    _getQuestions: jest.fn(),
  };
});

describe("LeaderboardPage DOM Testing", () => {
  let userMock;
  let questionMock;
  let userCurMock;

  beforeEach(() => {
    userMock = JSON.parse(JSON.stringify(users));
    userCurMock = userMock["sarahedo"];
    questionMock = JSON.parse(JSON.stringify(question));
  });

  test("Should render UI with page answer poll", async () => {
    const mockState = {
      user: userMock,
      question: questionMock,
      userId: "sarahedo",
    };
    renderWithProvider(<PollPage />, {
      preloadedState: mockState,
    });

    await waitFor(() => {
      const typeJS = screen.getByText(
        "Build our new application with Typescript"
      );
      const JS = screen.getByText("Build our new application with Javascript");

      expect(typeJS).toBeInTheDocument();
      expect(JS).toBeInTheDocument();
    });
  });

  test("Should question update when user answer poll", async () => {
    const mockState = {
      user: userMock,
      question: questionMock,
      userId: "sarahedo",
      homeState: {
        done: [],
        new: [],
      },
    };

    const { store } = renderWithProvider(<PollPage />, {
      preloadedState: mockState,
    });

    _saveQuestionAnswer.mockReturnValue(true);
    _getUsers.mockReturnValue(userMock);
    _getQuestions.mockReturnValue(questionMock);

    await waitFor(() => {
      const [firstBtn] = screen.getAllByRole("button", {
        name: "Click",
      });

      fireEvent.click(firstBtn);
    });

    const state = store.getState();
    expect(state.homeState.done.length).toEqual(1);
  });
});
