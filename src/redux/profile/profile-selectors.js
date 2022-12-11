export const getThemeSelector = (state) => {
  return state.profile.theme;
};
export const getUserInformationSelector = (state) => {
  return state.profile.userInformation;
};
export const getUserNameSelector = (state) => {
  return state.profile.userInformation.LoginUserName;
};
