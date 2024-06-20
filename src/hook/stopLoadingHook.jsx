import { useEffect } from "react";
import { startLoading, stopLoading } from "../slice/employee-poll-slice";

export const useLoadingInitial = (dispatch) => {
  useEffect(() => {
    dispatch(startLoading());

    const timeout = setTimeout(() => {
      dispatch(stopLoading());
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);
};
