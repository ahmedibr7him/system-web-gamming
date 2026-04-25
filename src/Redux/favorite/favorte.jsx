import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import  supabase  from "../../supabase/supabase";

// add New Collection
export const addfavorite = createAsyncThunk("favorite/addfavorite",async (favoriteData, { rejectWithValue }) => {
    try {
const { data, error } = await supabase.from("favorites").insert([favoriteData]).select().single();

if (error) throw error;

return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// get collection 
export const getfavorite = createAsyncThunk(
  "favorite/getfavorite",
  async (guestId, { rejectWithValue }) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      let query = supabase.from("favorites").select("*");

      if (user) {
        query = query.or(`user_id.eq.${user.id},favorite_id.eq.${guestId}`);
      } else {
        query = query.eq("favorite_id", guestId);
      }

      const { data, error } = await query.order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

    // delete collection
    export const deletefavorite = createAsyncThunk("favorite/deletefavorite" , async(id,{rejectWithValue})=>{
        const { error} = await supabase.from("favorites").delete().eq("id",id);
        try{
            if(error) throw error;
            return id;
        }catch(error){
            return rejectWithValue(error.message);
        }
    })


const favoriteSlice = createSlice({
    name:"favorite",
    initialState:{
        favorites:[],
         activeFilter: "all",
        loading:false,
        error:null
    },
    reducers:{},
       
    // extraReducers for async thunks
    extraReducers:(builder)=>{
        // add collection
        builder.addCase(addfavorite.pending , (state)=>{
            state.loading = true;
            state.error = null;
            
        })
 .addCase(addfavorite.fulfilled , (state , action)=>{
  state.loading = false;

  if (action.payload) {
    const index = state.favorites.findIndex((item) => item.product_id === action.payload.product_id);

    if (index === -1) {
      state.favorites.unshift(action.payload);
    }
  }
})
        .addCase(addfavorite.rejected , (state , action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        // get collection
        .addCase(getfavorite.pending , (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(getfavorite.fulfilled , (state , action)=>{
            state.loading = false;
            state.favorites = action.payload;
        })
        .addCase(getfavorite.rejected , (state , action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        // delete collection
        .addCase(deletefavorite.pending , (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(deletefavorite.fulfilled , (state , action)=>{
            state.loading = false;
            state.favorites = state.favorites.filter((item)=>item.id !== action.payload);
        })
        .addCase(deletefavorite.rejected , (state , action)=>{
            state.loading = false;
            state.error = action.payload;
        })    
    }

})

export default favoriteSlice.reducer;
