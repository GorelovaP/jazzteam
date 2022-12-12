import { setIsLoggedIn, setLoginError } from "./login-reducer";
import { slice } from "./login-reducer";

const { reducer: loginReducer } = slice;

let startState;

beforeEach(() => {
  startState = {
    name: "profile",
    initialState: {
      loginError: "",
      isLoggedIn: false,
    },
  };
});

test("correct login error should be", () => {
  const endState = loginReducer(
    startState,
    setLoginError({ loginError: "Something went wrong" })
  );

  expect(endState.loginError).toBe("Something went wrong");
});

test("correct theme should be set", () => {
  const endState = loginReducer(
    startState,
    setIsLoggedIn({ isLoggedIn: true })
  );
  expect(endState.isLoggedIn).toBe(true);
});
