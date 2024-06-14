import React from "react";
import { IMAGES } from "../../constants/imgages";
import { Button, Form, Input } from "antd";
import "./login-page.css";

export default function LoginPage() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <div className="login-page">
      <h1>Employee Rolls</h1>
      <img src={IMAGES.LOGIN} alt="" width={400} />
      <div className="login-space">
        <h2>Log In</h2>
        <Form name="basic" style={{ width: 600 }} onFinish={onFinish}>
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
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
