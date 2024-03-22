'use client'
import React from 'react'
import { Menu, X } from 'lucide-react'
import "./header.css";


const Header = ({ clickEvent, sidebarVisible }) => {

    const logout = async () => {

        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_id');
        localStorage.removeItem('admin_name');
        localStorage.removeItem('admin_email');

        window.location.replace('/login');
    }

    return (
        <>
            <div className='header bg-white py-1'>
                <div className="mx-auto flex max-w-7xl items-center justify-between pr-4 py-2">
                    <div className="hidden grow items-start lg:flex">
                        <label className='text-xl font-bold md:ml-4'>Admin Dashboard</label>
                    </div>
                    <div className="hidden lg:block">
                        <button className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black" type='button' onClick={logout} >
                            Logout
                        </button>
                    </div>
                    <div className="lg:hidden">
                        <h5 className='font-bold px-3 py-2'>Admin Dashboard</h5>
                    </div>
                    <div className="lg:hidden">
                        {
                            (sidebarVisible === true) ?
                                <X className="h-6 w-6 cursor-pointer" onClick={clickEvent} />
                                :
                                <Menu className="h-6 w-6 cursor-pointer" onClick={clickEvent} />
                        }
                    </div>
                </div>
            </div>
        </>
    )
};

export default Header;