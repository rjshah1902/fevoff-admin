/* eslint-disable jsx-a11y/anchor-is-valid */
"use client";
import React, { useEffect, useState } from 'react'
import { Home, User, AlignJustify, ChevronDown, Codepen, Plus } from 'lucide-react'
import "./sidebar.css";
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Sidebar = ({ sidemenu }) => {
    const basePath = '/';
    const location = useLocation();

    const [opensideMenu, setOpenSideMenu] = useState(sidemenu);
    const [currentPage, setCurrentPage] = useState(null);

    const activeCss = "flex transform items-center rounded-lg bg-white text-dark transition-colors duration-300 py-3 justify-between";

    const normalCss = "flex transform items-center rounded-lg text-gray-200 transition-colors duration-300 py-3 justify-between";

    useEffect(() => {
        setOpenSideMenu(sidemenu);
        checkCurrentPage();
    }, [sidemenu, location.pathname]);

    const checkCurrentPage = () => {
        const pathSegments = location.pathname.split('/');
        const firstParamValue = pathSegments[1];
        setCurrentPage(firstParamValue);
    }

    return (
        <aside className={`flex h-screen w-64 flex-col overflow-y-auto border-r bg-black pt-4 fixed admin-sidebar ${opensideMenu}`}>
            <a className='px-5'>
                <h4 className='text-white text-3xl font-bold'>Fevoff</h4>
            </a>
            <label className=" text-xs font-semibold uppercase text-white mt-2 pl-4">Admin Dashboard</label>
            <div className="mt-6 flex flex-1 flex-col justify-between ">
                <nav className="space-y-6">
                    <div className="space-y-3 ">

                        <NavLink to={basePath + "dashboard"} className={({ isActive }) => isActive ? "bg-white flex items-center rounded-lg px-3 py-3" : "flex transform items-center rounded-lg  text-gray-200 transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700 py-3"}>
                            <Home className="h-5 w-5" aria-hidden="true" />
                            <span className="mx-2 text-sm font-medium">Dashboard</span>
                        </NavLink>

                        <div className="dropdown w-full">
                            <NavLink className={(currentPage === 'users') ? activeCss : normalCss} role='btn' >
                                <div className='flex'>
                                    <User className="h-5 w-5" aria-hidden="true" />
                                    <span className="mx-2 text-sm font-medium">Manage Users</span>
                                </div>
                                <ChevronDown className="h-5 w-5" aria-hidden="true" />
                            </NavLink>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu shadow w-full px-0 bg-white">
                                <li>
                                    <NavLink to={basePath + "users"} className={({ isActive }) => isActive ? "bg-white flex items-center rounded-lg py-3" : "flex transform items-center rounded-lg  transition-colors duration-300 hover:bg-gray-50 text-gray-700 py-3"} role='btn' >
                                        <Plus className="h-5 w-5" aria-hidden="true" />
                                        <span className="mx-2 text-sm font-medium">Add Users</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={basePath + "users/list"} className={({ isActive }) => isActive ? "bg-white flex items-center rounded-lg py-3" : "flex transform items-center rounded-lg transition-colors duration-300 hover:bg-gray-50 text-gray-700 py-3"} role='btn' >
                                        <AlignJustify className="h-5 w-5" aria-hidden="true" />
                                        <span className="mx-2 text-sm font-medium">Users List</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>

                        <div className="dropdown w-full">
                            <NavLink className={(currentPage === 'brands') ? activeCss : normalCss} role='btn' >
                                <div className='flex'>
                                    <Codepen className="h-5 w-5" aria-hidden="true" />
                                    <span className="mx-2 text-sm font-medium">Manage Brands</span>
                                </div>
                                <ChevronDown className="h-5 w-5" aria-hidden="true" />
                            </NavLink>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu shadow w-full px-0 bg-white">
                                <li>
                                    <NavLink to={basePath + "brands"} className={({ isActive }) => isActive ? "bg-white flex items-center rounded-lg py-3" : "flex transform items-center rounded-lg  transition-colors duration-300 hover:bg-gray-50 text-gray-700 py-3"} role='btn' >
                                        <Plus className="h-5 w-5" aria-hidden="true" />
                                        <span className="mx-2 text-sm font-medium">Add Brands</span>
                                    </NavLink>
                                </li>
                                <li className='mt-2'>
                                    <NavLink to={basePath + "brands/list"} className={({ isActive }) => isActive ? "bg-white flex items-center rounded-lg py-3" : "flex transform items-center rounded-lg transition-colors duration-300 hover:bg-gray-50 text-gray-700 py-3"} role='btn' >
                                        <AlignJustify className="h-5 w-5" aria-hidden="true" />
                                        <span className="mx-2 text-sm font-medium">Brands List</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>

                        <div className="dropdown w-full">
                            <NavLink className={(currentPage === 'categorys') ? activeCss : normalCss} role='btn' >
                                <div className='flex'>
                                    <Codepen className="h-5 w-5" aria-hidden="true" />
                                    <span className="mx-2 text-sm font-medium">Manage Category</span>
                                </div>
                                <ChevronDown className="h-5 w-5" aria-hidden="true" />
                            </NavLink>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu shadow w-full px-0 bg-white">
                                <li>
                                    <NavLink to={basePath + "categorys"} className={({ isActive }) => isActive ? "bg-white flex items-center rounded-lg py-3" : "flex transform items-center rounded-lg  transition-colors duration-300 hover:bg-gray-50 text-gray-700 py-3"} role='btn' >
                                        <Plus className="h-5 w-5" aria-hidden="true" />
                                        <span className="mx-2 text-sm font-medium">Add Category</span>
                                    </NavLink>
                                </li>
                                <li className='mt-2'>
                                    <NavLink to={basePath + "categorys/list"} className={({ isActive }) => isActive ? "bg-white flex items-center rounded-lg py-3" : "flex transform items-center rounded-lg transition-colors duration-300 hover:bg-gray-50 text-gray-700 py-3"} role='btn' >
                                        <AlignJustify className="h-5 w-5" aria-hidden="true" />
                                        <span className="mx-2 text-sm font-medium">Category List</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>

                        <div className="dropdown w-full">
                            <NavLink className={(currentPage === 'products') ? activeCss : normalCss} role='btn' >
                                <div className='flex'>
                                    <Codepen className="h-5 w-5" aria-hidden="true" />
                                    <span className="mx-2 text-sm font-medium">Manage Products</span>
                                </div>
                                <ChevronDown className="h-5 w-5" aria-hidden="true" />
                            </NavLink>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu shadow w-full px-0 bg-white">
                                <li>
                                    <NavLink to={basePath + "products"} className={({ isActive }) => isActive ? "bg-white flex items-center rounded-lg py-3" : "flex transform items-center rounded-lg  transition-colors duration-300 hover:bg-gray-50 text-gray-700 py-3"} role='btn' >
                                        <Plus className="h-5 w-5" aria-hidden="true" />
                                        <span className="mx-2 text-sm font-medium">Add Products</span>
                                    </NavLink>
                                </li>
                                <li className='mt-2'>
                                    <NavLink to={basePath + "products/list"} className={({ isActive }) => isActive ? "bg-white flex items-center rounded-lg py-3" : "flex transform items-center rounded-lg transition-colors duration-300 hover:bg-gray-50 text-gray-700 py-3"} role='btn' >
                                        <AlignJustify className="h-5 w-5" aria-hidden="true" />
                                        <span className="mx-2 text-sm font-medium">Products List</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>

                        <div className="dropdown w-full">
                            <NavLink className={(currentPage === 'orders') ? activeCss : normalCss} role='btn' >
                                <div className='flex'>
                                    <Codepen className="h-5 w-5" aria-hidden="true" />
                                    <span className="mx-2 text-sm font-medium">Manage orders</span>
                                </div>
                                <ChevronDown className="h-5 w-5" aria-hidden="true" />
                            </NavLink>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu shadow w-full px-0 bg-white">

                                <li className='mt-2'>
                                    <NavLink to={basePath + "orders/list"} className={({ isActive }) => isActive ? "bg-white flex items-center rounded-lg py-3" : "flex transform items-center rounded-lg transition-colors duration-300 hover:bg-gray-50 text-gray-700 py-3"} role='btn' >
                                        <AlignJustify className="h-5 w-5" aria-hidden="true" />
                                        <span className="mx-2 text-sm font-medium">Orders List</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>

                    </div>
                </nav>
            </div>
        </aside>
    )
}

export default Sidebar;