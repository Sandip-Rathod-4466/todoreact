import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { server } from "../App";


const getAllTasksSlice = createSlice({
  name: "tasks",
  initialState: {
    data: [],
    status: "success",
  },
  
//   used for advanced thunk
  extraReducers:(builder)=>{
    builder.addCase(advanceThunk.pending,(state,action)=>{
        state.status = "loading"
    })
    .addCase(advanceThunk.fulfilled,(state,action)=>{
        state.data = action.payload;
        state.status = "success"
    })
    .addCase(advanceThunk.rejected,(state,action)=>{
        state.status = "error"
    })

  }
});

// Advanced Thunks

export const advanceThunk = createAsyncThunk("tasks/fetch", async (userId) => {

  const data = await fetch(`${server}/task/all/${userId}`);
  const res = await data.json();
  const {tasks} = res;
  return tasks;
});

export default getAllTasksSlice.reducer;
