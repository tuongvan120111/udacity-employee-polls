import React, { memo, useCallback, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Headers from "../Headers/Headers";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../slice/employee-poll-slice";
import "./private-route.css";
import { selectUserId } from "../../utils/selection";
import PopupInfor from "../PopupInfor/PopupInfor";
import { USER_ID } from "../../constants/constant";
import { _getQuestions, _getUsers } from "../../_DATA";

const PrivateRoutes = memo(() => {
  const [athenaVal, setAthenaVAl] = useState(loadingState);
  const dispatch = useDispatch();

  const init = useCallback(async () => {
    const users = await _getUsers();
    const question = await _getQuestions();
    const userId = localStorage.getItem(USER_ID);
    const loginState = { userId, users, question };
    dispatch(login(loginState));
    setAthenaVAl(<OutletRender />);
  }, []);

  useEffect(() => {
    init();
  }, []);

  return athenaVal;
});

export default PrivateRoutes;

const loadingState = () => (
  <div className="loading-state">
    <div className="loading"></div>
  </div>
);

const OutletRender = () => {
  const userIdState = useSelector(selectUserId);
  const selectLoading = (state) => state?.isLoading || false;
  const isLoading = useSelector(selectLoading);
  const [isLogin] = useState(() => {
    return userIdState || localStorage.getItem(USER_ID);
  });
  const location = useLocation();

  return (
    <>
      {isLoading && (
        <div className="loading-state">
          <div className="loading"></div>
        </div>
      )}
      {isLogin ? (
        <Headers>
          <Outlet />
          <PopupInfor />
        </Headers>
      ) : (
        <Navigate to={"/login"} replace state={{ redirectTo: location }} />
      )}
    </>
  );
};
