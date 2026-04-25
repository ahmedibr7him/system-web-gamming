import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../../supabase/supabase";
// add 

export const  addDataContact = createAsyncThunk("dataContact/addDataContact",async(items,{rejectWithValue})=>{
    try{
        const{data,error}= await supabase.from("datacontact").insert(items).select();
        if(error) throw error;
        return data;
    }catch(error){
        return rejectWithValue(error.message)
    }
});

// get

export const  getDataContact = createAsyncThunk("dataContact/getDataContact",async(_,{rejectWithValue})=>{
    try{
        const{data,error}= await supabase.from("datacontact").select("*").order("id", { ascending: false });
        if(error) throw error;
        return data;
    }catch(error){
        return rejectWithValue(error.message)
    }
});

// delete

export const  deleteDataContact = createAsyncThunk("dataContact/deleteDataContact",async(id,{rejectWithValue})=>{
    try{
        const{error}= await supabase.from("datacontact").delete().eq("id", id);
        if(error) throw error;
        return id;
    }catch(error){
        return rejectWithValue(error.message)
    }
});


// edite

export const editeDataContact = createAsyncThunk("dataContact/editeDataContact" , async({id,title_en,title_ar,contact,icone},{rejectWithValue})=>{
    try{
        const {data,error} = await supabase.from("datacontact").update({title_en,title_ar ,contact,icone}).eq("id",id).select().single();
        if(error) throw error;
        return data;
    }catch(error){
        return rejectWithValue(error.message);
    }
});


const dataContact =createSlice({
    name:"dataContact",
    initialState:{
        data:[],
        loading:false,
        error:null
    },
    extraReducers: (builder)=>{
        // add message
        builder.addCase(addDataContact.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(addDataContact.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=null;
            state.data.push(action.payload)
        })
        .addCase(addDataContact.rejected , (state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
         // get message 
        builder.addCase(getDataContact.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getDataContact.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=null;
            state.data=action.payload;
        })
        .addCase(getDataContact.rejected , (state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
         // edite message
        builder.addCase(editeDataContact.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(editeDataContact.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=null;
            const index = state.data.findIndex((item)=>item.id ===action.payload.id);
            if(index !== -1){
                state.data[index] = action.payload;

            }
        })
        .addCase(editeDataContact.rejected , (state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
        // delete message
        builder.addCase(deleteDataContact.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(deleteDataContact.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=null;
           state.data = state.data.filter((item)=>item.id !== action.payload)
        })
        .addCase(deleteDataContact.rejected , (state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
    }
})

export default dataContact.reducer;

