import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLeadboard } from "../../utils/selection";
import { useLoadingInitial } from "../../hook/stopLoadingHook";
import "./leader-board.css";
import { IMAGES } from "../../constants/imgages";
import {
  handleSortDown,
  handleSortUp,
  restartLeaderboard,
} from "../../slice/employee-poll-slice";

const LeaderboardPage = () => {
  const dispatch = useDispatch();
  const leaderBoard = useSelector(selectLeadboard);

  useLoadingInitial(dispatch);

  const onHandleSortUp = (type) => {
    dispatch(handleSortUp(type));
  };
  const onHhandleSortDown = (type) => {
    dispatch(handleSortDown(type));
  };

  useEffect(() => {
    return () => dispatch(restartLeaderboard());
  }, []);

  return (
    <div className="leader-board">
      <table>
        <thead>
          <tr>
            <th className="user">Users</th>
            <th className="answered">
              Answered
              <span>
                <img
                  onClick={() => onHandleSortUp("Answered")}
                  className="scroll"
                  src={IMAGES.SCROLL_UP}
                  alt=""
                  width={12}
                />
                <img
                  onClick={() => onHhandleSortDown("Answered")}
                  className="scroll"
                  src={IMAGES.SCROLL_DOWN}
                  alt=""
                  width={12}
                />
              </span>
            </th>
            <th className="created">
              Created
              <span>
                <img
                  onClick={() => onHandleSortUp("Created")}
                  className="scroll"
                  src={IMAGES.SCROLL_UP}
                  alt=""
                  width={12}
                />
                <img
                  onClick={() => onHhandleSortDown("Created")}
                  className="scroll"
                  src={IMAGES.SCROLL_DOWN}
                  alt=""
                  width={12}
                />
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
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
        </tbody>
      </table>
    </div>
  );
};

export default memo(LeaderboardPage);
