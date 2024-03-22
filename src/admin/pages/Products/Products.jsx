/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import InputTag from '../../components/InputTag/InputTag';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import PostMethod from '../../../api_calls/post-method/PostMethod';
import GetMethod from '../../../api_calls/get-method/GetMethod';
import swal from 'sweetalert';
import imageCompression from 'browser-image-compression';
import MyImage from "./../../../asset/images/default.jpg";

const Products = () => {

    const allImages = {
        productMainImage: MyImage,
        productImage1: MyImage,
        productImage2: MyImage,
        productImage3: MyImage,
        productImage4: MyImage,
        productImage5: MyImage,
    }

    const [defaultImage, setDefaultImage] = useState(allImages);
    const [btnName, setbtnName] = useState("Add Products");
    const [btnDisabld, setBtnDisabld] = useState(false);
    const [brandListing, setBrandListing] = useState([]);
    const [categoryListing, setCategoryListing] = useState([]);

    useEffect(() => {
        getBrandListing();
        getCategoryListing();
    }, []);

    const getBrandListing = async () => {
        const url = "brands/list";

        try {
            const response = await GetMethod(url);

            if (response.status === true) {
                setBrandListing(response.data.data);
            }

        } catch (error) {
            console.error("Error fetching brand listing:", error);
        }
    }

    const getCategoryListing = async () => {

        const url = "categorys/list";

        try {
            const response = await GetMethod(url);

            if (response.status === true) {
                setCategoryListing(response.data.data);
            }

        } catch (error) {
            console.error("Error fetching categorys listing:", error);
        }
    }

    let productData = {
        name: "",
        productSlug: "",
        brand: "",
        category: "",
        seller: "",
        productSmallDescription: "",
        productDescription: "",
        rating: "",
        sizeVariation: "",
        productMrp: "",
        productPrice: "",
        availableQty: "",
        productMainImage: defaultImage.productMainImage,
        productImage1: defaultImage.galleryImage1,
        productImage2: defaultImage.galleryImage2,
        productImage3: defaultImage.galleryImage3,
        productImage4: defaultImage.galleryImage4,
        productImage5: defaultImage.galleryImage5,
        productVideo: "",
        showHide: "",
    }

    const [errorMessage, setErrorMessage] = useState("");
    const [productDetails, setProductDetails] = useState(productData);

    const handleImageChange = async (e, imageName) => {
        const file = e.target.files[0];

        if (file) {
            try {
                const options = {
                    maxSizeMB: 0.2,
                    maxWidthOrHeight: 700,
                    useWebWorker: true,
                };

                const compressedFile = await imageCompression(file, options);

                const reader = new FileReader();

                reader.onloadend = () => {
                    const base64Data = reader.result;
                    const imageCode = base64Data.split(';base64,')[1];

                    setDefaultImage((prev) => ({
                        ...prev, [imageName]: base64Data,
                    }));

                    setProductDetails((prev) => ({
                        ...prev,
                        [imageName]: imageCode,
                    }));

                };

                reader.readAsDataURL(compressedFile);

            } catch (error) {
                console.error('Error compressing image:', error);
                setErrorMessage("Error compressing image");
            }
        };
    }

    const handleProductsData = async (event) => {
        event.preventDefault();
        setBtnDisabld(true);
        setbtnName("Loading...");

        const url = "products";
        const response = await PostMethod(url, productDetails);

        if (response.status === true) {

            setBtnDisabld(false);
            setbtnName("Add Products");

            swal("Good job!", "Products Created Successfully", "success")
                .then(() => {
                    window.location.replace('/products/list');
                });

        } else {
            setBtnDisabld(false);
            setbtnName("Add Products");
            setErrorMessage(response.message);
        }
    }

    return (
        <>
            <section className="mx-auto w-full">
                <Breadcrumbs breadcumr1={"Manage Products"} breadcumr1_link={"/products/list"} breadcumr2={"Add Products"} button_name={""} button_link={""} />
                <div className='card bg-white rounded-sm pb-5 mb-5'>

                    <form method='POST' onSubmit={handleProductsData} autoComplete='off' >
                        <div className='card-body'>
                            {
                                (errorMessage !== "") ? <>
                                    <ErrorMessage message={errorMessage} />
                                </> : ""
                            }

                            <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>

                                <InputTag spanText="Product Name" inputType="text" required={true} inputName="name" changeHandle={(e) => setProductDetails((prev) => ({ ...prev, name: e.target.value, productSlug: e.target.value.trim().toLowerCase().replace(/\s+/g, '-') }),)} inputValue={productDetails.name} />

                                <InputTag spanText="Product Slug" inputType="text" required={true} inputName="productSlug" changeHandle={(e) => setProductDetails((prev) => ({ ...prev, productSlug: e.target.value, }),)} inputValue={productDetails.productSlug} />

                                <div className="form-control">
                                    <div className="label">
                                        <span className="label-text">Show In Front</span>
                                    </div>
                                    <select className='input input-bordered w-full rounded-md bg-gray-100' name='showHide' onChange={(e) => setProductDetails((prev) => ({ ...prev, showHide: e.target.value, }),)}  >
                                        <option value="" selected>-- --</option>
                                        <option value={1}>Yes</option>
                                        <option value={0}>No</option>
                                    </select>
                                </div>

                                <div className="form-control">
                                    <div className="label">
                                        <span className="label-text">Select Brand</span>
                                    </div>
                                    <select className='input input-bordered w-full rounded-md bg-gray-100' name='brand' onChange={(e) => setProductDetails((prev) => ({ ...prev, brand: e.target.value, }),)}  >
                                        <option value="" selected>-- --</option>
                                        {
                                            brandListing?.map((brand, index) => {
                                                return (
                                                    <option value={brand._id} key={index}>{brand.name}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="form-control">
                                    <div className="label">
                                        <span className="label-text">Select Category</span>
                                    </div>
                                    <select className='input input-bordered w-full rounded-md bg-gray-100' name='category' onChange={(e) => setProductDetails((prev) => ({ ...prev, category: e.target.value, }),)}  >
                                        <option value="" selected>-- --</option>
                                        {
                                            categoryListing?.map((cate, index) => {
                                                return (
                                                    <option value={cate._id} key={index}>{cate.name}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="form-control">
                                    <div className="label">
                                        <span className="label-text">Product Rating</span>
                                    </div>
                                    <select className='input input-bordered w-full rounded-md bg-gray-100' name='rating' onChange={(e) => setProductDetails((prev) => ({ ...prev, rating: e.target.value, }),)}  >
                                        <option value="" selected>-- --</option>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                    </select>
                                </div>

                                <div className="form-control">
                                    <div className="label">
                                        <span className="label-text">Size Variation</span>
                                    </div>
                                    <select className='input input-bordered w-full rounded-md bg-gray-100' name='sizeVariation' onChange={(e) => setProductDetails((prev) => ({ ...prev, sizeVariation: e.target.value, }),)}  >
                                        <option value="" selected>-- --</option>
                                        <option value={true}>Yes</option>
                                        <option value={false}>No</option>
                                    </select>
                                </div>

                                <InputTag spanText="Product MRP" inputType="text" required={true} inputName="productMrp" changeHandle={(e) => setProductDetails((prev) => ({ ...prev, productMrp: e.target.value, }),)} inputValue={productDetails.productMrp} />

                                <InputTag spanText="Product Price" inputType="text" required={true} inputName="productPrice" changeHandle={(e) => setProductDetails((prev) => ({ ...prev, productPrice: e.target.value, }),)} inputValue={productDetails.productPrice} />

                                <div className="form-control">
                                    <InputTag spanText="Product Available Qty" inputType="text" required={true} inputName="availableQty" changeHandle={(e) => setProductDetails((prev) => ({ ...prev, availableQty: e.target.value, }),)} inputValue={productDetails.availableQty} />
                                    <InputTag spanText="Product Video Link" inputType="text" required={true} inputName="productVideo" changeHandle={(e) => setProductDetails((prev) => ({ ...prev, productVideo: e.target.value, }),)} inputValue={productDetails.productVideo} />
                                </div>

                                <div className="form-control">
                                    <div className="label">
                                        <span className="label-text">Small Description</span>
                                    </div>
                                    <textarea className='input-bordered w-full rounded-md bg-gray-100 p-2' rows={5} name="productSmallDescription" onChange={(e) => setProductDetails((prev) => ({ ...prev, productSmallDescription: e.target.value, }),)}>{productDetails.productSmallDescription}</textarea>
                                </div>

                                <div className="form-control">
                                    <div className="label">
                                        <span className="label-text">Product Description</span>
                                    </div>
                                    <textarea className='input-bordered w-full rounded-md bg-gray-100 p-2' rows={5} name="productDescription" onChange={(e) => setProductDetails((prev) => ({ ...prev, productDescription: e.target.value, }),)}>{productDetails.productDescription}</textarea>
                                </div>

                            </div>
                            <div className='grid grid-cols-3 md:grid-cols-6 gap-4'>
                                <div className="form-control">
                                    <label>
                                        <span className="label-text">Main Image</span>
                                        <input type='file' className='input-bordered w-full rounded-md bg-gray-100' name='productMainImage' hidden onChange={async (e) => {
                                            handleImageChange(e, 'productMainImage');
                                        }} />
                                        <img src={defaultImage.productMainImage} alt="Brand image" width={"100%"} className='rounded-md' />
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label>
                                        <span className="label-text">Gallery Image 1</span>
                                        <input type='file' className='input-bordered w-full rounded-md bg-gray-100' name='productImage1' hidden onChange={async (e) => {
                                            handleImageChange(e, 'productImage1');
                                        }} />
                                        <img src={defaultImage.productImage1} alt="Brand image" width={"100%"} className='rounded-md' />
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label>
                                        <span className="label-text">Gallery Image 2</span>
                                        <input type='file' className='input-bordered w-full rounded-md bg-gray-100' name='productImage2' hidden onChange={async (e) => {
                                            handleImageChange(e, 'productImage2');
                                        }} />
                                        <img src={defaultImage.productImage2} alt="Brand image" width={"100%"} className='rounded-md' />
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label>
                                        <span className="label-text">Gallery Image 3</span>
                                        <input type='file' className='input-bordered w-full rounded-md bg-gray-100' name='productImage3' hidden onChange={async (e) => {
                                            handleImageChange(e, 'productImage3');
                                        }} />
                                        <img src={defaultImage.productImage3} alt="Brand image" width={"100%"} className='rounded-md' />
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label>
                                        <span className="label-text">Gallery Image 4</span>
                                        <input type='file' className='input-bordered w-full rounded-md bg-gray-100' name='productImage4' hidden onChange={async (e) => {
                                            handleImageChange(e, 'productImage4');
                                        }} />
                                        <img src={defaultImage.productImage4} alt="Brand image" width={"100%"} className='rounded-md' />
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label>
                                        <span className="label-text">Gallery Image 5</span>
                                        <input type='file' className='input-bordered w-full rounded-md bg-gray-100' name='productImage5' hidden onChange={async (e) => {
                                            handleImageChange(e, 'productImage5');
                                        }} />
                                        <img src={defaultImage.productImage5} alt="Brand image" width={"100%"} className='rounded-md' />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='card-footer px-8'>
                            <div className='grid grid-cols-2 md:grid-cols-4 sm:grid-cols-2'>
                                <button type='submit' className="btn text-white btn-success rounded-md w-auto mr-3" disabled={btnDisabld} >{btnName}</button>
                                <button type='reset' className="btn text-white btn-error rounded-md ml-3 w-auto" disabled={btnDisabld} >Reset Details</button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Products;
