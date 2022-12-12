import {
  isLocalStorageEmptyAC,
  setAppErrorAC,
  setIsLoadingAC,
  slice,
} from "./app-reducer";

const { reducer: appReducer } = slice;

let startState;

beforeEach(() => {
  startState = {
    error: null,
    isLoading: false,
    isLocalStorageEmpty: true,
  };
});

test("correct error message should be set", () => {
  const endState = appReducer(
    startState,
    setAppErrorAC({ error: "some error" })
  );

  expect(endState.error).toBe("some error");
});

test("correct loading should be set", () => {
  const endState = appReducer(startState, setIsLoadingAC({ isLoading: true }));

  expect(endState.isLoading).toBe(true);
});

test("correct isLocalStorageEmpty should be set", () => {
  const endState = appReducer(
    startState,
    isLocalStorageEmptyAC({ isLocalStorageEmpty: false })
  );

  expect(endState.isLoading).toBe(false);
});
