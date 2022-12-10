export const getErrorSelector = (state) => {
  return state.app.error;
};
export const getIsLoadingSelector = (state) => {
  return state.app.isLoading;
};
export const isLocalStorageEmptySelector = (state) => {
  return state.app.isLocalStorageEmpty;
};
