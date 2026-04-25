import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import  supabase  from "../../../supabase/supabase";

// add New Collection
export const AddOrder = createAsyncThunk("orderItem/AddOrder" , async(item,{rejectWithValue})=>{
    const {data , error} = await supabase.from("orders").insert([item]).select().single();
    try{
        if(error) throw error;
        return data;
    }catch(error){
        return rejectWithValue(error.message);
    }
})

// get collection 
 export const GetOrder = createAsyncThunk("orderItem/GetOrder" , async(_,{rejectWithValue})=>{
    const {data , error} = await supabase.from("orders").select("*").order("created_at",{ascending:false});
    try{
        if(error) throw error;
        return data;
    }catch(error){
        return rejectWithValue(error.message);
    }
    });

    // get GetCompletedOrders
    export const GetCompletedOrders = createAsyncThunk( "orders/getCompleted", async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.from("orders").select("total_price, created_at").eq("status", "completed"); 

      if (error) throw error;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

    export const updateOrderStatus = createAsyncThunk("order/updateStatus", async ({ id, status }, { rejectWithValue }) => {
    try {
        const { data, error } = await supabase
            .from("orders")
            .update({ status: status }) // تحديث الحقل status فقط
            .eq("id", id)
            .select()
            .single();
        if (error) throw error;
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

    // delete collection
    export const deleteOrder = createAsyncThunk("orderItem/deleteOrder" , async(id,{rejectWithValue})=>{
        const { error} = await supabase.from("orders").delete().eq("id",id);
        try{
            if(error) throw error;
            return id;
        }catch(error){
            return rejectWithValue(error.message);
        }
    })

const OrderSlice = createSlice({
    name:"orderItem",
    initialState:{
        order:[],
        filteredorder:[],
        completedOrders: [],
         activeFilter: "pending",
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        // add collection
        builder.addCase(AddOrder.pending , (state)=>{
            state.loading = true;
            state.error = null;
            
        })
        .addCase(AddOrder.fulfilled , (state , action)=>{
            state.loading = false;
            state.order.unshift(action.payload);
            state.filteredorder.unshift(action.payload);
        })
        .addCase(AddOrder.rejected , (state , action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        // get collection
        .addCase(GetOrder.pending , (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(GetOrder.fulfilled , (state , action)=>{
            state.loading = false;
            state.order = action.payload;
            state.filteredorder = action.payload;
        })
        .addCase(GetOrder.rejected , (state , action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        // delete collection
        .addCase(deleteOrder.pending , (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteOrder.fulfilled , (state , action)=>{
            state.loading = false;
            state.order = state.order.filter((item)=>item.id !== action.payload);
            state.filteredorder = state.filteredorder.filter((item)=>item.id !== action.payload);
        })
        .addCase(deleteOrder.rejected , (state , action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        // Update Order Status (Confirm / Cancel)
        .addCase(updateOrderStatus.pending , (state)=>{
            state.loading = true;
            state.error = null;
        })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                const index = state.order.findIndex(o => o.id === action.payload.id);
                if (index !== -1) {
                    state.order[index] = action.payload;
                    state.filteredorder[index] = action.payload;
                }
            })
              .addCase(updateOrderStatus.rejected , (state , action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        // GetCompletedOrders
        .addCase(GetCompletedOrders.pending, (state) => {
            state.loading = true;
        })
        .addCase(GetCompletedOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.completedOrders = action.payload; 
        })
        .addCase(GetCompletedOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    
    }

})

export default OrderSlice.reducer;
// export const {filterCategory ,filterBySearch ,selectProduct ,selectProductType ,filterByPrice ,filterById} = CollectionSlice.actions;