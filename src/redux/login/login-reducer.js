import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  setLoginUserInformationAC,
  setThemeToStateAC,
} from "../profile/profile-reducer";
import {
  deleteFromLocalStorageTC,
  setToLocalStorageTC,
} from "../app/app-reducer";

//TC are implemented for easier further expansion of the application (if suddenly it will be)
export const LoginTC = createAsyncThunk(
  "login/LoginTC",
  (params, { dispatch, rejectWithValue }) => {
    //If there was an api, there would be a request
    if (params.userName === "Admin" && params.password === "12345678") {
      let NewUserInformation = {
        LoginUserName: params.userName,
        Age: "22",
        Nationality: "Belarusian",
        Address: "Minsk",
        Freelance: "Available",
        Phone: "+375 29 XXX XX XX",
        EnglishLevel: "B1",
      };
      dispatch(setLoginErrorAC({ loginError: "" }));
      dispatch(setLoginUserInformationAC(NewUserInformation));
      dispatch(setToLocalStorageTC({ userInformation: NewUserInformation }));
      return true;
    } else {
      dispatch(
        setLoginErrorAC({
          loginError:
            "The username or password is entered incorrectly. Try again :)",
        })
      );
      return rejectWithValue({});
    }
  }
);

export const LogoutTC = createAsyncThunk(
  "login/LogoutTC",
  (params, { dispatch }) => {
    dispatch(setLoginUserInformationAC({}));
    dispatch(setThemeToStateAC({ theme: "dark" }));
    dispatch(deleteFromLocalStorageTC());
    return false;
  }
);

const slice = createSlice({
  name: "login",
  initialState: {
    loginError: "",
    isLoggedIn: false,
  },
  reducers: {
    setLoginErrorAC(state, action) {
      state.loginError = action.payload.loginError;
    },
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(LoginTC.fulfilled, (state) => {
      state.isLoggedIn = true;
    });
    builder.addCase(LogoutTC.fulfilled, (state) => {
      state.isLoggedIn = false;
    });
  },
});

export const loginReducer = slice.reducer;
export const { setLoginErrorAC, setIsLoggedIn } = slice.actions;
