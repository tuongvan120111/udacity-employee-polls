import React from "react";
import { IMAGES } from "../../constants/imgages";
import { useParams } from "react-router-dom";
import "./poll-page.css";
import AnswerArea from "../../components/AnswerArea/AnswerArea";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurUser,
  selectPollVoted,
  selectQuestion,
  selectUsers,
  selectVoteOpt,
} from "../../utils/selection";
import { saveAnswer } from "../../slice/employee-poll-slice";

export default function PollPage() {
  const dispatch = useDispatch();
  const { question_id } = useParams();
  const question = useSelector((state) => selectQuestion(state, question_id));

  const { optionOne, optionTwo } = question;
  const votes = optionOne.votes.concat(optionTwo.votes);

  const pollVoted = useSelector((state) => selectPollVoted(state, question_id));
  const optVoted = useSelector((state) =>
    selectVoteOpt(state, question_id, pollVoted)
  );

  const user = useSelector((state) => selectCurUser(state));
  const handleVotePoll = (isFirstOp) => {
    dispatch(
      saveAnswer({
        authedUser: user.id,
        qid: question_id,
        answer: isFirstOp ? "optionOne" : "optionTwo",
      })
    );
  };

  let optionVote = "";

  if (pollVoted) {
    optionVote = optVoted === "optionOne" ? "first" : "second";
  }

  const users = useSelector(selectUsers);
  const firstVotePercent = Math.round(
    (optionOne.votes.length / votes.length) * 100
  );

  return (
    <div className="poll-page">
      <h1>Poll by {user.name}</h1>
      <img src={IMAGES.LOGIN} alt="" />
      <div className="question-content">
        <h2>Would You Rather </h2>
        <AnswerArea
          opt1={optionOne.text}
          opt2={optionTwo.text}
          handleVotePoll={handleVotePoll}
          disabled={pollVoted}
          optVoted={optVoted}
        />
      </div>

      <div className="poll-infor">
        <div className="poll-msg">
          {pollVoted && `You voted ${optionVote} option!`}
        </div>
        <div className="total-user-voted">
          Total user voted {votes.length}/{Object.values(users).length}
        </div>
        <div className="vote-space">
          <div className="percent-voted">
            First option voted {firstVotePercent}%
          </div>
          <div className="percent-voted">
            Second option voted {100 - firstVotePercent}%
          </div>
        </div>
      </div>
    </div>
  );
}
