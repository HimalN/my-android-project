import {configureStore} from "@reduxjs/toolkit";
import TaskSlice from "../reducers/TaskSlice";
export const store = configureStore({
    reducer: {
        task: TaskSlice,
    }
});

export type AppDispatch = typeof store.dispatch;