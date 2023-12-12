import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name : "cart",
    initialState : {
        items : []
    },
    reducers : {
        addItem : (state, action) =>{
            // state.items.push(action.payload)
            let newItem = true;
            state.items.map(item =>{
                if(item?.card?.info?.id === action.payload?.card?.info?.id){
                    item.quantity += 1;
                    newItem = false;
                }
            })
            newItem && state.items.push(action.payload)
        },
        removeItem : (state, action) =>{
            state.items.pop();
        },
        clearCart : (state) =>{
            state.items.length = 0; // state.items = []
            state = [] // {} 
        }
    }
});

export default cartSlice.reducer;

export const { addItem, removeItem, clearCart } = cartSlice.actions