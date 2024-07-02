import React, { useCallback, useEffect, useState } from "react";
import { IMAGES } from "../../constants/imgages";
import { Button, Form, Input } from "antd";
import "./login-page.css";
import { _getUsers } from "../../_DATA";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [users, setUser] = useState({});
  const [showMsgErr, setShowMsgErr] = useState(false);
  const navigate = useNavigate();

  const getUser = useCallback(async () => {
    const userRes = await _getUsers();
    setUser(userRes);
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  const handleLogin = (values) => {
    const { password, username } = values;

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

    navigate("/", { state: { users, userId: username } });
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
        <Form name="basic" style={{ width: 600 }} onFinish={handleLogin}>
          <Form.Item
            label="Username"
            name="username"
            className="field-space"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            className="field-space"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
