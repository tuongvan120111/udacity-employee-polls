import { Button } from "antd";
import React from "react";
import { IMAGES } from "../../constants/imgages";
import { useParams } from "react-router-dom";
import "./poll-page.css";
import AnswerArea from "../../components/AnswerArea/AnswerArea";

export default function PollPage() {
  const { question_id } = useParams();

  return (
    <div className="poll-page">
      <h1>Poll by sarahedo</h1>
      <img src={IMAGES.LOGIN} alt="" />
      <div className="question-content">
        <h2>Would You Rather </h2>
        <AnswerArea
          opt1={"Build our new application with javascript"}
          opt2={"Build our new javascript"}
        />
      </div>
    </div>
  );
}
