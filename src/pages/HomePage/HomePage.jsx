import React from "react";
import "./home.css";
import QuestionField from "../../components/QuestionField/QuestionField";
import { selectHomeState } from "../../utils/selection";
import { useDispatch, useSelector } from "react-redux";
import { useLoadingInitial } from "../../hook/stopLoadingHook";

export default function HomePage() {
  const homeState = useSelector(selectHomeState);
  const dispatch = useDispatch();

  useLoadingInitial(dispatch);

  return (
    <div className="home-page">
      <QuestionField title={"New Questions"} questions={homeState.new} />
      <QuestionField title={"Done"} questions={homeState.done} />
    </div>
  );
}
