import { convertDate } from "../../utils/date-time";

describe("Convert Date", () => {
  it("Should return empty string when not valid", () => {
    const date = convertDate(null);
    expect(date).toEqual("");
  });

  it("Should return empty string when date not valid", () => {
    const date = convertDate("aaaaa");
    expect(date).toEqual("");
  });

  it("Should return date convert in format HH:mm <AM/PM> MM/DD/YYY", () => {
    const date = convertDate(1467166872634);
    expect(date).toEqual("9:21 AM | 6/29/2016");
  });
});
