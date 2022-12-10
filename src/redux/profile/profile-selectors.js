export const getThemeSelector = (state) => {
  return state.profile.theme;
};
export const getUserInformationSelector = (state) => {
  return state.profile.userInformation;
};
export const getUserNameSelector = (state) => {
  return state.profile.userInformation.LoginUserName;
};
export const getALlNotesSelector = (state) => {
  return state.profile.notes;
};
