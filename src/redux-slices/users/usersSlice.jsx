import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    usersData: null,
    usersList: [],
}

export const usersSlices = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUsers: (state, action) => {
            state.usersData = action.payload;
        },
        updateUsers: (state, action) => {
            state.usersData = action.payload;
        },
        deleteUsers: (state, action) => {
            state.usersList = state.usersList.filter(user => user.id !== action.payload);
        },
        listUsers: (state, action) => {
            state.usersList = action.payload;
        },
    }
});

export const { addUsers, updateUsers, deleteUsers, listUsers } = usersSlices.actions;

export default usersSlices.reducer;
