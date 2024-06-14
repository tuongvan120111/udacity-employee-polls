import React from "react";
import "./answer-option.css";
import { Button } from "antd";

export default function AnswerOption({ option, onVotePoll }) {
  return (
    <div className="answer">
      <div className="option">{option}</div>
      <Button className="selection" onClick={onVotePoll}>
        Click
      </Button>
    </div>
  );
}
