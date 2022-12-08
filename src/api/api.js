import axios from "axios";

export const tableAPI = {
    getTableData() {
        return axios.get('/db/data.json');
    }
}