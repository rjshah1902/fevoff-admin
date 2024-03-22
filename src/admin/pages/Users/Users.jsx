"use client";
import React, { useState } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import moment from 'moment';
import InputTag from '../../components/InputTag/InputTag';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import GetPincodeDetails from "./../../../api_calls/admin/user/GetPincodeDetails";
import PostMethod from '../../../api_calls/post-method/PostMethod';
import PostWithJwt from '../../../api_calls/post-method/PostWithJwt';
import swal from 'sweetalert';

const Users = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [cityList, setCityList] = useState([]);

    let userData = {
        name: "",
        email: "",
        contact: "",
        dob: "",
        gender: "",
        password: "",
        userVerify: true,
    }

    let userAddress = {
        houseNo: "",
        streetArea: "",
        landmark: "",
        pincode: "",
        country: "",
        state: "",
        city: "",
    }

    const [userDetails, setUserDetails] = useState(userData);
    const [userAddressDetails, setUserAddressDetails] = useState(userAddress);

    const getPincodeDetails = async (pincodeValue) => {
        setUserAddressDetails((prev) => ({ ...prev, pincode: pincodeValue }));
        if (pincodeValue.length === 6) {

            const pincodeDetails = await GetPincodeDetails(pincodeValue);
            if (pincodeDetails.data != null) {
                setErrorMessage("");
                const details = pincodeDetails.data[0];
                setUserAddressDetails((prev) => ({ ...prev, state: details.State, country: details.Country, pincode: pincodeValue }));
                setCityList(pincodeDetails.data);
            } else {
                setErrorMessage("Please provide valid Pincode");
            }
        } else if (pincodeValue.length > 6) {
            setErrorMessage("Please provide valid Pincode");
        }
    }

    const handleUserData = async (event) => {
        event.preventDefault();

        const url = "users";
        const response = await PostMethod(url, userDetails);

        if (response.status === true) {

            const userId = response.data._id;
            const addressUrl = "users-address";

            let addressObj = {
                userId: userId,
                name: userDetails.name,
                email: userDetails.email,
                contact: userDetails.contact,
                ...userAddressDetails,
            }
            const addressResponse = await PostWithJwt(addressUrl, addressObj);

            if (addressResponse.status === true) {
                swal("Good job!", "User Created Successfully", "success")
                    .then(() => {
                        window.location.replace('/users/list');
                    });
            } else {
                setErrorMessage(addressResponse.message);
            }
        } else {
            setErrorMessage(response.message);
        }
    }

    return (
        <>
            <section className="mx-auto w-full">
                <Breadcrumbs breadcumr1={"Manage Users"} breadcumr1_link={""} breadcumr2={"Add User"} button_name={""} button_link={""} />
                <div className='card bg-white rounded-sm pb-5 mb-5'>
                    <form method='POST' onSubmit={handleUserData} autoComplete='off' >
                        <div className='card-body'>
                            {
                                (errorMessage !== "") ? <>
                                    <ErrorMessage message={errorMessage} />
                                </> : ""
                            }

                            <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>

                                <InputTag spanText="User Name" inputType="text" required={true} inputName="name" changeHandle={(e) => setUserDetails((prev) => ({ ...prev, name: e.target.value, }),)} inputValue={userDetails.name} />

                                <InputTag spanText="Email Address" inputType="email" required={true} inputName="email" changeHandle={(e) => setUserDetails((prev) => ({ ...prev, email: e.target.value, }),)} inputValue={userDetails.email} />

                                <div className="form-control">
                                    <div className="label">
                                        <span className="label-text">Contact Number</span>
                                    </div>
                                    <input type="text" className="input input-bordered w-full  rounded-md bg-gray-100" onChange={(e) => (e.target.value.length <= 10) ? setUserDetails((prev) => ({ ...prev, contact: e.target.value, }),) : ""} value={userDetails.contact} />
                                </div>

                                <div className="form-control">
                                    <div className="label">
                                        <span className="label-text">Date Of Birth</span>
                                    </div>
                                    <input type="date" className="input input-bordered w-full  rounded-md bg-gray-100" max={moment().subtract(10, 'years').format("YYYY-MM-DD")} onChange={(e) => setUserDetails((prev) => ({ ...prev, dob: e.target.value, }),)} />
                                </div>

                                <div className="form-control">
                                    <div className="label">
                                        <span className="label-text">User Gender</span>
                                    </div>
                                    <select className='input input-bordered w-full  rounded-md bg-gray-100' onChange={(e) => setUserDetails((prev) => ({ ...prev, gender: e.target.value, }),)}  >
                                        <option value="">Select Gender</option>
                                        <option value={"Male"}>Male</option>
                                        <option value={"Female"}>Female</option>
                                        <option value={"Other"}>Other</option>
                                    </select>
                                </div>

                                <InputTag spanText="User Password" inputType="text" required={true} inputName="password" changeHandle={(e) => setUserDetails((prev) => ({ ...prev, password: e.target.value, }),)} inputValue={userDetails.password} />

                                <InputTag spanText="House No" inputType="text" required={true} inputName="houseNo" changeHandle={(e) => setUserAddressDetails((prev) => ({ ...prev, houseNo: e.target.value, }),)} inputValue={userAddressDetails.houseNo} />

                                <InputTag spanText="Street Area" inputType="text" required={true} inputName="streetArea" changeHandle={(e) => setUserAddressDetails((prev) => ({ ...prev, streetArea: e.target.value, }),)} inputValue={userAddressDetails.streetArea} />

                                <InputTag spanText="Landmark" inputType="text" required={true} inputName="landmark" changeHandle={(e) => setUserAddressDetails((prev) => ({ ...prev, landmark: e.target.value, }),)} inputValue={userAddressDetails.landmark} />

                                <div className="form-control">
                                    <div className="label">
                                        <span className="label-text">Pincode</span>
                                    </div>
                                    <input type="text" className="input input-bordered w-full  rounded-md bg-gray-100" name='pincode' onChange={(e) => getPincodeDetails(e.target.value)} value={userAddressDetails.pincode} />
                                </div>

                                <InputTag spanText="State" inputType="text" required={true} inputName="state" changeHandle={(e) => setUserAddressDetails((prev) => ({ ...prev, state: e.target.value, }),)} inputValue={userAddressDetails.state} />

                                <div className="form-control">
                                    <div className="label">
                                        <span className="label-text">Select City</span>
                                    </div>
                                    <select className='input input-bordered w-full  rounded-md bg-gray-100' onChange={(e) => setUserAddressDetails((prev) => ({ ...prev, city: e.target.value, }),)} value={userAddressDetails.city} >
                                        <option value="">Select City</option>
                                        {
                                            cityList.map((city, index) => <option value={city.Name} key={index} >{city.Name}</option>)
                                        }
                                    </select>
                                </div>

                            </div>
                        </div>
                        <div className='card-footer px-8'>
                            <div className='grid grid-cols-2 md:grid-cols-4 sm:grid-cols-2'>
                                <button type='submit' className="btn text-white btn-success rounded-md w-auto mr-3">Add User</button>
                                <button type='reset' className="btn text-white btn-error rounded-md ml-3 w-auto">Reset Details</button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Users;