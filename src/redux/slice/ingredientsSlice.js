import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    ingredients: []
}

const ingredientsSlice = createSlice({
    name: "ingredient",
    initialState,
    reducers: {
        STORE_INGREDIENTS(state, action){
            state.ingredients = action.payload.ingredients
        },
    }
});


export const {STORE_INGREDIENTS} = ingredientsSlice.actions

export const selectIngredients = (state) => state.ingredient.ingredients;
export default ingredientsSlice.reducer