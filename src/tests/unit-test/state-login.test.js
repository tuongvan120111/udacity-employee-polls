import { getLoginState } from "../../utils/state-login";

describe("State Login data", () => {
  it("Should return not valid data when state do not contain in location", () => {
    const state = getLoginState({});
    expect(state).toBeUndefined();
  });

  it("Should return not valid when object have state but state is not valid", () => {
    const state = getLoginState({ state: null });
    expect(state).toBeUndefined();
  });

  it("Should return new data base on old state", () => {
    const state = { data: "initialization data" };
    const stateData = getLoginState({ state });
    state.data = "this string has changed";
    expect(state.data).not.toEqual(stateData.data);
  });
});
