/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import GetMethod from '../../../api_calls/get-method/GetMethod';
import { useParams } from 'react-router-dom';

const OrderDetails = () => {

    const params = useParams();
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        handleOrderData();
    }, []);

    console.log(orderDetails);

    const handleOrderData = async () => {

        let url = "order-details";

        const response = await GetMethod(url, params.orderId);

        setOrderDetails(response.data.data);

    }

    return (
        <>
            <section className="mx-auto w-full">
                <Breadcrumbs breadcumr1={"Manage Orders"} breadcumr1_link={"/orders/list"} breadcumr2={"Order Details"} button_name={""} button_link={""} />

                <div className='card bg-white rounded-sm pb-5 mb-5'>
                    <table class="table">
                        <thead>
                            <tr>
                                <td colSpan={2}>
                                    <h4 className='text-3xl text-black italic'>Order Details</h4>
                                </td>
                            </tr>
                        </thead>
                        {
                            orderDetails?.map((user, index) => {
                                return (
                                    <>
                                        {
                                            (index === 0) ?
                                                <>
                                                    <tbody key={index}>
                                                        <tr>
                                                            <td>
                                                                <h3 className='text-2xl'>Name: {user?.userDetails[0].name}</h3>
                                                            </td>
                                                            <td>
                                                                <h3 className='text-2xl'>Email: {user?.userDetails[0].email}</h3>
                                                            </td>
                                                            <td>
                                                                <h3 className='text-2xl'>Contact: {"+" + user?.userDetails[0].countryCode + " " + user?.userDetails[0].contact}</h3>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <h3 className='text-xl'>SubTotal: &#8377;{user?.subTotal}</h3>
                                                            </td>
                                                            <td>
                                                                <h3 className='text-xl'>Shipping: &#8377;{user?.shippingCharges}</h3>
                                                            </td>
                                                            <td>
                                                                <h3 className='text-xl'>Total: &#8377;{user?.totalCost}</h3>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <h3 className='text-xl'>Shipping: {user?.shippingStatus}</h3>
                                                            </td>
                                                            <td>
                                                                <h3 className='text-xl'>Payment: {user?.paymentMethod}</h3>
                                                            </td>
                                                            <td>
                                                                <h3 className='text-xl'>Pay Status: {user?.status}</h3>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </> : ""
                                        }

                                    </>
                                )
                            })
                        }
                    </table>
                </div>
                <div className='card bg-white rounded-sm pb-5 mb-5'>
                    <table class="table">
                        <thead>
                            <tr>
                                <td colSpan={2}>
                                    <h4 className='text-3xl text-black italic'>Product Details</h4>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orderDetails?.map((order, index) => {
                                    return (
                                        <>
                                            <tr key={index}>
                                                <td>
                                                    <img src={order.product.productMainImage} alt='Product Image' className='w-24 text-center rounded-md mx-auto' />
                                                </td>
                                                <td>
                                                    <h3 className='text-3xl'>{order.product.name}</h3>
                                                    <p className='text-xl'>Purchase Qty: {order.items.quantity}</p>
                                                    <h4 className='text-lg'>Price: &#8377;{order.items.price} <del>&#8377;{order.product.productMrp}</del></h4>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}

export default OrderDetails
