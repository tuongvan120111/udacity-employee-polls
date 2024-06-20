import { Modal } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closePopup } from "../../slice/employee-poll-slice";
import { selectShowPopup } from "../../utils/selection";
import { useNavigate } from "react-router-dom";

export default function PopupInfor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClosePopup = () => {
    dispatch(closePopup());
    navigate("/");
  };

  const isShowPopup = useSelector(selectShowPopup);
  return (
    <>
      <Modal
        centered
        type="confirm"
        title="Infor"
        open={isShowPopup}
        onOk={handleClosePopup}
        cancelButtonProps={{ style: { display: "none" } }}
        onCancel={handleClosePopup}
      >
        <p>Action success!</p>
      </Modal>
    </>
  );
}
