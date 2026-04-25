import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../../supabase/supabase";
// add 

export const  addLinkContact = createAsyncThunk("LinkContact/addLinkContact",async(items,{rejectWithValue})=>{
    try{
        const{data,error}= await supabase.from("links_data").insert(items).select();
        if(error) throw error;
        return data;
    }catch(error){
        return rejectWithValue(error.message)
    }
});

// get

export const  getLinkContact = createAsyncThunk("LinkContact/getLinkContact",async(_,{rejectWithValue})=>{
    try{
        const{data,error}= await supabase.from("links_data").select("*").order("id", { ascending: false });
        if(error) throw error;
        return data;
    }catch(error){
        return rejectWithValue(error.message)
    }
});

// delete

export const deleteLinkContact = createAsyncThunk("LinkContact/deleteLinkContact",async(id,{rejectWithValue})=>{
    try{
        const{error}= await supabase.from("links_data").delete().eq("id", id);
        if(error) throw error;
        return id;
    }catch(error){
        return rejectWithValue(error.message)
    }
});


// edite

export const editeLinkContact = createAsyncThunk("LinkContact/editeLinkContact" , async({id,link,icone},{rejectWithValue})=>{
    try{
        const {data,error} = await supabase.from("links_data").update({link,icone}).eq("id",id).select().single();
        if(error) throw error;
        return data;
    }catch(error){
        return rejectWithValue(error.message);
    }
});


const linkContact =createSlice({
    name:"LinkContact",
    initialState:{
        data:[],
        loading:false,
        error:null
    },
    extraReducers: (builder)=>{
        // add message
        builder.addCase(addLinkContact.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(addLinkContact.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=null;
            state.data.push(action.payload)
        })
        .addCase(addLinkContact.rejected , (state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
         // get message 
        builder.addCase(getLinkContact.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getLinkContact.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=null;
            state.data=action.payload;
        })
        .addCase(getLinkContact.rejected , (state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
         // edite message
        builder.addCase(editeLinkContact.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(editeLinkContact.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=null;
            const index = state.data.findIndex((item)=>item.id ===action.payload);
            if(index !== -1){
                state.data[index] = action.payload;

            }
        })
        .addCase(editeLinkContact.rejected , (state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
        // delete message
        builder.addCase(deleteLinkContact.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(deleteLinkContact.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=null;
           state.data = state.data.filter((item)=>item.id !== action.payload)
        })
        .addCase(deleteLinkContact.rejected , (state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
    }
})

export default linkContact.reducer;


