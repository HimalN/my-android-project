
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import  Tasks  from "../model/Task";

export const initialState: Tasks[] = [];

const api = axios.create({
  baseURL: "http://127.0.0.1:3003",
  headers: {
    'Content-Type': 'application/json',
  },
});

export const addTask = createAsyncThunk(
  "Task/addTask",
  async (task: Tasks) => {
    try {
      console.log("task", task);

      const response = await api.post("/task/add", task);
      console.log("Response:", response);
      alert("Task Added Successfully");
      return response.data.message;
    } catch (error: any) {
      alert("Failed to add Task");
      console.log("Error:", error);
      if (error.response) {
        console.log("Response Error:", error.response.data);
      } else if (error.request) {
        console.log("Request Error:", error.request);
      } else {
        console.log("Error Message:", error.message);
      }
    }
  }
);
export const deleteTask = createAsyncThunk(
  "Task/deleteTask",
  async (id: string) => {
    try {
      console.log("id", id);
      const response = await api.delete(`/task/delete/${id}`);
      return response.data;
    } catch (error) {
      return console.log("error", error);
    }
  }
);

export const getTask = createAsyncThunk("Task/getTask", async () => {
  try {
    const response = await api.get("/Task/get");
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    return console.log("error", error);
  }
});

const TaskSlice = createSlice({
  name: "Task",
  initialState,
  reducers: {
    saveTasks: (state, action: PayloadAction<Tasks>) => {
      state.push(action.payload);
    },
    deleteTask(state, action: PayloadAction<string>) {

    }
  },
  extraReducers: (builder) => {

    // Add Task
    builder
      .addCase(addTask.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        console.log("Failed to add Task", action.payload);
      })
      .addCase(addTask.pending, (state, action) => {
        console.log("Adding Task", action.payload);
      });

      // Delete Task
    builder
      .addCase(deleteTask.fulfilled, (state, action) => {
        // state = state.filter((Task) => Task.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        console.log("Failed to delete Task", action.payload);
      })
      .addCase(deleteTask.pending, (state, action) => {
        console.log("Deleting Task", action.payload);
      });
      // Get Task
    builder
      .addCase(getTask.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(getTask.rejected, (state, action) => {
        console.log("Failed to get Task", action.payload);
      })
      .addCase(getTask.pending, (state, action) => {
        console.log("Getting Task", action.payload);
      });
  },
});

export default TaskSlice.reducer;
