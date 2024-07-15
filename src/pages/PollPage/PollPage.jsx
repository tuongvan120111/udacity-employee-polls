import React from "react";
import { Navigate, useParams } from "react-router-dom";
import "./poll-page.css";
import AnswerArea from "../../components/AnswerArea/AnswerArea";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUser,
  selectPollSaveErr,
  selectPollVoted,
  selectQuestion,
  selectUsers,
  selectVoteOpt,
  selectUserId,
} from "../../utils/selection";
import { saveAnswer } from "../../slice/employee-poll-slice";
import { useLoadingInitial } from "../../hook/stopLoadingHook";

export default function PollPage() {
  const dispatch = useDispatch();

  const { question_id } = useParams();
  const question = useSelector((state) => selectQuestion(state, question_id));
  useLoadingInitial(dispatch);

  return (
    <>
      {question ? (
        <MainPollPage question_id={question_id} question={question} />
      ) : (
        <Navigate to={"/not-found"} replace />
      )}
    </>
  );
}

const MainPollPage = ({ question_id, question }) => {
  const dispatch = useDispatch();
  const ownser = useSelector((state) => selectUser(state, question?.author));
  const saveAnswerErr = useSelector(selectPollSaveErr);

  const votes =
    question?.optionOne?.votes?.concat(question?.optionTwo?.votes || []) || [];

  const pollVoted = useSelector((state) => selectPollVoted(state, question_id));
  const optVoted = useSelector((state) =>
    selectVoteOpt(state, question_id, pollVoted)
  );

  const crtUser = useSelector(selectUserId);
  const user = useSelector((state) => selectUser(state, crtUser));
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
    ((question?.optionOne?.votes?.length || 0) / votes.length) * 100
  );

  return (
    <div className="poll-page">
      <h1>Poll by {ownser?.name}</h1>
      <img src={ownser?.avatarURL} alt="" />
      <div className="question-content">
        <h2>Would You Rather </h2>
        <div className="error">
          {saveAnswerErr && "Username or Password is not correct!"}
        </div>
        <AnswerArea
          opt1={question?.optionOne?.text}
          opt2={question?.optionTwo?.text}
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
};
