import React, { useState } from "react";
import "./question-field.css";
import QuestionContent from "../QuestionContent/QuestionContent";

export default function QuestionField({ title, questions = [] }) {
  const [asks, setAsks] = useState(questions);
  return (
    <div className="question-session">
      <div className="question-title">{title}</div>
      <div className="question-place">
        {asks.map((item, index) => {
          return (
            <QuestionContent
              owner={item.owner}
              timeCreated={item.timeCreated}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}
