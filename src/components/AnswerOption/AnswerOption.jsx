import React from "react";
import "./answer-option.css";
import { Button } from "antd";

export default function AnswerOption({
  option,
  onVotePoll,
  disabled,
  className,
}) {
  return (
    <div className="answer">
      <div className="option">{option}</div>
      <Button
        className={`selection ${className}`}
        onClick={onVotePoll}
        disabled={disabled}
      >
        Click
      </Button>
    </div>
  );
}
