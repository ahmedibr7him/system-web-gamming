import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../supabase/supabase";

// add Message

export const addfeedback =createAsyncThunk("review/addfeedback",async(items,{rejectWithValue})=>{
  try{
    const{data,error}=await supabase.from("feedback").insert(items).select("*").order("created_at", { ascending: false });
    if(error) throw error;
    return data;
  }catch(error){
    return rejectWithValue({
  message: error.message,
  details: error.details,
  hint: error.hint
})
  }
});

// get Message

export const getfeedback =createAsyncThunk("review/getfeedback" , async(_,{rejectWithValue})=>{
  try{
    const{data,error}=await supabase.from("feedback").select("*").order("created_at", { ascending: false });
    if(error) throw error;
    return data;
  }catch(error){
    return rejectWithValue({
  message: error.message,
  details: error.details,
  hint: error.hint
})
  }
});

// delete Message

export const deletefeedback =createAsyncThunk("review/deletefeedback" , async(item,{rejectWithValue})=>{
  try{

       let imagePath = null;

      if (item.image) {
        imagePath = item.image.split("/").pop().split("?")[0];
      }

      // 2. 🗑️ امسح الصورة من storage
      if (imagePath) {
        const { error: storageError } = await supabase.storage
          .from("photo_feedback")
          .remove([imagePath]);

        if (storageError) throw storageError;
      }
    const{data,error}=await supabase.from("feedback").delete().eq("id",item.id).select().single();
    if(error) throw error;
    return data;
  }catch(error){
    return rejectWithValue({
  message: error.message,
  details: error.details,
  hint: error.hint
})
  }
});

// edite

export const editfeedback = createAsyncThunk("review/editfeedback",async (items, { rejectWithValue }) => {
    try {
      const {id,...dataToUpdate} =items;
      const { data, error } = await supabase
        .from("feedback").update(dataToUpdate).eq("id", id).select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      return rejectWithValue({
  message: error.message,
  details: error.details,
  hint: error.hint
})
    }
  }
);


// slice

const reviewSlice = createSlice({
    name:"review",
    initialState:{
        dataFeedback:[],
        data_filter:[],
        loading:false,
        error:null
    },
    reducers:{
      // filter select
      filterSelect:(state,action)=>{
        state.data_filter =state.dataFeedback;
        if(action.payload === "ALL"){
           state.data_filter =state.dataFeedback;
        }else if(action.payload === "read"){
           state.data_filter =state.dataFeedback.filter((item)=>item.isread);
        }else{
          state.data_filter =state.dataFeedback.filter((item)=> !item.isread);
        }
      },
      // filter search
      
     filterSearch: (state, action) => {
  const count = action.payload.trim().toLowerCase();
  if (!count) {
    state.data_filter = state.dataFeedback;
    return;
  }

  state.data_filter = state.dataFeedback.filter((item) =>
    item.first_name?.trim().toLowerCase()?.startsWith(count) ||
    item.secound_name?.trim().toLowerCase()?.startsWith(count) ||
    item.email?.trim().toLowerCase()?.startsWith(count)
  );
}
    },
    extraReducers: (builder)=>{
        // add title and description choose
        builder.addCase(addfeedback.pending , (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(addfeedback.fulfilled , (state,action)=>{
            state.loading = false;
           state.dataFeedback.unshift(...action.payload)
           state.data_filter.unshift(...action.payload)
        }).addCase(addfeedback.rejected , (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        // get title and description choose
        builder.addCase(getfeedback.pending , (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(getfeedback.fulfilled , (state,action)=>{
            state.loading = false;
            state.dataFeedback = action.payload;
            state.data_filter = state.dataFeedback
        }).addCase(getfeedback.rejected , (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        // delete
          .addCase(deletefeedback.pending , (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(deletefeedback.fulfilled , (state,action)=>{
            state.loading = false;
            state.dataFeedback = state.dataFeedback.filter((item)=>item.id !== action.payload.id);
            state.data_filter = state.data_filter.filter((item) => item.id !== action.payload.id);
        }).addCase(deletefeedback.rejected , (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        // edite
        .addCase(editfeedback.pending, (state) => {
  state.loading = true;
})
.addCase(editfeedback.fulfilled, (state, action) => {
  state.loading = false;

  state.dataFeedback = state.dataFeedback.map((item) => {
    if (item.id === action.payload.id) {
      return  action.payload;;
    }
    return item;
  });

  state.data_filter = state.data_filter.map((item) =>
  item.id === action.payload.id ?action.payload : item
);
})
.addCase(editfeedback.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})
    }
})

export default reviewSlice.reducer;
export const {filterSearch ,filterSelect} =reviewSlice.actions
