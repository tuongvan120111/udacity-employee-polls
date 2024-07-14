import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./headers.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slice/employee-poll-slice";
import { selectUser, selectUserId } from "../../utils/selection";
import { USER_ID } from "../../constants/constant";

export default function Headers({ children }) {
  const navigate = useNavigate();
  const history = useLocation();

  const [tab, setTab] = useState("/questions");

  const crtUser = useSelector(selectUserId);
  const currenUser = useSelector((state) => selectUser(state, crtUser));

  useEffect(() => {
    const isHomePage = history.pathname.includes("questions");
    if (isHomePage) {
      setTab("/questions");
    } else {
      setTab(history.pathname);
    }
  });

  const dispatch = useDispatch();

  const onClick = (key) => {
    setTab(key);
    navigate(key);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem(USER_ID);
    navigate("/login");
  };

  return (
    <>
      <div className="header-poll">
        <div className="menu">
          <div
            className={`menu-item ${tab === "/questions" && "item-selected"}`}
            onClick={() => onClick("/questions")}
          >
            Home
          </div>
          <div
            className={`menu-item ${tab === "/leaderboard" && "item-selected"}`}
            onClick={() => onClick("/leaderboard")}
          >
            Leaderboard
          </div>
          <div
            className={`menu-item ${tab === "/new-poll" && "item-selected"}`}
            onClick={() => onClick("/new-poll")}
          >
            New
          </div>
        </div>

        <div className="header-right">
          <div className="user-infor">
            <img src={currenUser?.avatarURL} alt="" height={35} />
            <label htmlFor="">{currenUser?.id}</label>
          </div>

          <div className="logout" onClick={handleLogout}>
            Logout
          </div>
        </div>
      </div>
      {children}
    </>
  );
}
