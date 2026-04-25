import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../../supabase/supabase";


// Define the initial state of the login slice



export const signUp =createAsyncThunk("auth/signUp" , async({name ,email ,password },{rejectWithValue})=>{
    const {data ,error} =await supabase.auth.signUp({email ,password , options: {
        data: {
          name,
          role:"user"
        },
      },});
    try{
        if(error) throw error;
       if(data.user){
         await supabase.from("users").upsert([{ id: data.user.id, email, name, role: "user" }]);
         return {
    id: data.user.id,
    email: data.user.email,
      name: name,
    role: "user"
  };
       }
    }catch(error){
        return rejectWithValue(error.message);
    }
})

// login user
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;
      const { data: userDB, error: dbError } = await supabase
        .from("users")
        .select("*")
        .eq("id", authData.user.id)
        .maybeSingle();

      
      return {
        id: authData.user.id,
        email: authData.user.email,
        name: userDB?.name || authData.user.user_metadata?.name || "User",
        role: userDB?.role || "user",
      };

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Logout user
export const logout = createAsyncThunk("auth/logout" , async(_,{rejectWithValue})=>{
    const {error} =await supabase.auth.signOut();
    try{
        if(error) throw error;
        return null;
    }catch(error){
        return rejectWithValue(error.message);
    }
});

// number of users
export const getUsersCount = createAsyncThunk(
  "auth/getUsersCount",
  async (_, { rejectWithValue }) => {
    try {
      const { count, error } = await supabase.from("users").select("*", { count: "exact", head: true }); 

      if (error) throw error;

      return count;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: null,
  numberOfUsers: 0,
  loading: true,
  error: null,
};

const loginSlice = createSlice({
  name: "auth",
  initialState,
    reducers: {
        // setUser
        setUser : (state,action)=>{
            state.user = action.payload;
            state.loading=false
        }
    },
extraReducers: (builder)=>{
    builder
    .addCase(signUp.pending ,(state)=>{
        state.loading =true;
        state.error =null;
    })
    .addCase(signUp.fulfilled ,(state,action)=>{
        state.loading =false;
        state.user =action.payload;
    })
    .addCase(signUp.rejected ,(state,action)=>{
        state.loading =false;
        state.error =action.payload;
    })
    // login
    .addCase(login.pending ,(state)=>{
        state.loading =true;
        state.error =null;
    })
    .addCase(login.fulfilled ,(state,action)=>{
        state.loading =false;
        state.user =action.payload;
    })
    .addCase(login.rejected ,(state,action)=>{
        state.loading =false;
        state.error =action.payload;
    })
    // logout
    .addCase(logout.pending ,(state)=>{
        state.loading =true;
        state.error =null;
    })
    .addCase(logout.fulfilled ,(state)=>{
        state.loading =false;
        state.user =null;
        state.error =null;
    })
    .addCase(logout.rejected ,(state,action)=>{
        state.loading =false;
        state.user =null;
        state.error =action.payload;
    })
    // getUsersCount
    .addCase(getUsersCount.pending ,(state)=>{
        state.loading =true;
        state.error =null;
    })
    .addCase(getUsersCount.fulfilled ,(state,action)=>{
        state.loading =false;
        state.numberOfUsers =action.payload;
    })
    .addCase(getUsersCount.rejected ,(state,action)=>{
        state.loading =false;
        state.error =action.payload;
    })
}});

export const {setUser} = loginSlice.actions;
export default loginSlice.reducer;