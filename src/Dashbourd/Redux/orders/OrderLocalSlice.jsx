import { createSlice  } from "@reduxjs/toolkit";
import supabase from "../../../supabase/supabase";


//   get LocalStorage
const getlocal =()=>{
    try{
        const data = localStorage.getItem("order");
        return data ? JSON.parse(data) : [];
    }catch(error){
        return error.message
    }
}

// set localStorage
const setlocal =(item)=>{
    try{
        const data =localStorage.setItem("order",JSON.stringify(item));
    }catch(error){
        return error.message
    }
}

export const getGuestId = () => {
  let guestId = localStorage.getItem("guest_id");
  if (!guestId) {
    guestId = crypto.randomUUID();
    localStorage.setItem("guest_id", guestId);
  }
  return guestId;
};

 const orderLocalSlice=createSlice({
    name:"orderLocalSlice",
    initialState:{
        cart:getlocal(),

    },
    reducers:{
        // add
      addToCart: (state, action) => {
      const existing = state.cart.find(
        (item) =>
          item.id === action.payload.id &&
          item.color === action.payload.color
      );

      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.cart.unshift(action.payload);
      }

      setlocal(state.cart);
    },

        // remove
        removeCart:(state,action)=>{
            state.cart=state.cart.filter((item)=>item.id !== action.payload);
            setlocal(state.cart)
        },
        // clear
        clearCart:(state,action)=>{
    state.cart=[];
    localStorage.removeItem("order");
        },
        // update
        updateQuantity: (state, action) => {
  const { id, quantity } = action.payload;
  const item = state.cart.find(i => i.id === id);
  if (item) {
    item.quantity = quantity;
  }
  setlocal(state.cart)
}
    }
 })

export const {addToCart ,removeCart ,clearCart,updateQuantity} =orderLocalSlice.actions;

export default orderLocalSlice.reducer ;