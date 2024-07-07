import React from "react";
import "./new-poll.css";
import { useDispatch, useSelector } from "react-redux";
import { useLoadingInitial } from "../../hook/stopLoadingHook";
import { saveQuestion } from "../../slice/employee-poll-slice";
import { selectUserId } from "../../utils/selection";
import { useForm } from "react-hook-form";
import InputForm from "../../components/InputForm/InputForm";

export default function NewPollPage() {
  const dispatch = useDispatch();
  useLoadingInitial(dispatch);
  const userId = useSelector(selectUserId);

  const onFinish = ({
    FirstOption: firstOption,
    SecondOption: secondOption,
  }) => {
    dispatch(
      saveQuestion({
        optionOneText: firstOption,
        optionTwoText: secondOption,
        author: userId,
      })
    );
  };

  const { register, handleSubmit } = useForm();

  return (
    <div className="new-poll">
      <h1>Would You Rather</h1>
      <div className="description-poll">Create Your Own Poll</div>
      <div className="poll-option">
        <form onSubmit={handleSubmit(onFinish)}>
          <InputForm label="FirstOption" required={true} register={register} />
          <InputForm label="SecondOption" required={true} register={register} />
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
