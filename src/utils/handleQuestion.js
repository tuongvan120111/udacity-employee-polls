import { convertDate } from "./date-time";

export const handleQuestion = (state, payload) => {
  const totalUser = Object.keys(state.user || {}).length;
  const question = Object.values(payload).map((item) => {
    const firstOption = item.optionOne;
    const secondOption = item.optionTwo;
    const totalVote = firstOption.votes.length + secondOption.votes.length;
    const votes = firstOption.votes?.concat(secondOption.votes) || [];
    const isCurUserVote = votes.some((el) => el === state.userId);
    return {
      id: item.id,
      owner: item.author,
      timeCreated: convertDate(item.timestamp),
      isDone: totalVote >= totalUser,
      isCurUserVote,
    };
  });

  const doneQues = question.filter((el) => el.isDone);
  const newQues = question.filter((el) => !el.isDone);
  return { doneQues, newQues };
};
