import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EMPLOYEE_POLL } from "../constants/constant";
import { INITIALIZE_DATA_SPLICE } from "../constants/initializeData";
import {
  _getQuestions,
  _getUsers,
  _saveQuestion,
  _saveQuestionAnswer,
} from "../_DATA";
import { handleQuestion } from "../utils/handleQuestion";

export const getQuestion = createAsyncThunk(
  "employeePoll/getQuestion",
  async (request) => {
    const response = await _getQuestions();
    return response;
  }
);

export const saveAnswer = createAsyncThunk(
  "employeePoll/answerQuestion",
  async (request) => {
    const saveSuccess = await _saveQuestionAnswer(request);
    if (saveSuccess) {
      const users = await _getUsers();
      const questions = await _getQuestions();

      return { users, questions };
    }
  }
);

export const saveQuestion = createAsyncThunk(
  "employeePoll/saveQuestion",
  async (request) => {
    const saveQues = await _saveQuestion(request);
    return saveQues;
  }
);

export const employeePollSlice = createSlice({
  name: EMPLOYEE_POLL,
  initialState: INITIALIZE_DATA_SPLICE,
  reducers: {
    login(state, { payload = {} }) {
      const { userId, users } = payload;
      state.userId = userId;
      state.user = users;
    },
    logout(state, action) {
      state.userId = "";
    },
    stopLoading(state, action) {
      state.isLoading = false;
    },
    showPopup(state, action) {
      state.isShowPopup = true;
    },
    closePopup(state, action) {
      state.isShowPopup = false;
    },
    startLoading(state, action) {
      state.isLoading = true;
    },
  },
  extraReducers(build) {
    build
      // getQuestion
      .addCase(getQuestion.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getQuestion.fulfilled, (state, { payload }) => {
        state.question = payload;
        const getQuestion = handleQuestion(state, payload);
        state.homeState.done = getQuestion.doneQues;
        state.homeState.new = getQuestion.newQues;
        state.isLoading = false;
      })
      .addCase(getQuestion.rejected, (state, action) => {
        state.isLoading = false;
      })

      // saveAnswer
      .addCase(saveAnswer.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(saveAnswer.fulfilled, (state, { payload }) => {
        const { users, questions } = payload;

        state.question = questions;
        state.user = users;

        const getQuestion = handleQuestion(state, questions);
        state.homeState.done = getQuestion.doneQues;
        state.homeState.new = getQuestion.newQues;

        state.isShowPopup = true;
        state.isLoading = false;
      })
      .addCase(saveAnswer.rejected, (state, action) => {
        state.isLoading = false;
      })

      // saveQuestion
      .addCase(saveQuestion.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(saveQuestion.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isShowPopup = true;
      })
      .addCase(saveQuestion.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const {
  logout,
  login,
  stopLoading,
  startLoading,
  showPopup,
  closePopup,
} = employeePollSlice.actions;

export const employeePollReducer = employeePollSlice.reducer;
