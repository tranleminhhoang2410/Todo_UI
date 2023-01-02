import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Add, Delete, GetAll, Update } from "../api/todoApi";

export const getTodosAsync = createAsyncThunk('todos/getTodosAsync', async () => {
  const response = await GetAll();
  return response;
});

export const addTodosAsync = createAsyncThunk('todos/addTodoAsync', async (payload) => {
  const response = await Add({ name: payload.name, isCompleted: payload.isCompleted });
  return response;
})

export const deleteTodosAsync = createAsyncThunk('todos/deleteTodosAsync', async (id) => {
  const response = await Delete(id);
  return response;
})

export const completeTodosAsync = createAsyncThunk('todos/completeTodosAsync', async (payload) => {
  await Update(payload.id, { id: payload.id, name: payload.name, isCompleted: payload.isCompleted });
  return { id: payload.id, name: payload.name, isCompleted: payload.isCompleted };
})

export const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  extraReducers: {
    [getTodosAsync.pending]: (state, action) => {
      console.log('fetching data...')
    },
    [getTodosAsync.fulfilled]: (state, action) => {
      console.log('fetching data successfully !');
      return action.payload;
    },
    [addTodosAsync.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [deleteTodosAsync.fulfilled]: (state, action) => {
      const index = state.findIndex(todo => todo.id === action.payload.id);
      state.splice(index, 1);
    },
    [completeTodosAsync.fulfilled]: (state, action) => {
      const index = state.findIndex(todo => todo.id === action.payload.id);
      state[index].isCompleted = action.payload.isCompleted;
    }
  }
});


export default todoSlice.reducer;
