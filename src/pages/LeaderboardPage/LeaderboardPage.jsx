import { Table } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUsers } from "../../utils/selection";
import { getLeaderBoardData } from "../../utils/get-leader-board-data";
import { useLoadingInitial } from "../../hook/stopLoadingHook";
import "./leader-board.css";

export default function LeaderboardPage() {
  const user = useSelector(selectUsers);
  const leaderBoard = getLeaderBoardData(user);
  const dispatch = useDispatch();

  useLoadingInitial(dispatch);

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
      <Table dataSource={leaderBoard} columns={columns} pagination={false} />
    </div>
  );
}
