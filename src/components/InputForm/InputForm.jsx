import React from "react";
import "./input-form.css";

export default function InputForm({ label, register, required, password }) {
  return (
    <div className="input-form">
      <label>
        {label}
        <span>{required && "*"}</span>
      </label>
      <input
        {...register(label, { required })}
        type={!password ? "text" : "password"}
      />
    </div>
  );
}
