import { Table } from "antd";
import React from "react";
import { IMAGES } from "../../constants/imgages";
import "./leader-board.css";

export default function LeaderboardPage() {
  const dataSource = [
    {
      img: IMAGES.GREY_BOY,
      name: "Sarah Edo",
      user: "sarahedo",
      id: "aaaa",
      answered: 4,
      created: 5,
      key: "aaaa",
    },
    {
      img: IMAGES.GREY_BOY,
      name: "Sarah Edo",
      user: "sarahedo",
      id: "aaaa",
      key: "aaaa2",
      answered: 4,
      created: 5,
    },
  ];

  const columns = [
    {
      title: "Users",
      dataIndex: "name",
      key: "name",
      render: (_, record) => {
        return (
          <div className="user">
            <img src={record.img} alt="" width={40} />
            <div className="user-field">
              <div className="user-name">{record.name}</div>
              <div className="name">{record.user}</div>
            </div>
          </div>
        );
      },
    },
    {
      title: "Answered",
      dataIndex: "answered",
      key: "answered",
    },
    {
      title: "Created",
      dataIndex: "created",
      key: "created",
    },
  ];

  return (
    <div className="leader-board">
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </div>
  );
}
