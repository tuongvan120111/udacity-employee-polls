import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import LoginPage from "../../pages/LoginPage/LoginPage";
import React from "react";
import { _getUsers } from "../../_DATA";

const mockedUsedNavigate = jest.fn();
const mockLocatopn = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
  useLocation: () => mockLocatopn,
}));

jest.mock("../../_DATA", () => {
  return { _getUsers: jest.fn() };
});

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

const users = {
  sarahedo: {
    id: "sarahedo",
    password: "password123",
    name: "Sarah Edo",
    avatarURL: "",
    answers: {
      "8xf0y6ziyjabvozdd253nd": "optionOne",
      "6ni6ok3ym7mf1p33lnez": "optionOne",
      am8ehyc8byjqgar0jgpub9: "optionTwo",
      loxhs1bqm25b708cmbf3g: "optionTwo",
    },
    questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
  },
};

describe("LoginPage DOM Testing", () => {
  let userMock;
  let userCurMock;
  let mockSetState;

  beforeEach(() => {
    userMock = JSON.parse(JSON.stringify(users));
    userCurMock = userMock["sarahedo"];
    mockSetState = jest.fn();
    React.useState.mockImplementation((init) => {
      let type = typeof init;
      if (type === "boolean") {
        return [init, mockSetState];
      } else {
        return [userMock, mockSetState];
      }
    });
    _getUsers.mockReturnValue(userMock);
  });

  test("Should render UI with username and password", async () => {
    const { container } = render(<LoginPage />);

    await waitFor(() => {
      const pwd = container.querySelector("#Password");
      const userName = container.querySelector("#Username");

      expect(pwd).toBeInTheDocument();
      expect(userName).toBeInTheDocument();
    });
  });

  test("Should navigate other page when login success", async () => {
    const { container } = render(<LoginPage />);
    await waitFor(() => {
      const pwd = container.querySelector("#Password");
      const userName = container.querySelector("#Username");

      fireEvent.change(userName, {
        target: { value: "sarahedo" },
      });
      fireEvent.change(pwd, { target: { value: "password123" } });
      const [submitBtn] = screen.getAllByRole("button", { name: "Login" });
      fireEvent.click(submitBtn);
    });
    expect(mockedUsedNavigate).toHaveBeenCalled();
  });

  test("Should show message error when request invalid to login", async () => {
    const mockSetCount = jest.fn();
    const mockSetItems = jest.fn();
    React.useState
      .mockImplementationOnce(() => [userMock, mockSetCount])
      .mockImplementationOnce(() => [true, mockSetItems]);

    const { container } = render(<LoginPage />);
    await waitFor(() => {
      const pwd = container.querySelector("#Password");
      const userName = container.querySelector("#Username");

      fireEvent.change(userName, {
        target: { value: "This is userName" },
      });
      fireEvent.change(pwd, { target: { value: "This is pwd" } });
      const [submitBtn] = screen.getAllByRole("button", { name: "Login" });
      fireEvent.click(submitBtn);
    });
    const err = "Username or Password is not correct!";
    const errorEl = screen.getByText(err);
    expect(errorEl).toBeInTheDocument();
  });
});
