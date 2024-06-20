import { Menu, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./headers.css";
import { IMAGES } from "../../constants/imgages";
import { useDispatch } from "react-redux";
import { logout } from "../../slice/employee-poll-slice";
// import avatar from "../../../public/avatar/avatar-svgrepo-com.svg";

export default function Headers({ children }) {
  const navigate = useNavigate();
  const history = useLocation();

  const [tab, setTab] = useState("/questions");

  useEffect(() => {
    const isHomePage = history.pathname === "/";
    if (isHomePage) {
      setTab("/questions");
    }
  });

  const dispatch = useDispatch();

  const items = [
    {
      label: "Home",
      key: "/questions",
    },
    {
      label: "Leaderboard",
      key: "/leaderboard",
    },
    {
      label: "New",
      key: "/new-poll",
    },
  ];

  const onClick = ({ key }) => {
    setTab(key);
    navigate(key);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <div className="header-poll">
        <Menu
          onClick={onClick}
          selectedKeys={tab}
          mode="horizontal"
          items={items}
        />

        <div className="header-right">
          <div className="user-infor">
            <img src={IMAGES.RED_MAN} alt="" height={35} />
            <label htmlFor="">Mic</label>
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
