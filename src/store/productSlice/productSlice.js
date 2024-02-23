import { createSlice } from '@reduxjs/toolkit'  

const initialState = {
    name: 'product',
    products: {}
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        allProduct: (state, action) => {
            const products = action.payload
            state.products = products
        }
    }

})

export const productActions = productSlice.actions;
export default productSlice;