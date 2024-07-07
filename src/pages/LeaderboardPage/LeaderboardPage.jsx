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

  return (
    <div className="leader-board">
      <table>
        <tr>
          <th className="user">Users</th>
          <th className="answered">Answered</th>
          <th className="created">Created</th>
        </tr>

        {leaderBoard.map((item) => {
          return (
            <tr key={item.user}>
              <td>
                <div className="user">
                  <img src={item.img} alt="" width={40} />
                  <div className="user-field">
                    <div className="user-name">{item.name}</div>
                    <div className="name">{item.user}</div>
                  </div>
                </div>
              </td>

              <td>
                <div className="answered">{item.answered}</div>
              </td>
              <td>
                <div className="created">{item.created}</div>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
