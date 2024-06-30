import {
  selectCurUser,
  selectHomeState,
  selectPollVoted,
  selectQuestion,
  selectShowMsgErr,
  selectShowPopup,
  selectUserId,
  selectUsers,
  selectVoteOpt,
} from "../../utils/selection";

const state = {
  user: "This is user State",
  homeState: "This is homeState State",
  userId: "This is userId State",
  isShowMsgErr: "This is isShowMsgErr State",
  question: "This is question State",
  isShowPopup: "This is isShowPopup State",
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

describe("Selection Store", () => {
  it("Should get user", () => {
    const user = selectUsers({ user: state.user });
    expect(user).toEqual(state.user);
  });

  it("Should get Home State", () => {
    const homeState = selectHomeState({ homeState: state.homeState });
    expect(homeState).toEqual(state.homeState);
  });

  it("Should get UserId", () => {
    const userId = selectUserId({ userId: state.userId });
    expect(userId).toEqual(state.userId);
  });

  it("Should get flag show message error", () => {
    const msgErrState = selectShowMsgErr({ isShowMsgErr: state.isShowMsgErr });
    expect(msgErrState).toEqual(state.isShowMsgErr);
  });

  it("Should get question", () => {
    const qst = selectQuestion({ question }, "8xf0y6ziyjabvozdd253nd");
    const expectedQst = question["8xf0y6ziyjabvozdd253nd"];
    expect(qst.author).toEqual(expectedQst.author);
    expect(qst.optionOne.text).toEqual(expectedQst.optionOne.text);
    expect(qst.optionTwo.text).toEqual(expectedQst.optionTwo.text);
  });

  it("Should get flag show popup", () => {
    const flagShowPopup = selectShowPopup({ isShowPopup: state.isShowPopup });
    expect(flagShowPopup).toEqual(state.isShowPopup);
  });

  it("Should get current user", () => {
    const curUser = selectCurUser({ user, userId: user.sarahedo.id });
    expect(curUser.id).toEqual(user.sarahedo.id);
    expect(curUser.name).toEqual(user.sarahedo.name);
    expect(curUser.password).toEqual(user.sarahedo.password);
  });

  it("Should get Poll voted", () => {
    const state = {
      homeState: {
        done: [{ id: "8xf0y6ziyjabvozdd253nd", isCurUserVote: true }],
        new: [],
      },
    };
    const pollvoted = selectPollVoted(state, "8xf0y6ziyjabvozdd253nd");
    expect(pollvoted).toBeTruthy();
  });

  it("Should not get vote option when not voted", () => {
    const voted = selectVoteOpt({}, "", null);
    expect(voted).toEqual("");
  });

  it("Should get vote option one when voted", () => {
    const voted = selectVoteOpt(
      { question, userId: "sarahedo" },
      "8xf0y6ziyjabvozdd253nd",
      "optionOne"
    );
    expect(voted).toEqual("optionOne");
  });

  it("Should get vote option two when voted", () => {
    const voted = selectVoteOpt(
      { question, userId: "sara" },
      "8xf0y6ziyjabvozdd253nd",
      "optionOne"
    );
    expect(voted).toEqual("optionTwo");
  });
});
