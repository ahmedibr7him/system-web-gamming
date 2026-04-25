import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import  supabase  from "../../supabase/supabase";

// get about data
export const getUsers = createAsyncThunk("users/getusers" , async(_,{rejectWithValue})=>{
    try{
        const {data,error} = await supabase.from("users").select("*");
        if(error) throw error;
        return data;
    }catch(error){
        return rejectWithValue(error.message);
    }
});

// delete about data 
export const deleteusers = createAsyncThunk("users/deleteusers" , async(id,{rejectWithValue})=>{
    try{
        const {error} = await supabase.from("users").delete().eq("id",id);
        if(error) throw error;
        return id;
    }catch(error){
        return rejectWithValue(error.message);
    }
});

export const updateUserRole = createAsyncThunk(
  "users/updateRole",
  async ({ id, role }, { rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from("users")
        .update({ role })
        .eq("id", id);

      if (error) throw error;

      return { id, role };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const users = createSlice({
    name:"users",
    initialState:{
        users:[],
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers: (builder)=>{
        // get about
        builder
        .addCase(getUsers.pending , (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(getUsers.fulfilled , (state,action)=>{
            state.loading = false;
            state.users = action.payload;
        }).addCase(getUsers.rejected , (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        // delete about
        .addCase(deleteusers.pending , (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(deleteusers.fulfilled , (state,action)=>{
            state.loading = false;
            state.users = state.users.filter((item)=>item.id !== action.payload)
        }).addCase(deleteusers.rejected , (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        // edite
   .addCase(updateUserRole.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(updateUserRole.fulfilled, (state, action) => {
  state.loading = false;
  state.users = state.users.map((user) =>
    user.id === action.payload.id
      ? { ...user, role: action.payload.role }
      : user
  );
})
.addCase(updateUserRole.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
});

    }
})
    export default users.reducer;