export const selectUsers = (state) => state.user;
export const selectHomeState = (state) => state.homeState;
export const selectUserId = (state) => state.userId || "";
export const selectShowMsgErr = (state) => state.isShowMsgErr;
export const selectQuestion = (state, id) => state.question[id];
export const selectShowPopup = (state) => state?.isShowPopup || false;
export const selectCurUser = (state) => {
  const userId = state?.userId;
  if (!state?.user) {
    return undefined;
  }
  const user = state?.user[userId];

  if (user) {
    return user;
  } else {
    return undefined;
  }
};
export const selectPollVoted = (state, id) => {
  const homePage = state.homeState;
  const questionHome = homePage.done.concat(homePage.new);
  const item = questionHome.find((el) => el.id === id);

  return item.isCurUserVote;
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
