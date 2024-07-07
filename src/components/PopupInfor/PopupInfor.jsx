import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closePopup } from "../../slice/employee-poll-slice";
import { selectShowPopup } from "../../utils/selection";
import { useNavigate } from "react-router-dom";
import "./popup-infor.css";
import { IMAGES } from "../../constants/imgages";

export default function PopupInfor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClosePopup = () => {
    dispatch(closePopup());
    navigate("/");
  };

  const isShowPopup = useSelector(selectShowPopup);
  const showHideClassName = isShowPopup
    ? "modal display-block"
    : "modal display-none";
  return (
    <>
      <div className={showHideClassName}>
        <section className="modal-main">
          <div className="modal-contain">
            <h3>Success!</h3>
            <span>
              <img src={IMAGES.SUCCESS} alt="" height={30} width={30} />
              <p>Action success!</p>
            </span>
            <button
              class="btn btn-secondary"
              type="button"
              onClick={handleClosePopup}
            >
              Close
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
