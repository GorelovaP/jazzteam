const { setThemeToStateAC } = require("./profile-reducer");
const { slice } = require("./profile-reducer");
const { setLoginUserInformationAC } = require("./profile-reducer");
const { reducer: profileReducer } = slice;

let startState;

beforeEach(() => {
  startState = {
    name: "profile",
    initialState: {
      theme: "dark",
      userInformation: {
        LoginUserName: "",
        Age: "",
        Nationality: "",
        Address: "",
        Freelance: "",
        Phone: "",
        EnglishLevel: "",
      },
    },
  };
});

test("correct user information should be", () => {
  const endState = profileReducer(
    startState,
    setLoginUserInformationAC({
      LoginUserName: "Polina Gorelova",
      Age: "22",
      Nationality: "Belarusian",
      Address: "Minsk",
      Freelance: "+",
      Phone: "+375296647668",
      EnglishLevel: "B1",
    })
  );

  expect(endState.userInformation.LoginUserName).toBe("Polina Gorelova");
  expect(endState.userInformation.Age).toBe("22");
  expect(endState.userInformation.Nationality).toBe("Belarusian");
  expect(endState.userInformation.Address).toBe("Minsk");
  expect(endState.userInformation.Freelance).toBe("+");
  expect(endState.userInformation.Phone).toBe("+375296647668");
  expect(endState.userInformation.EnglishLevel).toBe("B1");
});

test("correct theme should be set", () => {
  const endState = profileReducer(
    startState,
    setThemeToStateAC({ theme: "light" })
  );
  expect(endState.theme).toBe("light");
});

