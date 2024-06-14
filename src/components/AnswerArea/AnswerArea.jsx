import React from "react";
import AnswerOption from "../AnswerOption/AnswerOption";
import "./answer-area.css";

export default function AnswerArea({ opt1, opt2 }) {
  const handleVotePoll = (isOpt1Vote) => {
    console.log("opt", isOpt1Vote);
  };
  return (
    <div className="answer-area">
      <AnswerOption option={opt1} onVotePoll={() => handleVotePoll(true)} />
      <AnswerOption option={opt2} onVotePoll={() => handleVotePoll(false)} />
    </div>
  );
}
