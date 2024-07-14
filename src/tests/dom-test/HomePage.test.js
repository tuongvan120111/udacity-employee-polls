import { fireEvent, screen, waitFor } from "@testing-library/dom";
import { handleQuestion } from "../../utils/handleQuestion";
import renderWithProvider from "../../utils/test-utils";
import HomePage from "../../pages/HomePage/HomePage";

const question = {
  "8xf0y6ziyjabvozdd253nd": {
    id: "8xf0y6ziyjabvozdd253nd",
    author: "sarahedo",
    timestamp: 1467166872634,
    optionOne: {
      votes: ["sarahedo"],
      text: "Build our new application with Javascript",
    },
    optionTwo: {
      votes: [],
      text: "Build our new application with Typescript",
    },
  },
};
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

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("HomePage DOM Testing", () => {
  let userMock;
  let questionMock;
  let userCurMock;

  beforeEach(() => {
    userMock = JSON.parse(JSON.stringify(users));
    userCurMock = userMock["sarahedo"];
    questionMock = JSON.parse(JSON.stringify(question));
  });

  test("Should render with one question", async () => {
    const homeData = handleQuestion(
      { userId: userCurMock.id, user: userMock },
      questionMock
    );

    const homeStateMock = {
      homeState: {
        new: homeData.newQues,
        done: homeData.doneQues,
      },
      userId: userCurMock.id,
      user: userMock,
    };

    renderWithProvider(<HomePage />, {
      preloadedState: homeStateMock,
    });

    await waitFor(() => {
      const rows = screen.getByText("9:21 AM | 6/29/2016");
      expect(rows).toBeInTheDocument();
    });
  });

  test("Should navigate to Page answer when user click on button to answer the question", async () => {
    const homeData = handleQuestion(
      { userId: userCurMock.id, user: userMock },
      questionMock
    );

    const homeStateMock = {
      homeState: {
        new: homeData.newQues,
        done: homeData.doneQues,
      },
      userId: userCurMock.id,
      user: userMock,
    };

    renderWithProvider(<HomePage />, {
      preloadedState: homeStateMock,
    });

    await waitFor(() => {
      const buttons = screen.getAllByRole("button", { name: "Show" });
      fireEvent.click(buttons[0]);
      expect(mockedUsedNavigate).toHaveBeenCalledWith(
        "/questions/8xf0y6ziyjabvozdd253nd"
      );
    });
  });
});
