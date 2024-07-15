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
import { getLeaderBoardData } from "../utils/get-leader-board-data";

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

    return Promise.reject(false);
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
      const { userId, users, question } = payload;
      state.userId = userId || "";
      state.question = question;
      const getQuestion = handleQuestion(state, question);
      state.homeState.done = getQuestion.doneQues;
      state.homeState.new = getQuestion.newQues;
      state.user = users || {};
      state.leaderBoard = getLeaderBoardData(users || "");
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
    restartLeaderboard(state, action) {
      state.leaderBoard = getLeaderBoardData(state.user || "");
    },
    handleSortUp(state, { payload = "" }) {
      let property = "answered";

      if (payload !== "Answered") {
        property = "created";
      }

      const item = JSON.parse(JSON.stringify(state.leaderBoard));

      const itemSort = item.sort(
        (first, second) => second[property] - first[property]
      );
      state.leaderBoard = itemSort;
    },
    handleSortDown(state, { payload = "" }) {
      let property = "answered";

      if (payload !== "Answered") {
        property = "created";
      }

      const item = JSON.parse(JSON.stringify(state.leaderBoard));
      const itemSort = item.sort(
        (first, second) => first[property] - second[property]
      );
      state.leaderBoard = itemSort;
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
        state.saveAnswerErr = false;
      })
      .addCase(saveAnswer.rejected, (state, action) => {
        state.isLoading = false;
        state.saveAnswerErr = true;
      })

      // saveQuestion
      .addCase(saveQuestion.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(saveQuestion.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isShowPopup = true;
        state.question = {
          ...state.questions,
          [payload?.id]: payload,
        };
        state.pollSaveErr = false;
      })
      .addCase(saveQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.pollSaveErr = true;
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
  restartLeaderboard,
  handleSortDown,
  handleSortUp,
} = employeePollSlice.actions;

export const employeePollReducer = employeePollSlice.reducer;
