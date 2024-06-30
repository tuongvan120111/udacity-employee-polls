import { convertDate } from "../../utils/date-time";
import { handleQuestion } from "../../utils/handleQuestion";

jest.mock("../../utils/date-time", () => {
  return {
    convertDate: jest.fn().mockReturnValue("9:21 AM | 6/29/2016"),
  };
});

const user = {
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

describe("Handle Question", () => {
  it("Should convert question into done and new with current user voted", () => {
    const state = {
      userId: user.sarahedo.id,
      user,
    };
    const payload = question;
    const { doneQues, newQues } = handleQuestion(state, payload);
    expect(doneQues.length).toEqual(1);
    expect(newQues.length).toEqual(0);
  });

  it("Should convert question into done and new with no user vote", () => {
    const state = {
      userId: "",
      user,
    };
    const newQuestion = JSON.parse(JSON.stringify(question));
    newQuestion["8xf0y6ziyjabvozdd253nd"].optionOne.votes.length = 0;
    const payload = newQuestion;
    const { doneQues, newQues } = handleQuestion(state, payload);
    expect(doneQues.length).toEqual(0);
    expect(newQues.length).toEqual(1);
  });
});
