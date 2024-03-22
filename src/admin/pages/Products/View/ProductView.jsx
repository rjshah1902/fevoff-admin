/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import GetMethod from '../../../../api_calls/get-method/GetMethod';
import { useParams } from 'react-router-dom';

const ProductView = () => {

    const params = useParams();
    const [productDetails, setProductDetails] = useState(null);

    useEffect(() => {
        handleProductData();
    }, []);

    const handleProductData = async () => {

        let url = "products";

        const response = await GetMethod(url, params.productId);

        setProductDetails(response.data.data);

    }

    return (
        <>

            <section className="mx-auto w-full">
                <Breadcrumbs breadcumr1={"Manage Products"} breadcumr1_link={"/products/list"} breadcumr2={"Products Details"} button_name={""} button_link={""} />
                <div className='card bg-white rounded-sm pb-5 mb-5'>
                    <div class="">
                        <table class="table">
                            <tbody>
                                <tr>
                                    <th width="15%">Product Name</th>
                                    <td>{productDetails?.name}</td>
                                    <th>Product Slug</th>
                                    <td>{productDetails?.productSlug}</td>
                                </tr>
                                <tr>
                                    <th>Brand</th>
                                    <td>{productDetails?.brand}</td>
                                    <th>Category</th>
                                    <td>{productDetails?.category}</td>
                                </tr>
                                <tr>
                                    <th>Small Description</th>
                                    <td colSpan={3}>{productDetails?.productSmallDescription}</td>
                                </tr>
                                <tr>
                                    <th>Size Variation</th>
                                    <td>{(productDetails?.sizeVariation == true) ? "Yes" : "No"}</td>
                                    <th>Available Qty</th>
                                    <td>{productDetails?.availableQty}</td>
                                </tr>
                                <tr>
                                    <th>MRP</th>
                                    <td>&#8377; {productDetails?.productMrp}</td>
                                    <th>Price</th>
                                    <td>&#8377; {productDetails?.productPrice}</td>
                                </tr>
                                <tr>
                                    <th colSpan={2}>Product Main Image</th>
                                    <td colSpan={2}>
                                        <img src={productDetails?.productMainImage} className='roundedn-md' width={"150px"} alt='Product Image' />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={4}>
                                        <label className='label'>Gallery Images</label>
                                        <div className='grid md:grid-cols-5 grid-flow-col md:gap-4 gap-2'>
                                            {
                                                (productDetails?.productImage1 != "" && productDetails?.productImage1 != null) ? <img src={productDetails?.productImage1} className='rounded-md border' width={"auto"} alt='Product Image' /> : ""
                                            }

                                            {
                                                (productDetails?.productImage2 != "" && productDetails?.productImage2 != null) ? <img src={productDetails?.productImage2} className='rounded-md border' width={"auto"} alt='Product Image' /> : ""
                                            }

                                            {
                                                (productDetails?.productImage3 != "" && productDetails?.productImage3 != null) ? <img src={productDetails?.productImage3} className='rounded-md border' width={"auto"} alt='Product Image' /> : ""
                                            }

                                            {
                                                (productDetails?.productImage4 != "" && productDetails?.productImage4 != null) ? <img src={productDetails?.productImage4} className='rounded-md border' width={"auto"} alt='Product Image' /> : ""
                                            }

                                            {
                                                (productDetails?.productImage5 != "" && productDetails?.productImage5 != null) ? <img src={productDetails?.productImage5} className='rounded-md border' width={"auto"} alt='Product Image' /> : ""
                                            }

                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Description</th>
                                    <td colSpan={3}>{productDetails?.productDescription}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProductView
