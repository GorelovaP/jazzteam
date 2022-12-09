import axios from "axios";
import { setAppErrorAC } from "../../redux/app/app-reducer";

export const errorHandler = ({ error, dispatch }) => {
  if (axios.isAxiosError(error) && error.response?.data.error) {
    dispatch(setAppErrorAC(error.response?.data.error));
  } else {
    dispatch(setAppErrorAC("Something went wrong..."));
  }
};
