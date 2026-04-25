import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import  supabase  from "../../supabase/supabase";
// add about slice

export const addAbout =createAsyncThunk("about/addAbout" , async(items,{rejectWithValue})=>{
    try{
        // add about data to database
        const {data,error} = await supabase.from("titleandnumberchoose").insert(items).select();
        if(error) throw error;
        return data;
    }catch(error){
        return rejectWithValue(error.message);
    }
});

// get about data
export const getAbout = createAsyncThunk("about/getAbout" , async(_,{rejectWithValue})=>{
    try{
        const {data,error} = await supabase.from("titleandnumberchoose").select("*");
        if(error) throw error;
        return data;
    }catch(error){
        return rejectWithValue(error.message);
    }
});

// edite about data 
export const editAbout = createAsyncThunk("about/editAbout" , async({id,title_ar,title_en ,number},{rejectWithValue})=>{
    try{
        const {data,error} = await supabase.from("titleandnumberchoose").update({title_en,title_ar , number}).eq("id",id).select().single();
        if(error) throw error;
        return data;
    }catch(error){
        return rejectWithValue(error.message);
    }
});


const AboutSlice = createSlice({
    name:"about",
    initialState:{
        about:[],
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers: (builder)=>{
        // add about
        builder.addCase(addAbout.pending , (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(addAbout.fulfilled , (state,action)=>{
            state.loading = false;
            state.about.push(action.payload);
        }).addCase(addAbout.rejected , (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        // get about
        .addCase(getAbout.pending , (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(getAbout.fulfilled , (state,action)=>{
            state.loading = false;
            state.about = action.payload;
        }).addCase(getAbout.rejected , (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        // edite about
        .addCase(editAbout.pending , (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(editAbout.fulfilled , (state,action)=>{
            state.loading = false;
            const index = state.about.findIndex((item)=>item.id === action.payload.id);
            if(index !== -1){
                state.about[index] = action.payload;
            }
        }).addCase(editAbout.rejected , (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
})
    export default AboutSlice.reducer;