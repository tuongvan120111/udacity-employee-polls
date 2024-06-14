import { Button } from "antd";
import React, { useState } from "react";
import "./home.css";
import QuestionField from "../../components/QuestionField/QuestionField";

export default function HomePage() {
  const [tasks, setTasks] = useState({
    new: [
      { owner: "sarahedo", timeCreated: "4:11 PM | 11/23/2024" },
      { owner: "sarahedo", timeCreated: "4:11 PM | 11/23/2024" },
      { owner: "sarahedo", timeCreated: "4:11 PM | 11/23/2024" },
      { owner: "sarahedo", timeCreated: "4:11 PM | 11/23/2024" },
      { owner: "sarahedo", timeCreated: "4:11 PM | 11/23/2024" },
      { owner: "sarahedo", timeCreated: "4:11 PM | 11/23/2024" },
      { owner: "sarahedo", timeCreated: "4:11 PM | 11/23/2024" },
      { owner: "sarahedo", timeCreated: "4:11 PM | 11/23/2024" },
      { owner: "sarahedo", timeCreated: "4:11 PM | 11/23/2024" },
    ],
    done: [{ owner: "sarahedo", timeCreated: "4:11 PM | 11/23/2024" }],
  });
  return (
    <div className="home-page">
      <QuestionField title={"New Questions"} questions={tasks.new} />
      <QuestionField title={"Done"} questions={tasks.done} />
    </div>
  );
}
