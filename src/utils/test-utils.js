import React from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { employeePollReducer } from "../slice/employee-poll-slice";

const loggerMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  console.log("Middleware: Dispatching action:", action);
  console.log("Middleware: New state:", store.getState());
  return result;
};

const renderWithProvider = (
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: employeePollReducer,
      preloadedState,
      // middleware: (getDefaultMiddleware) =>
      //   getDefaultMiddleware().concat(loggerMiddleware),
    }),
    ...renderOptions
  } = {}
) => {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

export default renderWithProvider;
