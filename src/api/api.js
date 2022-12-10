import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:4000/",
});

export const tableAPI = {
  getTableData() {
    return instance.get("tableData");
  },
  setTableData(newCell, id) {
    debugger;
    return instance.put(`tableData/${id}`, newCell);
  },
};

export const calendarAPI = {
  getTableData() {
    return instance.get("calendarEvents");
  },
};
