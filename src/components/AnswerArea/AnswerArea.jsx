import React from "react";
import AnswerOption from "../AnswerOption/AnswerOption";
import "./answer-area.css";

export default function AnswerArea({
  opt1,
  opt2,
  handleVotePoll,
  disabled,
  optVoted,
}) {
  const opt1Voted = optVoted === "optionOne";
  return (
    <div className="answer-area">
      <AnswerOption
        className={opt1Voted && "voted"}
        option={opt1}
        onVotePoll={() => handleVotePoll(true)}
        disabled={disabled}
      />
      <AnswerOption
        className={!opt1Voted && "voted"}
        option={opt2}
        onVotePoll={() => handleVotePoll(false)}
        disabled={disabled}
      />
    </div>
  );
}
