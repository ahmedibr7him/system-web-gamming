import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../supabase/supabase";

// add Message

export const addMessage =createAsyncThunk("contactMessage/addMessage",async(items,{rejectWithValue})=>{
  try{
    const{data,error}=await supabase.from("message contact").insert(items).select("*").order("created_at", { ascending: false });
    if(error) throw error;
    return data;
  }catch(error){
    return rejectWithValue(error.message)
  }
});

// get Message

export const getMessage =createAsyncThunk("contactMessage/gatMessage" , async(_,{rejectWithValue})=>{
  try{
    const{data,error}=await supabase.from("message contact").select("*");
    if(error) throw error;
    return data;
  }catch(error){
    return rejectWithValue(error.message);
  }
});

// delete Message

export const deleteMessage =createAsyncThunk("contactMessage/deleteMessage" , async(id,{rejectWithValue})=>{
  try{
    const{data,error}=await supabase.from("message contact").delete().eq("id",id).select().single();
    if(error) throw error;
    return data;
  }catch(error){
    return rejectWithValue(error.message);
  }
});

// edite

export const editMessage = createAsyncThunk("contactMessage/editMessage",async (id, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("message contact").update({ isread: true }).eq("id", id).select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// slice

const messageSlice = createSlice({
    name:"titleAndDescriptionChoose",
    initialState:{
        dataMessage:[],
        data_filter:[],
        loading:false,
        error:null
    },
    reducers:{
      // filter select
      filterSelect:(state,action)=>{
        state.data_filter =state.dataMessage;
        if(action.payload === "ALL"){
           state.data_filter =state.dataMessage;
        }else if(action.payload === "read"){
           state.data_filter =state.dataMessage.filter((item)=>item.isread);
        }else{
          state.data_filter =state.dataMessage.filter((item)=> !item.isread);
        }
      },
      // filter search
      
     filterSearch: (state, action) => {
  const count = action.payload.trim().toLowerCase();
  if (!count) {
    state.data_filter = state.dataMessage;
    return;
  }

  state.data_filter = state.data_filter.filter((item) =>
    item.first_name.trim().toLowerCase().startsWith(count) ||
    item.secound_name.trim().toLowerCase().startsWith(count) ||
    item.email.trim().toLowerCase().startsWith(count)
  );
}
    },
    extraReducers: (builder)=>{
        // add title and description choose
        builder.addCase(addMessage.pending , (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(addMessage.fulfilled , (state,action)=>{
            state.loading = false;
           state.dataMessage.unshift(...action.payload)
           state.data_filter.unshift(...action.payload)
        }).addCase(addMessage.rejected , (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        // get title and description choose
        builder.addCase(getMessage.pending , (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(getMessage.fulfilled , (state,action)=>{
            state.loading = false;
            state.dataMessage = action.payload;
            state.data_filter = state.dataMessage
        }).addCase(getMessage.rejected , (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        // delete
          .addCase(deleteMessage.pending , (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(deleteMessage.fulfilled , (state,action)=>{
            state.loading = false;
            state.dataMessage = state.dataMessage.filter((item)=>item.id !== action.payload.id);
            state.data_filter = state.data_filter.filter((item) => item.id !== action.payload.id);
        }).addCase(deleteMessage.rejected , (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        // edite
        .addCase(editMessage.pending, (state) => {
  state.loading = true;
})
.addCase(editMessage.fulfilled, (state, action) => {
  state.loading = false;

  state.dataMessage = state.dataMessage.map((item) => {
    if (item.id === action.meta.arg) {
      return { ...item, isread: true };
    }
    return item;
  });

  state.data_filter = state.data_filter.map((item) =>
  item.id === action.meta.arg ? { ...item, isread: true } : item
);
})
.addCase(editMessage.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})
    }
})

export default messageSlice.reducer;
export const {filterSearch ,filterSelect} =messageSlice.actions
