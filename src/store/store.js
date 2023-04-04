import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import todosSlice from "../slices/todosSlice";
import themeSlice from "../slices/themeSlice";
import eventSlice from "../slices/eventSlice";

const persistConfig = {
    key: "root",
    storage,
};

const rootReducer = combineReducers({
    todos: todosSlice.reducer,
    theme: themeSlice.reducer,
    event: eventSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
