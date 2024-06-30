import { IMAGES } from "../../constants/imgages";
import { getLeaderBoardData } from "../../utils/get-leader-board-data";

const sarahedoUser = {
  id: "sarahedo",
  password: "password123",
  name: "Sarah Edo",
  avatarURL: IMAGES.GREY_BOY,
  answers: {
    "8xf0y6ziyjabvozdd253nd": "optionOne",
    "6ni6ok3ym7mf1p33lnez": "optionOne",
    am8ehyc8byjqgar0jgpub9: "optionTwo",
    loxhs1bqm25b708cmbf3g: "optionTwo",
  },
  questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
};

describe("Get Leader Board function", () => {
  it("Should return empty array when data is null", () => {
    const data = getLeaderBoardData(null);
    expect(data.length).toEqual(0);
  });

  it("Should return empty array when data is invalid", () => {
    const data = getLeaderBoardData("empty object");
    expect(data.length).toEqual(0);
  });

  it("Should return array data when data is valid", () => {
    const data = getLeaderBoardData({ sarahedoUser });
    expect(data[0].name).toEqual(sarahedoUser.name);
    expect(data[0].id).toEqual(sarahedoUser.user);
  });
});
