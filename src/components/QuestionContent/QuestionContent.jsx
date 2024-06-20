import React from "react";
import "./question-content.css";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function QuestionContent({ owner, timeCreated, id }) {
  const navigate = useNavigate();

  const handleShowPoll = () => {
    navigate("/questions/" + id);
  };

  return (
    <div className="question">
      <div className="question-infor">
        <div className="question-owner" htmlFor="">
          {owner}
        </div>
        <div>{timeCreated}</div>
      </div>
      <Button className="question-show" onClick={handleShowPoll}>
        Show
      </Button>
    </div>
  );
}
