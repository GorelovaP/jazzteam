import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { errorHandler } from "../../common/helpers/errorHendler";
import { setIsLoadingAC } from "../app/app-reducer";
import { tableAPI } from "../../api/api";

export const getTableDataFromDbTC = createAsyncThunk(
  "table/getTableDataFromDb",
  async (param, { dispatch }) => {
    try {
      dispatch(setIsLoadingAC({ isLoading: true }));
      const res = await tableAPI.getTableData();
      return { data: res.data };
    } catch (err) {
      errorHandler({ err, dispatch });
    } finally {
      dispatch(setIsLoadingAC({ isLoading: false }));
    }
  }
);

export const setTableDataToDbTC = createAsyncThunk(
  "table/setTableDataToDb",
  async ({ id, prop, value }, { dispatch, getState }) => {
    try {
      const state = getState();
      if (state.table.tableInfo.length) {
        const newData = state.table.tableInfo
          .map((obj) => {
            if (obj.id === id) {
              const rows = obj.rows.map((field) => {
                if (field.prop === prop) {
                  return { ...field, value: value };
                } else {
                  return field;
                }
              });
              return { id, rows };
            }
          })
          .filter((el) => el !== undefined)[0];
        await tableAPI.setTableData(newData, id);
        dispatch(getTableDataFromDbTC());
      }
    } catch (err) {
      errorHandler({ err, dispatch });
    } finally {
      dispatch(setIsLoadingAC({ isLoading: false }));
    }
  }
);

const slice = createSlice({
  name: "table",
  initialState: {
    tableInfo: [],
    selectedRows: null,
    totalAmount: null,
  },
  reducers: {
    setAppErrorAC(state, action) {
      state.error = action.payload.error;
    },
    changeIsSelectedAC(state, action) {
      const objIndex = state.tableInfo.findIndex(
        (obj) => obj.id === action.payload.id
      );
      state.tableInfo[objIndex].isSelected
        ? (state.selectedRows = state.selectedRows - 1)
        : (state.selectedRows = state.selectedRows + 1);
      state.tableInfo[objIndex].isSelected =
        !state.tableInfo[objIndex].isSelected;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTableDataFromDbTC.fulfilled, (state, action) => {
      // count the selected rows
      let selectedRowsNumber = 0;
      action.payload.data.map((obj) => {
        if (obj.isSelected) {
          selectedRowsNumber++;
        }
      });
      state.selectedRows = selectedRowsNumber;
      //total amount of data
      state.totalAmount =
        action.payload.data.length * action.payload.data[0].rows.length;
      //write the data to the state
      state.tableInfo = action.payload.data;
    });
  },
});

export const tableReducer = slice.reducer;
export const { changeIsSelectedAC } = slice.actions;
