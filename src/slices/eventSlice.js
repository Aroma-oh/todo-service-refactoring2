import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    selectedTag: "",
    // hideDoneTask: false,
    target: null,
    type: "create",
};

const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.isOpen = !state.isOpen;
            state.target = action.payload ?? null;
        },
        modalType: (state, action) => {
            state.type = action.payload ?? "create";
        },
        // hideDoneTask: (state) => {
        //     state.hideDoneTask = !state.hideDoneTask;
        // },
    },
});

export const { openModal, modalType, hideDoneTask } = eventSlice.actions;
export default eventSlice;
