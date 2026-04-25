import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import  supabase  from "../../../supabase/supabase";

// add New Collection
export const AddOrderItem = createAsyncThunk("orderItem/AddOrderItem" , async(item,{rejectWithValue})=>{

    try{
            const {data , error} = await supabase.from("order_items").insert(item).select();
        if(error) throw error;
        return data;
    }catch(error){
        return rejectWithValue(error.message);
    }
})

// get collection 
 export const GetOrderItem = createAsyncThunk("orderItem/GetOrderItem" , async(_,{rejectWithValue})=>{
    const {data , error} = await supabase.from("order_items").select("*").limit(10).order("created_at",{ascending:false});
    try{
        if(error) throw error;
        return data;
    }catch(error){
        return rejectWithValue(error.message);
    }
    });

    // delete collection
   export const deleteOrderItemsByNumber = createAsyncThunk(
  "orderItem/deleteOrderItemsByNumber",
  async (orderNumber, { rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from("order_items")
        .delete()
        .eq("order_num", orderNumber); 

      if (error) throw error;
      return orderNumber;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const returnOrderItem = createAsyncThunk(
  "orderItem/returnOrderItem",
  async ({ orderNumber }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("order_items")
        .update({ "return": "returned" }) // ✅ نضعها بين علامات تنصيص لتجنب مشاكل الكلمات المحجوزة
        .eq("order_num", orderNumber) 
        .select();

      if (error) throw error;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const CollectionSlice = createSlice({
    name:"orderItem",
    initialState:{
        orderItem:[],
        filteredorderItem:[],
         activeFilter: "pending",
        loading:false,
        error:null
    },
    reducers:{
//         // filter by category and new/old
//         filterCategory:(state ,action)=>{
//                 const {TypeCategories ,TypeNewOld} = action.payload;
//                 let filtered = [...state.collection];
//                 if(TypeCategories !== "All"){
//                     filtered = filtered.filter((item)=>{
//                         if(TypeCategories === "Lastest Collection"){
//                             return item.latest_collection;
//                         }else if(TypeCategories === "Our Best Sellers"){
//                             return item.our_best_seller;
//                         }
//                         return true;
//                     })
//                 }
//                 if(TypeNewOld === "newest to Oldest"){
//                     filtered = filtered.sort((a,b)=> new Date(b.created_at) - new Date(a.created_at));
//                 }else if(TypeNewOld === "Oldest to newes"){
//                     filtered = filtered.sort((a,b)=> new Date(a.created_at) - new Date(b.created_at));
//                 }
//                 state.filteredCollection = filtered;
//         },

//         // filter by search
//         filterBySearch:(state , action)=>{
//             const searchTerm = action.payload.toLowerCase();
//             state.filteredCollection = state.collection.filter((item)=>{
//                return (
//   item.name_ar?.toLowerCase().includes(searchTerm) ||
//   item.name_en?.toLowerCase().includes(searchTerm) ||
//   item.description_ar?.toLowerCase().includes(searchTerm) ||
//   item.description_en?.toLowerCase().includes(searchTerm)
// );
//             })
//         },
//         // edite product
//         selectProduct:(state,action)=>{
//             state.selectedProduct =action.payload;
//         },
//         // filter by boy girl child
//         selectProductType: (state, action) => {
//   const type = action.payload.toLowerCase();
//  state.activeFilter = type;
//   if (type === "all") {
//     state.filteredCollection = state.collection;
//     return;
//   }

//   state.filteredCollection = state.collection.filter((item) =>
//     item[type]
//   );
// },
// //   filter by price and range
//        filterByPrice: (state, action) => {
//   const price = action.payload;
//   if(price === "" || price === null){
//     state.filteredCollection = state.collection;
//     return;
//   }
//     state.filteredCollection = state.collection.filter((item) =>item.price <= price);
// },
    },
    // extraReducers for async thunks
    extraReducers:(builder)=>{
        // add collection
        builder.addCase(AddOrderItem.pending , (state)=>{
            state.loading = true;
            state.error = null;
            
        })
        .addCase(AddOrderItem.fulfilled , (state , action)=>{
  state.loading = false;

  if (Array.isArray(action.payload)) {
    state.orderItem.unshift(...action.payload);
    state.filteredorderItem.unshift(...action.payload);
  } else {
    state.orderItem.unshift(action.payload);
    state.filteredorderItem.unshift(action.payload);
  }
})
        .addCase(AddOrderItem.rejected , (state , action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        // get collection
        .addCase(GetOrderItem.pending , (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(GetOrderItem.fulfilled , (state , action)=>{
            state.loading = false;
            state.orderItem = action.payload;
            state.filteredorderItem = action.payload;
        })
        .addCase(GetOrderItem.rejected , (state , action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        // delete collection
        .addCase(deleteOrderItemsByNumber.pending , (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteOrderItemsByNumber.fulfilled, (state, action) => {
  state.loading = false;
  // حذف كل العناصر التي تملك نفس رقم الطلب من الـ state
  state.orderItem = state.orderItem.filter((item) => item.order_num !== action.payload);
  state.filteredorderItem = state.filteredorderItem.filter((item) => item.order_num !== action.payload);
})
        .addCase(deleteOrderItemsByNumber.rejected , (state , action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        // ... داخل الـ extraReducers ...

// Return Order Item
.addCase(returnOrderItem.pending, (state) => {
    state.loading = true;
    state.error = null;
})
.addCase(returnOrderItem.fulfilled, (state, action) => {
    state.loading = false;
    // بما أن التحديث يعيد مصفوفة من العناصر المحدثة
    const updatedItems = action.payload; 
    
    updatedItems.forEach(updatedItem => {
        const index = state.orderItem.findIndex((item) => item.id === updatedItem.id);
        if (index !== -1) {
            state.orderItem[index] = updatedItem;
            state.filteredorderItem[index] = updatedItem;
        }
    });
})
.addCase(returnOrderItem.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
})
    
    }

})

export default CollectionSlice.reducer;
// export const {filterCategory ,filterBySearch ,selectProduct ,selectProductType ,filterByPrice ,filterById} = CollectionSlice.actions;