/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import InputTag from '../../components/InputTag/InputTag';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import PostMethod from '../../../api_calls/post-method/PostMethod';
import swal from 'sweetalert';
import imageCompression from 'browser-image-compression';
import MyImage from "./../../../asset/images/default.jpg";
import { useNavigate } from 'react-router-dom';

const Brands = () => {
    const navigate = useNavigate();
    const [defaultImage, setDefaultImage] = useState(MyImage);
    const [btnName, setbtnName] = useState("Add Brands");
    const [btnDisabld, setBtnDisabld] = useState(false);

    let brandData = {
        name: "",
        brand_slug: "",
        show_hide: "",
        brand_image: "",
    }

    const [errorMessage, setErrorMessage] = useState("");
    const [brandDetails, setBrandDetails] = useState(brandData);

    const handleImageChange = async (e) => {
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

                    setDefaultImage(base64Data);

                    setBrandDetails((prev) =>
                    ({
                        ...prev,
                        brand_image: imageCode,
                    }));
                };

                reader.readAsDataURL(compressedFile);

            } catch (error) {
                console.error('Error compressing image:', error);
                setErrorMessage("Error compressing image");
            }
        };
    }

    const handleUserData = async (event) => {
        event.preventDefault();
        setBtnDisabld(true);
        setbtnName("Loading...");

        const url = "brands";
        const response = await PostMethod(url, brandDetails);

        if (response.status === true) {

            setBtnDisabld(false);
            setbtnName("Add brands");

            swal("Good job!", "Brands Created Successfully", "success")
                .then(() => {
                    navigate('/brands/list');
                });

        } else {
            setBtnDisabld(false);
            setbtnName("Add brands");
            setErrorMessage(response.message);
        }
    }

    return (
        <>
            <section className="mx-auto w-full">
                <Breadcrumbs breadcumr1={"Manage Brands"} breadcumr1_link={"/brands/list"} breadcumr2={"Add Brands"} button_name={""} button_link={""} />
                <div className='card bg-white rounded-sm pb-5 mb-5'>
                    <form method='POST' onSubmit={handleUserData} autoComplete='off' >
                        <div className='card-body'>
                            {
                                (errorMessage !== "") ? <>
                                    <ErrorMessage message={errorMessage} />
                                </> : ""
                            }

                            <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>

                                <InputTag spanText="Brand Name" inputType="text" required={true} inputName="name" changeHandle={(e) => setBrandDetails((prev) => ({ ...prev, name: e.target.value, brand_slug: e.target.value.trim().toLowerCase().replace(/\s+/g, '-') }),)} inputValue={brandDetails.name} />

                                <InputTag spanText="Brand Slug" inputType="text" required={true} inputName="brand_slug" changeHandle={(e) => setBrandDetails((prev) => ({ ...prev, brand_slug: e.target.value, }),)} inputValue={brandDetails.brand_slug} />

                                <div className="form-control">
                                    <div className="label">
                                        <span className="label-text">Show In Front</span>
                                    </div>
                                    <select className='input input-bordered w-full rounded-md bg-gray-100' name='show_hide' onChange={(e) => setBrandDetails((prev) => ({ ...prev, show_hide: e.target.value, }),)}  >
                                        <option value="" selected disabled>-- --</option>
                                        <option value={true}>Yes</option>
                                        <option value={false}>No</option>
                                    </select>
                                </div>

                                <div className="form-control">
                                    <div className="label">
                                        <span className="label-text">Brand Image</span>
                                    </div>
                                    <input className='input input-bordered w-full  rounded-md bg-gray-100' type="file" required={true} name='brand_image' onChange={handleImageChange} accept="image/*" />
                                </div>
                                <div className="form-control">
                                    <img src={defaultImage} alt="Brand image" width={"50%"} className='rounded-md' />
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

export default Brands
