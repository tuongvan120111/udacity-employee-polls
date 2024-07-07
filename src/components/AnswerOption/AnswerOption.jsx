import React from "react";
import "./answer-option.css";

export default function AnswerOption({
  option,
  onVotePoll,
  disabled,
  className,
}) {
  return (
    <div className="answer">
      <div className="option">{option}</div>
      <button
        className={`btn selection ${className}`}
        disabled={disabled}
        onClick={onVotePoll}
      >
        Click
      </button>
    </div>
  );
}
