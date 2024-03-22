/* eslint-disable jsx-a11y/alt-text */

import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import GetMethod from '../../../../api_calls/get-method/GetMethod';
import { Link } from 'react-router-dom';
import Pagination from "./../../../components/Pagination/Pagination";
import MyImage from "./../../../../asset/images/default.jpg";

const ProductsList = () => {

    const [productList, setproductList] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        handleUserData();
    }, [page]);

    const handleUserData = async () => {

        let url = "products";

        if (page > 0) {
            url += "?pageNo=" + parseInt(page);
        }

        const response = await GetMethod(url, "");

        const totalPageCount = Math.ceil(response.data.totalCategorys / 10);
        setproductList(response.data.data);
        setTotalPages(totalPageCount);

    }
    return (
        <>

            <section className="mx-auto w-full">
                <Breadcrumbs breadcumr1={"Manage Products"} breadcumr1_link={""} breadcumr2={"Products Listing"} button_name={""} button_link={""} />
                <div className='card bg-white rounded-sm pb-5 mb-5'>
                    <div className="overflow-x-auto">
                        <table className="table table-md">
                            <thead>
                                <tr>
                                    <th>Sr.</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Brand</th>
                                    <th>Variation</th>
                                    <th>Show In Front</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    productList?.map((data, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    {
                                                        (data.productMainImage !== "" && data.productMainImage !== null) ?
                                                            <img src={data.productMainImage} width={70} className='rounded-md border' />
                                                            : <img src={MyImage} width={70} className='rounded-md border' />
                                                    }

                                                </td>
                                                <td>{data.name}</td>
                                                <td>{data.category}</td>
                                                <td>{data.brand}</td>
                                                <td>
                                                    {
                                                        (data.sizeVariation === true) ? <>
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
                                                    {
                                                        (data.showHide === true) ? <>
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
                                                    <Link to={`/products/view/` + data._id} className="btn btn-info px-2 btn-sm rounded-sm mr-2 text-white">
                                                        View
                                                    </Link>
                                                    <Link to={`/products/` + data._id} className="btn btn-warning px-2 btn-sm rounded-sm">
                                                        Edit
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                        <Pagination currentPage={page + 1} totalPages={totalPages} clickEventFun={(pageNo) => { setPage(pageNo); }} url="/categorys/list" />
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProductsList
