import { Menu, Space } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./headers.css";
import { IMAGES } from "../../constants/imgages";
// import avatar from "../../../public/avatar/avatar-svgrepo-com.svg";

export default function Headers({ children }) {
  const navigate = useNavigate();

  const [tab, setTab] = useState("/home");

  const items = [
    {
      label: "Home",
      key: "/home",
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

          <div className="logout">Logout</div>
        </div>
      </div>
      {children}
    </>
  );
}
