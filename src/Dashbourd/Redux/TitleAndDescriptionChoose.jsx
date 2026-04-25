import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../../supabase/supabase";
// add title and description choose slice
export const addTitleAndDescriptionChoose = createAsyncThunk("titleAndDescriptionChoose/addTitleAndDescriptionChoose" , async(items,{rejectWithValue})=>{
    try{
        // add title and description choose data to database
        const {data,error} = await supabase.from("titleanddescriptionchoose").insert(items).select();
        if(error) throw error;
        return data;
    }catch(error){
        return rejectWithValue(error.message);
    }
});
//  get title and description choose data
export const getTitleAndDescriptionChoose = createAsyncThunk("titleAndDescriptionChoose/getTitleAndDescriptionChoose" , async(_,{rejectWithValue})=>{
    try{
        const {data,error} = await supabase.from("titleanddescriptionchoose").select("*");
        if(error) throw error;
        return data;
    }catch(error){
        return rejectWithValue(error.message);
    }
});

// edite title and description choose data 
export const editTitleAndDescriptionChoose = createAsyncThunk("titleAndDescriptionChoose/editTitleAndDescriptionChoose" , async({id,title_en,title_ar,description_en ,description_ar},{rejectWithValue})=>{
    try{
        const {data,error} = await supabase.from("titleanddescriptionchoose").update({title_en,title_ar,description_en , description_ar}).eq("id",id).select().single();
        if(error) throw error;
        return data;
    }catch(error){
        return rejectWithValue(error.message);
    }
});

// delete 
 export const deleteTitleAndDescriptionChoose = createAsyncThunk("titleAndDescriptionChoose/deleteTitleAndDescriptionChoose" ,async(id,{rejectWithValue})=>{
    try{
        const {error} =await supabase.from("titleanddescriptionchoose").delete().eq("id",id).single();
        if(error) throw error;
        return id
    }catch(error){
       return rejectWithValue(error.message);
    }
 })
// 
const TitleAndDescriptionChooseSlice = createSlice({
    name:"titleAndDescriptionChoose",
    initialState:{
        aboutDescription:[],
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers: (builder)=>{
        // add title and description choose
        builder.addCase(addTitleAndDescriptionChoose.pending , (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(addTitleAndDescriptionChoose.fulfilled , (state,action)=>{
            state.loading = false;
           state.aboutDescription= [ ...state.aboutDescription, ...action.payload];
        }).addCase(addTitleAndDescriptionChoose.rejected , (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        // get title and description choose
        builder.addCase(getTitleAndDescriptionChoose.pending , (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(getTitleAndDescriptionChoose.fulfilled , (state,action)=>{
            state.loading = false;
            state.aboutDescription = action.payload;
        }).addCase(getTitleAndDescriptionChoose.rejected , (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        // edit title and description choose
        .addCase(editTitleAndDescriptionChoose.pending , (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(editTitleAndDescriptionChoose.fulfilled , (state,action)=>{
            state.loading = false;
            const index = state.aboutDescription.findIndex(item=>item.id === action.payload.id);
            if(index !== -1){
                state.aboutDescription[index] = action.payload;
            }
        }).addCase(editTitleAndDescriptionChoose.rejected , (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        // delete
                .addCase(deleteTitleAndDescriptionChoose.pending , (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(deleteTitleAndDescriptionChoose.fulfilled , (state,action)=>{
            state.loading = false;
            state.aboutDescription = state.aboutDescription.filter((item)=>item.id !== action.payload);
        }).addCase(deleteTitleAndDescriptionChoose.rejected , (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export default TitleAndDescriptionChooseSlice.reducer;