import { configureStore } from "@reduxjs/toolkit";

import usersSlice from "../redux-slices/users/usersSlice";
import categorySlices from "../redux-slices/category/categorySlice";
import brandsSlice from "../redux-slices/brands/brandsSlice";

export const store = configureStore({
    reducer: {
        user: usersSlice,
        category: categorySlices,
        brand: brandsSlice,
    },
});