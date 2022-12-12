//import { slice } from "./table-reducer";

//const { reducer: tableReducer } = slice;

let startState;

beforeEach(() => {
  startState = {
    tableInfo: [
      {
        id: "01",
        isSelected: true,
        rows: [
          {
            prop: "text11",
            value: "full ",
          },
          {
            prop: "text12",
            value: "[fʊl]",
          },
          {
            prop: "text13",
            value: "полный",
          },
        ],
      },
      {
        id: "02",
        isSelected: false,
        rows: [
          {
            prop: "text21",
            value: "old",
          },
          {
            prop: "text22",
            value: "[ʊld]",
          },
          {
            prop: "text23",
            value: "старый",
          },
        ],
      },
    ],
    selectedRows: 1,
    totalAmount: null,
  };
});
