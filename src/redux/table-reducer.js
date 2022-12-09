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
                const objIndex = state.tableInfo.findIndex(obj => obj.id === action.payload.id)
                const needRows = state.tableInfo[objIndex].rows
                const cellIndex = needRows.findIndex(cell => cell.prop === action.payload.prop)
                needRows[cellIndex].value = action.payload.event
            },
            changeIsSelectedAC(state, action) {
                debugger
                const objIndex = state.tableInfo.findIndex(obj => obj.id === action.payload.id)
                state.tableInfo[objIndex].isSelected = !state.tableInfo[objIndex].isSelected
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
export const {changeEditModeAC, changeValueAC, changeIsSelectedAC} = slice.actions