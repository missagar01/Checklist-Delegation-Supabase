import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchDashboardDataApi } from "../api/dashboardApi";

export const dashboardData = createAsyncThunk( 'fetch/dashboard',async (dashboardType) => {
    const Task = await fetchDashboardDataApi(dashboardType);
   
    return Task;
  }
);




const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    dashboard:[],
    error: null,
    loading: false,
    
   
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(dashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(dashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload;
      })
      .addCase(dashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
  },
});

export default dashboardSlice.reducer;
