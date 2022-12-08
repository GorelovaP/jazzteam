import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {setIsLoadingAC} from "./app-reducer";
import {tableAPI} from "../api/api";
import {errorHandler} from "../common/helpers/errorHendler";


export const getTableDataFromDbTC = createAsyncThunk("table/getTableDataFromDb", async (param, {dispatch}) => {
        dispatch(setIsLoadingAC(true))
        try {
            const res = await tableAPI.getTableData()
            return {data: res.data}
        } catch (err) {
            errorHandler({err, dispatch})
        } finally {
            dispatch(setIsLoadingAC(false))
        }
    }
)

const slice = createSlice({
        name: "table",
        initialState: {
            tableInfo: []
        },
        reducers: {
            setAppErrorAC(state, action) {
                state.error = action.payload.error
            },
            changeEditModeAC(state, action) {
                const objIndex = state.tableInfo.findIndex(obj => obj.id === action.payload.id)
                const needRows = state.tableInfo[objIndex].rows
                const cellIndex = needRows.findIndex(cell => cell.prop === action.payload.prop)
                needRows[cellIndex].isEdit = action.payload.mode
            },
            changeValueAC(state, action) {
                debugger
                const objIndex = state.tableInfo.findIndex(obj => obj.id === action.payload.id)
                const needRows = state.tableInfo[objIndex].rows
                const cellIndex = needRows.findIndex(cell => cell.prop === action.payload.prop)
                needRows[cellIndex].value = action.payload.event.target.value
            }
        },
        extraReducers: builder => {
            builder.addCase(getTableDataFromDbTC.fulfilled, (state, action) => {
                state.tableInfo = action.payload.data
            })
        }
    }
)

export const tableReducer = slice.reducer
export const {changeEditModeAC, changeValueAC} = slice.actions