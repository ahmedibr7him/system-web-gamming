import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import  supabase  from "../../supabase/supabase";

// add New Collection
export const AddCollection = createAsyncThunk("collection/addCollection" , async({name_en,name_ar ,description_en,description_ar ,price ,number,image,boy,girl,child,latest_collection,release_year,our_best_seller,color,active},{rejectWithValue})=>{
    const user = await supabase.auth.getUser();
    const {data , error} = await supabase.from("products").insert([{name_en,name_ar ,description_en,description_ar  ,price ,number,image,boy,girl,child,latest_collection,our_best_seller,color,active,release_year ,user_id: user.data.user.id}]).select().single();
    try{
        if(error) throw error;
        
        return data;
    }catch(error){
        return rejectWithValue(error.message);
    }
})

// get collection 
 export const GetCollection = createAsyncThunk("collection/getCollection" , async(_,{rejectWithValue})=>{
    const {data , error} = await supabase.from("products").select("*").order("created_at",{ascending:false});
    try{
        if(error) throw error;
        return data;
    }catch(error){
        return rejectWithValue(error.message);
    }
    });

    // delete collection
    export const DeleteCollection = createAsyncThunk("collection/deleteCollection" , async(id,{rejectWithValue})=>{
        const { error} = await supabase.from("products").delete().eq("id",id);
        try{
            if(error) throw error;
            return id;
        }catch(error){
            return rejectWithValue(error.message);
        }
    })
    // edit collection
    export const EditCollection = createAsyncThunk("collection/editCollection" , async({id,name_en,name_ar ,description_en,description_ar  ,price ,number,image,boy,girl,child,latest_collection,our_best_seller,color,release_year,active},{rejectWithValue})=>{
        const { data,error} = await supabase.from("products").update({name_en,name_ar ,description_en,description_ar  ,price ,number,image,boy,girl,child,latest_collection,our_best_seller,color,active,release_year}).eq("id",id).select().single();
        try{
            if(error) throw error;
            return data;
        }catch(error){
            return rejectWithValue(error.message);
        }
    });
    // decreaseStockAsync
  export const decreaseStockAsync = createAsyncThunk(
  "collection/decreaseStockAsync",
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      // 1. نجيب القيمة الحالية
      const { data: product, error: fetchError } = await supabase.from("products").select("number").eq("id", id).single();

      if (fetchError) throw fetchError;
      const newStock = product.number - quantity;

      if (newStock < 0) {
        throw new Error("Not enough stock");
      }
      const { data, error } = await supabase.from("products").update({ number: newStock }).eq("id", id).select().single();

      if (error) throw error;

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
    
  }
);

// increaseStockAsync 
export const increaseStockAsync = createAsyncThunk("collection/increaseStockAsync",async ({ id, quantity }, { rejectWithValue }) => {
    try {
      const { data: product, error: fetchError } = await supabase.from("products").select("number").eq("id", id).single();

      if (fetchError) throw fetchError;
      const newStock = product.number + quantity;

      if (newStock < 0) {
        throw new Error("Not enough stock");
      }

      const { data, error } = await supabase.from("products").update({ number: newStock }).eq("id", id).select().single();

      if (error) throw error;

      return data; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const CollectionSlice = createSlice({
    name:"collection",
    initialState:{
        collection:[],
        filteredCollection:[],
         activeFilter: "all",
        selectedProduct:null,
        loading:false,
        error:null
    },
    reducers:{
        // filter by category and new/old
        filterCategory:(state ,action)=>{
                const {TypeCategories ,TypeNewOld} = action.payload;
                let filtered = [...state.collection];
                if(TypeCategories !== "All"){
                    filtered = filtered.filter((item)=>{
                        if(TypeCategories === "Lastest Collection"){
                            return item.latest_collection;
                        }else if(TypeCategories === "Our Best Sellers"){
                            return item.our_best_seller;
                        }
                        return true;
                    })
                }
                if(TypeNewOld === "newest to Oldest"){
                    filtered = filtered.sort((a,b)=> new Date(b.created_at) - new Date(a.created_at));
                }else if(TypeNewOld === "Oldest to newes"){
                    filtered = filtered.sort((a,b)=> new Date(a.created_at) - new Date(b.created_at));
                }
                state.filteredCollection = filtered;
        },

        // filter by search
        filterBySearch:(state , action)=>{
            const searchTerm = action.payload.toLowerCase();
            state.filteredCollection = state.collection.filter((item)=>{
               return (
  item.name_ar?.toLowerCase().includes(searchTerm) ||
  item.name_en?.toLowerCase().includes(searchTerm) ||
  item.description_ar?.toLowerCase().includes(searchTerm) ||
  item.description_en?.toLowerCase().includes(searchTerm)
);
            })
        },
        // edite product
        selectProduct:(state,action)=>{
            state.selectedProduct =action.payload;
        },
        // filter by boy girl child
        selectProductType: (state, action) => {
  const type = action.payload.toLowerCase();
 state.activeFilter = type;
  if (type === "all") {
    state.filteredCollection = state.collection;
    return;
  }

  state.filteredCollection = state.collection.filter((item) =>
    item[type]
  );
},
//   filter by price and range
       filterByPrice: (state, action) => {
  const price = action.payload;
  if(price === "" || price === null){
    state.filteredCollection = state.collection;
    return;
  }
    state.filteredCollection = state.collection.filter((item) =>item.price <= price);
}
    },
    // extraReducers for async thunks
    extraReducers:(builder)=>{
        // add collection
        builder.addCase(AddCollection.pending , (state)=>{
            state.loading = true;
            state.error = null;
            
        })
        .addCase(AddCollection.fulfilled , (state , action)=>{
            state.loading = false;
            state.collection.unshift(action.payload);
            state.filteredCollection.unshift(action.payload);
             state.selectedProduct = null;
        })
        .addCase(AddCollection.rejected , (state , action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        // get collection
        .addCase(GetCollection.pending , (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(GetCollection.fulfilled , (state , action)=>{
            state.loading = false;
            state.collection = action.payload;
            state.filteredCollection = action.payload;
        })
        .addCase(GetCollection.rejected , (state , action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        // delete collection
        .addCase(DeleteCollection.pending , (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(DeleteCollection.fulfilled , (state , action)=>{
            state.loading = false;
            state.collection = state.collection.filter((item)=>item.id !== action.payload);
            state.filteredCollection = state.filteredCollection.filter((item)=>item.id !== action.payload);
        })
        .addCase(DeleteCollection.rejected , (state , action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        // edit collection
        .addCase(EditCollection.pending , (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(EditCollection.fulfilled , (state , action)=>{
            state.loading = false;
            const index = state.collection.findIndex((item)=>item.id === action.payload.id);
            if(index !== -1){
                state.collection[index] = action.payload;
            }
            const filteredIndex = state.filteredCollection.findIndex((item)=>item.id === action.payload.id);
            if(filteredIndex !== -1){
                state.filteredCollection[filteredIndex] = action.payload;
            }
        })
        .addCase(EditCollection.rejected , (state , action)=>{
            state.loading = false;
            state.error = action.payload;
        })

           .addCase(decreaseStockAsync.pending, (state) => {
      state.loading = true;
    })
    // decreaseStockAsync
    .addCase(decreaseStockAsync.fulfilled, (state, action) => {
  state.loading = false;

})

    .addCase(decreaseStockAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
//    increaseStockAsync
.addCase(increaseStockAsync.pending, (state) => {
    state.loading = true;
    state.error = null;
})
.addCase(increaseStockAsync.fulfilled, (state, action) => {
    state.loading = false;
    // نفس المنطق: بنحدث الرقم الجديد اللي رجع من Supabase
    const index = state.collection.findIndex((item) => item.id === action.payload.id);
    if (index !== -1) {
        state.collection[index].number = action.payload.number;
    }
    const filteredIndex = state.filteredCollection.findIndex((item) => item.id === action.payload.id);
    if (filteredIndex !== -1) {
        state.filteredCollection[filteredIndex].number = action.payload.number;
    }
})
.addCase(increaseStockAsync.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
});
    
    }

})

export default CollectionSlice.reducer;
export const {filterCategory ,filterBySearch ,selectProduct ,selectProductType ,filterByPrice ,filterById} = CollectionSlice.actions;