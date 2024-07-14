import React, { memo, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Headers from "../Headers/Headers";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../slice/employee-poll-slice";
import "./private-route.css";
import { selectUserId } from "../../utils/selection";
import PopupInfor from "../PopupInfor/PopupInfor";
import { USER_ID } from "../../constants/constant";
import { _getUsers } from "../../_DATA";

const PrivateRoutes = memo(() => {
  const dispatch = useDispatch();
  const userIdState = useSelector(selectUserId);
  const selectLoading = (state) => state?.isLoading || false;
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    _getUsers().then((users) => {
      const userId = localStorage.getItem(USER_ID);
      const loginState = { userId, users };
      dispatch(login(loginState));
    });
  }, []);

  const [isLogin] = useState(() => {
    return userIdState || localStorage.getItem(USER_ID);
  });

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
        <Navigate to={"/login"} replace />
      )}
    </>
  );
});

export default PrivateRoutes;
