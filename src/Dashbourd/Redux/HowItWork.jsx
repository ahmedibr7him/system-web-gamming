import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../../supabase/supabase";
// add 

export const  addHowItWork = createAsyncThunk("howitwork/addHowItWork",async(items,{rejectWithValue})=>{
    try{
        const{data,error}= await supabase.from("howitwork").insert(items).select();
        if(error) throw error;
        return data;
    }catch(error){
        return rejectWithValue(error.message)
    }
});

// get

export const  getHowItWork = createAsyncThunk("howitwork/getHowItWork",async(_,{rejectWithValue})=>{
    try{
        const{data,error}= await supabase.from("howitwork").select("*");
        if(error) throw error;
        return data;
    }catch(error){
        return rejectWithValue(error.message)
    }
});

// delete

export const  deleteHowItWork = createAsyncThunk("howitwork/deleteHowItWork",async(id,{rejectWithValue})=>{
    try{
        const{error}= await supabase.from("howitwork").delete().eq("id", id);
        if(error) throw error;
        return id;
    }catch(error){
        return rejectWithValue(error.message)
    }
});


// edite

export const editeHowItWork = createAsyncThunk("howitwork/editeHowItWork" , async({id,title_en,title_ar ,description_en ,description_ar,icone},{rejectWithValue})=>{
    try{
        const {data,error} = await supabase.from("howitwork").update({title_en,title_ar ,description_en ,description_ar,icone}).eq("id",id).select().single();
        if(error) throw error;
        return data;
    }catch(error){
        return rejectWithValue(error.message);
    }
});


const howItWork =createSlice({
    name:"howitwork",
    initialState:{
        data:[],
        loading:false,
        error:null
    },
    extraReducers: (builder)=>{
        // add how it work
        builder.addCase(addHowItWork.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(addHowItWork.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=null;
            state.data.push(action.payload[0])
        })
        .addCase(addHowItWork.rejected , (state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
         // get how it work
        builder.addCase(getHowItWork.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(getHowItWork.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=null;
            state.data=action.payload;
        })
        .addCase(getHowItWork.rejected , (state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
         // edite how it work
        builder.addCase(editeHowItWork.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(editeHowItWork.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=null;
            const index = state.data.findIndex((item)=>item.id ===action.payload.id);
            if(index !== -1){
                state.data[index] = action.payload;

            }
        })
        .addCase(editeHowItWork.rejected , (state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
        // delete
        builder.addCase(deleteHowItWork.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(deleteHowItWork.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=null;
           state.data = state.data.filter((item)=>item.id !== action.payload)
        })
        .addCase(deleteHowItWork.rejected , (state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
    }
})

export default howItWork.reducer;

