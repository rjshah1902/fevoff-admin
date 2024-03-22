/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import GetMethod from '../../../api_calls/get-method/GetMethod';
import { Link } from 'react-router-dom';
import Pagination from "./../../components/Pagination/Pagination";
import moment from 'moment';

const OrdersList = () => {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [orderListSelector, setOrderListSelector] = useState([]);

  useEffect(() => {
    handleOrderData();
  }, [page]);

  const handleOrderData = async () => {

    let url = "order";

    if (page > 0) {
      url += "?pageNo=" + parseInt(page);
    }

    const response = await GetMethod(url, "");

    const totalPageCount = Math.ceil(response.data.totalOrder / 10);

    setTotalPages(totalPageCount);

    setOrderListSelector(response.data.data);

  }

  return (
    <>
      <section className="mx-auto w-full">
        <Breadcrumbs breadcumr1={"Manage Orders"} breadcumr1_link={""} breadcumr2={"Order Listing"} button_name={""} button_link={""} />
        <div className='card bg-white rounded-sm pb-5 mb-5'>
          <div className="overflow-x-auto">
            <table className="table table-md">
              <thead>
                <tr>
                  <th>Sr.</th>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Order Date</th>
                  <th>Method</th>
                  <th>SubTotal</th>
                  <th>Shipping</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  orderListSelector?.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{data.userDetails[0].name}</td>
                        <td>{data.userDetails[0].email} <br />{data.userDetails[0].contact}</td>
                        <td>{moment(data.createdAt).format("DD-MM-YY")}</td>
                        <td>
                          {
                            (data.paymentMethod === "RazorPay") ? <>
                              <span className="badge-success px-2 py-1 rounded-sm text-white">
                                RazorPay
                              </span>
                            </> : <>
                              <span className="badge-error px-2 py-1 rounded-sm text-white">
                                COD
                              </span>
                            </>
                          }
                        </td>
                        <td>&#8377;{data.subTotal}</td>
                        <td>{data.shippingStatus}</td>
                        <td>
                          <Link to={`/orders/` + data._id} className="btn btn-warning px-2 btn-sm rounded-sm">
                            View
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
            <Pagination currentPage={page + 1} totalPages={totalPages} clickEventFun={(pageNo) => { setPage(pageNo); }} url="/orders/list" />
          </div>
        </div>
      </section>
    </>
  )
}

export default OrdersList;
