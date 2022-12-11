import axios from "axios";

export const instance = axios.create({
    baseURL: "http://localhost:4000/",
});

export const tableAPI = {
    getTableData() {
        return instance.get("tableData");
    },
    setTableData(newCell, id) {
        return instance.put(`tableData/${id}`, newCell);
    },
};

export const calendarAPI = {
    getNotesWithLimits(more, less) {
        return instance.get(`calendarNotes?date_gte=${more}&date_lte=${less}`);
    },
    getAllNotes() {
        return instance.get(`calendarNotes`);
    },
    setNewNote(newNote) {
        return instance.post(`calendarNotes`, newNote);
    },
    changeNote(newNote, id) {
        return instance.put(`calendarNotes/${id}`, newNote);
    }
};
