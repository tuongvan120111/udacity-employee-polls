import React, { useCallback, useEffect, useState } from "react";
import { IMAGES } from "../../constants/imgages";
import "./login-page.css";
import { _getUsers } from "../../_DATA";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputForm from "../../components/InputForm/InputForm";
import { USER_ID } from "../../constants/constant";

export default function LoginPage() {
  const [users, setUser] = useState({});
  const [showMsgErr, setShowMsgErr] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const { state: locationState } = useLocation();

  const getUser = useCallback(async () => {
    const userRes = await _getUsers();
    setUser(userRes);
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  const handleLogin = (values) => {
    const { Password: password, Username: username } = values;

    const userLogin = users[username];
    if (!userLogin) {
      setShowMsgErr(true);
      return;
    }

    const { password: passwdUser } = userLogin;
    if (password !== passwdUser) {
      setShowMsgErr(true);
      return;
    }

    localStorage.setItem(USER_ID, username);

    if (locationState) {
      const { redirectTo } = locationState;
      navigate(`${redirectTo.pathname}${redirectTo.search}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="login-page">
      <h1>Employee Rolls</h1>
      <img src={IMAGES.LOGIN} alt="" width={400} />

      <div className="login-space">
        <h2>Log In</h2>
        <div className="error">
          {showMsgErr && "Username or Password is not correct!"}
        </div>

        <form onSubmit={handleSubmit(handleLogin)}>
          <InputForm label="Username" required={true} register={register} />
          <InputForm
            label="Password"
            required={true}
            register={register}
            password={true}
          />
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
