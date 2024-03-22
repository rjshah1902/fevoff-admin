import React from "react";
import Login from "./admin/login/Login";
import Dashboard from "./admin/pages/Dashboard/Dashboard";
import Users from "./admin/pages/Users/Users";
import Brands from "./admin/pages/Brands/Brands";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, } from "react-router-dom";

import { List as UsersList } from "./admin/pages/Users/List/List";
import BrandsList from "./admin/pages/Brands/List/BrandsList";


function App() {

    const route = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/">
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="users" element={<Users />} />
                    <Route path="users/list" element={<UsersList />} />
                    <Route path="brands" element={<Brands />} />
                    <Route path="brands/list" element={<BrandsList />} />
                </Route>
            </>
        )
    )

    return (
        <>
            <RouterProvider router={route} />
        </>
    );
}

export default App;
