import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../../supabase/supabase";


export const AddTarget = createAsyncThunk(
  "target/AddTarget",
  async (item, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.from("targets").insert(item).select().single();

      if (error) throw error;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const GetTargets = createAsyncThunk(
  "target/GetTargets",
  async (_, { rejectWithValue }) => {
    try {const { data, error } = await supabase.from("targets").select("*").order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const DeleteTarget = createAsyncThunk(
  "target/DeleteTarget",
  async (id, { rejectWithValue }) => {
    try {
      const { error } = await supabase.from("targets").delete().eq("id", id);
      if (error) throw error;
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const targetSlice = createSlice({
  name: "target",
  initialState: {
    targets: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(AddTarget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddTarget.fulfilled, (state, action) => {
        state.loading = false;
        state.targets.unshift(action.payload);
      })
      .addCase(AddTarget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET
      .addCase(GetTargets.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetTargets.fulfilled, (state, action) => {
        state.loading = false;
        state.targets = action.payload;
      })
      .addCase(GetTargets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(DeleteTarget.pending, (state) => {
        state.loading = true;
      })
      .addCase(DeleteTarget.fulfilled, (state, action) => {
        state.loading = false;
        state.targets = state.targets.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(DeleteTarget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default targetSlice.reducer;