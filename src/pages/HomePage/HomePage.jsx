import React from "react";
import "./home.css";
import QuestionField from "../../components/QuestionField/QuestionField";
import { selectHomeState } from "../../utils/selection";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestion } from "../../slice/employee-poll-slice";

export default function HomePage() {
  const homeState = useSelector(selectHomeState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuestion());
  }, []);

  return (
    <div className="home-page">
      <QuestionField title={"New Questions"} questions={homeState.new} />
      <QuestionField title={"Done"} questions={homeState.done} />
    </div>
  );
}
