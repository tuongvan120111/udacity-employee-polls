import { configureStore } from "@reduxjs/toolkit";
import {
  _getQuestions,
  _getUsers,
  _saveQuestion,
  _saveQuestionAnswer,
} from "../../_DATA";
import {
  employeePollReducer,
  saveAnswer,
  saveQuestion,
  startLoading,
} from "../../slice/employee-poll-slice";
import { act } from "@testing-library/react";

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

jest.mock("../../_DATA", () => {
  return {
    _saveQuestion: jest.fn(),
    _saveQuestionAnswer: jest.fn(),
    _getUsers: jest.fn(),
    _getQuestions: jest.fn(),
  };
});

describe("Unit test Employee Poll slice", () => {
  let userMock;
  let questionMock;
  let userCurMock;

  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: employeePollReducer,
    });
  });

  beforeEach(() => {
    userMock = JSON.parse(JSON.stringify(users));
    userCurMock = userMock["sarahedo"];
    questionMock = JSON.parse(JSON.stringify(question));
  });

  describe("Save question", () => {
    test("Should return question when create new", async () => {
      const questionSave = {
        id: "vthrdm985a262al8qx3do",
        author: "tylermcginnis",
        timestamp: 1489579767190,
        optionOne: {
          votes: [""],
          text: "take a course on ReactJS",
        },
        optionTwo: {
          votes: [""],
          text: "take a course on unit testing with Jest",
        },
      };

      _saveQuestion.mockReturnValue(questionSave);

      await act(async () => {
        await store.dispatch(
          saveQuestion({
            optionOneText: "firstOption",
            optionTwoText: "secondOption",
            author: "sarahedo",
          })
        );
      });

      expect(Object.values(store.getState().question).length).toEqual(1);
      expect(store.getState().pollSaveErr).toEqual(false);
    });

    test("Should return flag error when something went wrong while saving question ", async () => {
      _saveQuestion.mockRejectedValue(false);

      await act(async () => {
        await store.dispatch(
          saveQuestion({
            optionOneText: "firstOption",
            optionTwoText: "secondOption",
            author: "sarahedo",
          })
        );
      });
      expect(Object.values(store.getState().question).length).toEqual(0);
      expect(store.getState().pollSaveErr).toEqual(true);
    });

    test("Should return error when data pass into is wrong", async () => {
      _saveQuestion.mockRejectedValue(false);

      await act(async () => {
        await store.dispatch(saveQuestion("incorrect data"));
      });
      expect(Object.values(store.getState().question).length).toEqual(0);
      expect(store.getState().pollSaveErr).toEqual(true);
    });
  });

  describe("Save Question Answer", () => {
    test("Should return question when create new", async () => {
      _saveQuestionAnswer.mockReturnValue(true);
      _getUsers.mockReturnValue(userCurMock);
      _getQuestions.mockReturnValue(questionMock);

      await act(async () => {
        await store.dispatch(
          saveAnswer({
            authedUser: "sarahedo",
            qid: "8xf0y6ziyjabvozdd253nd",
            answer: "optionOne",
          })
        );
      });

      const state = store.getState();
      expect(state.saveAnswerErr).toEqual(false);
    });

    test("Should return question when create new", async () => {
      _saveQuestionAnswer.mockReturnValue(false);

      await act(async () => {
        await store.dispatch(
          saveAnswer({
            authedUser: "sarahedo",
            qid: "8xf0y6ziyjabvozdd253nd",
            answer: "optionOne",
          })
        );
      });

      const state = store.getState();
      expect(state.saveAnswerErr).toEqual(true);
    });

    test("Should return error question when data pass into is wrong", async () => {
      _saveQuestionAnswer.mockReturnValue(false);

      await act(async () => {
        await store.dispatch(saveAnswer("incorrect data"));
      });

      const state = store.getState();
      expect(state.saveAnswerErr).toEqual(true);
    });
  });
});
