import React, { useState, useEffect } from "react";
import Login from "./admin/login/Login";
import Dashboard from "./admin/pages/Dashboard/Dashboard";
import Users from "./admin/pages/Users/Users";
import Brands from "./admin/pages/Brands/Brands";
// import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { List as UsersList } from "./admin/pages/Users/List/List";
import BrandsList from "./admin/pages/Brands/List/BrandsList";
import EditUser from "./admin/pages/Users/Edit/Edit";
import Sidebar from './admin/components/Sidebar/Sidebar'
import Header from './admin/components/Header/Header';
import Footer from './admin/components/Footer/Footer';
import EditBrands from "./admin/pages/Brands/Edit/EditBrands";
import Categorys from "./admin/pages/Categorys/Categorys";
import CategorysList from "./admin/pages/Categorys/List/CategorysList";
import EditCategorys from "./admin/pages/Categorys/Edit/EditCategorys";
import Products from "./admin/pages/Products/Products";
import ProductsList from "./admin/pages/Products/List/ProductsList";
import ProductView from "./admin/pages/Products/View/ProductView";
import EditProducts from "./admin/pages/Products/Edit/EditProducts";
import OrdersList from "./admin/pages/Orders/OrdersList";
import OrderDetails from "./admin/pages/Orders/OrderDetails";

function App() {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [token, setToken] = useState("");
  const [adminId, setAdminId] = useState("");

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = () => {

    const token = localStorage.getItem("admin_token");
    setToken(token);
    const admin_id = localStorage.getItem("admin_id");
    setAdminId(admin_id);
  };

  return (
    <>
      <BrowserRouter>
        {

          (token === null && adminId === null) ?
            <>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </>
            :
            <>
              <div className='main-wrapper bg-gray-100'>
                <Sidebar sidemenu={`${isSidebarVisible ? 'sidebar-visible' : 'sidebar-hidden'}`} />
                <div className='rightside'>
                  <Header clickEvent={() => { setSidebarVisible(!isSidebarVisible); }} sidebarVisible={isSidebarVisible} />
                  <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="users" element={<Users />} />
                    <Route path="users/:userId" element={<EditUser />} />
                    <Route path="users/list" element={<UsersList />} />
                    <Route path="brands" element={<Brands />} />
                    <Route path="brands/:brandId" element={<EditBrands />} />
                    <Route path="brands/list" element={<BrandsList />} />
                    <Route path="categorys" element={<Categorys />} />
                    <Route path="categorys/:categoryId" element={<EditCategorys />} />
                    <Route path="categorys/list" element={<CategorysList />} />
                    <Route path="products" element={<Products />} />
                    <Route path="products/:productId" element={<EditProducts />} />
                    <Route path="products/view/:productId" element={<ProductView />} />
                    <Route path="products/list" element={<ProductsList />} />
                    <Route path="orders/list" element={<OrdersList />} />
                    <Route path="orders/:orderId" element={<OrderDetails />} />
                  </Routes>
                  <Footer />
                </div>
              </div>
            </>
        }
      </BrowserRouter>
    </>
  );
}

export default App;
