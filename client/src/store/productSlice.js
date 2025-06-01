import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    allCategory : [],
    allSubcategory : [],
    allProduct : []
}
console.log(initialValue.allCategory);

const productSlice = createSlice({
    name : "product",
    initialState : initialValue,
    reducers : {
        setAllCategory : (state,action)=>{
            state.allCategory = [...action.payload]
        },
    }
})

export const {setAllCategory} = productSlice.actions
export default productSlice.reducer