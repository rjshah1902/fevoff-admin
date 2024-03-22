"use client";
import React from 'react';


const Dashboard = () => {

    return (
        <>
            <section className="mx-auto w-full max-w-7xl py-4 px-3 md:px-0">
                <div className="gap-4 grid md:grid-cols-3 md:space-y-0">
                    <div className="bg-base-100 shadow-xl w-full rounded-md">
                        <div className="card-body">
                            <div className='flex justify-between'>
                                <label className='font-bold'>Total Users</label>
                                <label className='text-3xl font-bold'>45</label>
                            </div>
                        </div>
                    </div>
                    <div className="bg-base-100 shadow-xl w-full rounded-md">
                        <div className="card-body">
                            <div className='flex justify-between'>
                                <label className='font-bold'>Total Products</label>
                                <label className='text-3xl font-bold'>8</label>
                            </div>
                        </div>
                    </div>
                    <div className="bg-base-100 shadow-xl w-full rounded-md">
                        <div className="card-body">
                            <div className='flex justify-between'>
                                <label className='font-bold'>Today Orders</label>
                                <label className='text-3xl font-bold'>29</label>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Dashboard