import { createSlice } from "@reduxjs/toolkit";


const CollectionSlice = createSlice({
    name:"collection",
    initialState:{
        order:null,
        collection:[],
        loading:false,
        error:null
    },
    reducers:{
        InsertCollection:(state,action)=>{
            const act=action.payload;
            state.order=[...state.order,act];
        },
    },
});

export const {InsertCollection} = CollectionSlice.actions;
export default CollectionSlice.reducer;