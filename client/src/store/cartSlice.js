import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    cart : []
}

const cartSlice = createSlice({
    name : "cartitem",
    initialState : initialValue,
    reducers : {
        getCartItems : (state,action) =>{
            state.cart = [...action.payload]
        }
    }
})

export const {getCartItems} =cartSlice.actions
export default cartSlice.reducer