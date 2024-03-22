import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    brandsData: null,
    brandsList: [],
}

export const brandsSlices = createSlice({
    name: "brands",
    initialState,
    reducers: {
        addBrands: (state, action) => {
            state.brandsData = action.payload;
        },
        updateBrands: (state, action) => {
            state.brandsData = action.payload;
        },
        deleteBrands: (state, action) => {
            state.brandsList = state.brandsList.filter(brand => brand.id !== action.payload);
        },
        listBrands: (state, action) => {
            state.brandsList = action.payload;
        },
    }
});

export const { addBrands, updateBrands, deleteBrands, listBrands } = brandsSlices.actions;

export default brandsSlices.reducer;
