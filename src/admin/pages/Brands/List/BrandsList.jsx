/* eslint-disable jsx-a11y/alt-text */

import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import GetMethod from '../../../../api_calls/get-method/GetMethod';
import { useDispatch, useSelector } from 'react-redux';
import { listBrands } from '../../../../redux-slices/brands/brandsSlice';
import { Link } from 'react-router-dom';
import Pagination from "./../../../components/Pagination/Pagination";
// import defimage from "./../../../../asset/images/default.jpg";
import MyImage from "./../../../../asset/images/default.jpg";

const BrandsList = () => {

    const dispatch = useDispatch();
    const brandListSelector = useSelector(store => store.brand.brandsList);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        handleUserData();
    }, [page]);

    const handleUserData = async () => {

        let url = "brands";

        if (page > 0) {
            url += "?pageNo=" + parseInt(page);
        }

        const response = await GetMethod(url, "");

        const totalPageCount = Math.ceil(response.data.totalBrands / 10);

        setTotalPages(totalPageCount);

        dispatch(listBrands(response.data.data));
    }
    return (
        <>

            <section className="mx-auto w-full">
                <Breadcrumbs breadcumr1={"Manage Brands"} breadcumr1_link={""} breadcumr2={"Brand Listing"} button_name={""} button_link={""} />
                <div className='card bg-white rounded-sm pb-5 mb-5'>
                    <div className="overflow-x-auto">
                        <table className="table table-md">
                            <thead>
                                <tr>
                                    <th>Sr.</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Slug</th>
                                    <th>Show In Front</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    brandListSelector?.map((data, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    {
                                                        (data.brand_image != "" && data.brand_image != null) ?
                                                            <img src={data.brand_image} width={70} className='rounded-md border' />
                                                            : <img src={MyImage} width={70} className='rounded-md border' />
                                                    }

                                                </td>
                                                <td>{data.name}</td>
                                                <td>{data.brand_slug}</td>
                                                <td>
                                                    {
                                                        (data.show_hide === true) ? <>
                                                            <span className="badge-success px-2 py-1 rounded-sm text-white">
                                                                Yes
                                                            </span>
                                                        </> : <>
                                                            <span className="badge-error px-2 py-1 rounded-sm text-white">
                                                                No
                                                            </span>

                                                        </>
                                                    }
                                                </td>
                                                <td>
                                                    <Link to={`/brands/` + data._id} className="btn btn-warning px-2 btn-sm rounded-sm">
                                                        Edit
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                        <Pagination currentPage={page + 1} totalPages={totalPages} clickEventFun={(pageNo) => { setPage(pageNo); }} url="/brands/list" />
                    </div>
                </div>
            </section>
        </>
    )
}

export default BrandsList
