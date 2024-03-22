/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import GetMethod from '../../../../api_calls/get-method/GetMethod';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers } from '../../../../redux-slices/users/usersSlice';
import { Link } from 'react-router-dom';
import Pagination from "./../../../components/Pagination/Pagination";

const List = () => {
    const dispatch = useDispatch();
    const useListSelector = useSelector(store => store.user.usersList);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        handleUserData();
    }, [page]);

    const handleUserData = async () => {

        let url = "users";

        if (page > 0) {
            url += "?pageNo=" + parseInt(page);
        }

        const response = await GetMethod(url, "");

        const totalPageCount = Math.ceil(response.data.totalUsers / 10);

        setTotalPages(totalPageCount);

        dispatch(listUsers(response.data.data));
    }

    return (
        <>
            <section className="mx-auto w-full">
                <Breadcrumbs breadcumr1={"Manage Users"} breadcumr1_link={""} breadcumr2={"User Listing"} button_name={""} button_link={""} />
                <div className='card bg-white rounded-sm pb-5 mb-5'>
                    <div className="overflow-x-auto">
                        <table className="table table-md">
                            <thead>
                                <tr>
                                    <th>Sr.</th>
                                    <th>Name</th>
                                    <th>Contact</th>
                                    <th>Gender</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    useListSelector?.map((data, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{data.name}</td>
                                                <td>{data.email} <br />{"+" + data.countryCode + "-" + data.contact}</td>
                                                <td>{data.gender}</td>
                                                <td>
                                                    {
                                                        (data.userVerify === true) ? <>
                                                            <span className="badge-success px-2 py-1 rounded-sm text-white">
                                                                Verified
                                                            </span>
                                                        </> : <>
                                                            <span className="badge-error px-2 py-1 rounded-sm text-white">
                                                                Unverified
                                                            </span>

                                                        </>
                                                    }
                                                </td>
                                                <td>
                                                    <Link to={`/users/` + data._id} className="btn btn-warning px-2 btn-sm rounded-sm">
                                                        Edit
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                        <Pagination currentPage={page + 1} totalPages={totalPages} clickEventFun={(pageNo) => { setPage(pageNo); }} url="/users/list" />
                    </div>
                </div>
            </section>
        </>
    )
}

export { List };
