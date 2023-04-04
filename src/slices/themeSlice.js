import { createSlice } from "@reduxjs/toolkit";
import { dark, light } from "../style/theme";

// slice 정의
const themeSlice = createSlice({
    name: "theme",
    initialState: {
        theme: { dark, light },
        isDarkMode: false,
        themeMode: "light",
    },
    reducers: {
        toggleTheme: (state) => {
            state.isDarkMode = !state.isDarkMode;
            state.themeMode = state.themeMode === "light" ? "dark" : "light";
        },
    },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice;
