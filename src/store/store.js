import { configureStore } from "@reduxjs/toolkit";
import { employeePollReducer } from "../slice/employee-poll-slice";

export const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.info("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  console.groupEnd();
  return result;
};

export const store = configureStore({
  reducer: employeePollReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
