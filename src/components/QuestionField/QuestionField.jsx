import React, { useState } from "react";
import "./question-field.css";
import QuestionContent from "../QuestionContent/QuestionContent";

export default function QuestionField({ title, questions = [] }) {
  return (
    <div className="question-session">
      <div className="question-title">{title}</div>
      <div className="question-place">
        {questions.map((item, index) => {
          return (
            <QuestionContent
              id={item.id}
              owner={item.owner}
              timeCreated={item.timeCreated}
              key={item.id}
            />
          );
        })}
      </div>
    </div>
  );
}
