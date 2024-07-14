export const selectUsers = (state) => state.user;
export const selectHomeState = (state) => state.homeState;
export const selectUserId = (state) => state.userId || "";
export const selectPollSaveErr = (state) => state.pollSaveErr || false;
export const selectAnswerErr = (state) => state.saveAnswerErr || false;
export const selectShowMsgErr = (state) => state.isShowMsgErr;
export const selectQuestion = (state, id) => state.question[id];
// export const selectOnswer = (state, author) => state.
export const selectShowPopup = (state) => state?.isShowPopup || false;
export const selectUser = (state, author) => {
  if (!state?.user) {
    return undefined;
  }
  const user = state?.user[author];

  if (user) {
    return user;
  } else {
    return undefined;
  }
};

export const selectPollVoted = (state, id) => {
  const homePage = state.homeState || { done: [], new: [] };
  const questionHome = homePage.done.concat(homePage.new);
  const item = questionHome.find((el) => el.id === id);

  return item ? item.isCurUserVote : false;
};

export const selectVoteOpt = (state, id, pollVoted) => {
  if (!pollVoted) {
    return "";
  }

  const poll = state.question[id];
  const opt1 = poll.optionOne.votes;
  const votedOpt1 = opt1.find((item) => item === state.userId);
  return votedOpt1 ? "optionOne" : "optionTwo";
};

export const selectLeadboard = (state) => state.leaderBoard;
