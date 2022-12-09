import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {setIsLoadingAC} from "./app-reducer";
import {tableAPI} from "../api/api";
import {errorHandler} from "../common/helpers/errorHendler";


export const getTableDataFromDbTC = createAsyncThunk("table/getTableDataFromDb", async (param, {dispatch}) => {
        dispatch(setIsLoadingAC({isLoading: true}))
        try {
            const res = await tableAPI.getTableData()
            return {data: res.data}
        } catch (err) {
            errorHandler({err, dispatch})
        } finally {
            dispatch(setIsLoadingAC({isLoading: false}))
        }
    }
)

const slice = createSlice({
        name: "table",
        initialState: {
            tableInfo: [],
            selectedRows: null,
            totalAmount: null,
        },
        reducers: {
            setAppErrorAC(state, action) {
                state.error = action.payload.error
            },
            changeValueAC(state, action) {
                debugger
                const objIndex = state.tableInfo.findIndex(obj => obj.id === action.payload.id)
                const needRows = state.tableInfo[objIndex].rows
                const cellIndex = needRows.findIndex(cell => cell.prop === action.payload.prop)
                needRows[cellIndex].value = action.payload.value
            },
            changeIsSelectedAC(state, action) {
                const objIndex = state.tableInfo.findIndex(obj => obj.id === action.payload.id)
                state.tableInfo[objIndex].isSelected
                    ? state.selectedRows = state.selectedRows - 1
                    : state.selectedRows = state.selectedRows + 1
                state.tableInfo[objIndex].isSelected = !state.tableInfo[objIndex].isSelected
            },

        },
        extraReducers: builder => {
            builder.addCase(getTableDataFromDbTC.fulfilled, (state, action) => {
                // count the selected rows
                let selectedRowsNumber = 0
                action.payload.data.map(obj => {
                    if (obj.isSelected) {
                        selectedRowsNumber++
                    }
                })
                state.selectedRows = selectedRowsNumber
                //total amount of data
                state.totalAmount = action.payload.data.length * action.payload.data[0].rows.length
                //write the data to the state
                state.tableInfo = action.payload.data
            })
        }
    }
)

export const tableReducer = slice.reducer
export const {changeValueAC, changeIsSelectedAC} = slice.actions