export const getLoginState = (location) => {
  const { state } = location;
  if (!state) {
    return undefined;
  }

  return JSON.parse(JSON.stringify(state));
};
