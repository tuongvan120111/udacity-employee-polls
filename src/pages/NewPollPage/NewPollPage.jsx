import { Button, Form, Input } from "antd";
import React from "react";
import { useState } from "react";
import "./new-poll.css";

export default function NewPollPage() {
  const [ableSubmited, setAbleSubmited] = useState(false);
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const handleValueChange = (_, allValues) => {
    const { firstOption, secondOption } = allValues;
    setAbleSubmited(!!firstOption && !!secondOption);
  };

  return (
    <div className="new-poll">
      <h1>Would You Rather</h1>
      <div className="description-poll">Create Your Own Poll</div>
      <div className="poll-option">
        <div className="option-chosen">
          <Form
            name="basic"
            style={{ width: 600 }}
            onFinish={onFinish}
            onValuesChange={handleValueChange}
          >
            <Form.Item
              label="First Option"
              name="firstOption"
              className="field-space"
            >
              <Input placeholder="Option One" />
            </Form.Item>

            <Form.Item
              label="Second Option"
              name="secondOption"
              className="field-space"
            >
              <Input placeholder="Option Two" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" disabled={!ableSubmited}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
