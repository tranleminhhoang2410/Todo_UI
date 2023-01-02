import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";

const rootReducer = {
  todos: todoReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});
