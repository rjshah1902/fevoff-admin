import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryList: null,
}

export const categorySlices = createSlice({
    name: "category",
    initialState,
    reducers: {
        addcategory: (state, action) => {

            state.categoryList = action.payload;

        },
        updatecategory: (state, action) => {

            state.categoryList = action.payload;

        },
        deletecategory: (state, action) => {

            state.categoryList = state.todos.filter((todo) => todo.id !== action.payload);

        },
    }
});

export const { addUsers, updateUsers, deleteUsers } = categorySlices.actions;

export default categorySlices.reducer;