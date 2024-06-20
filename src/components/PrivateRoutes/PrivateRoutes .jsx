import React, { memo, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Headers from "../Headers/Headers";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../slice/employee-poll-slice";
import "./private-route.css";
import { getLoginState } from "../../utils/state-login";
import { selectUserId } from "../../utils/selection";
import PopupInfor from "../PopupInfor/PopupInfor";

const PrivateRoutes = memo(() => {
  const location = useLocation();
  const loginState = getLoginState(location);
  const dispatch = useDispatch();
  const userIdState = useSelector(selectUserId);
  const selectLoading = (state) => state.isLoading;
  const isLoading = useSelector(selectLoading);
  const [isLogin] = useState(!!loginState?.userId || !!userIdState);
  useEffect(() => {
    dispatch(login(loginState));
    location.state = {};
  }, [isLogin]);

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
