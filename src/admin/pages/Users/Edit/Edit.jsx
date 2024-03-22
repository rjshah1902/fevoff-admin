"use client";
import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import moment from 'moment';
import InputTag from '../../../components/InputTag/InputTag';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import PutMothod from './../../../../api_calls/put-method/PutMethod';
import GetMethod from "./../../../../api_calls/get-method/GetMethod";
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const EditUser = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const { userId } = useParams();

    useEffect(() => {
        handleUserData();
    }, []);

    let userData = {
        name: "",
        email: "",
        contact: "",
        dob: "",
        gender: "",
        password: "",
    }

    const [userDetails, setUserDetails] = useState(userData);

    const handleUserData = async () => {

        const url = "users";
        const response = await GetMethod(url, userId);

        if (response.status === true) {
            const users = response.data.data;

            setUserDetails((prev) => ({
                ...prev,
                name: users.name || "",
                email: users.email || "",
                contact: users.contact || "",
                dob: users.dob ? moment(users.dob).format("YYYY-MM-DD") : "",
                gender: users.gender || "",
            }));
        } else {
            setErrorMessage(response.message);
        }
    }


    const handleUserDataUpdate = async (event) => {
        event.preventDefault();

        const url = "users";
        const response = await PutMothod(url, userId, userDetails);

        if (response.status === true) {

            swal("Good job!", "User Updated Successfully", "success")

        } else {
            setErrorMessage(response.message);
        }
    }

    return (
        <>
            <section className="mx-auto w-full">
                <Breadcrumbs breadcumr1={"Manage Users"} breadcumr1_link={"/users/list"} breadcumr2={"Edit User"} button_name={""} button_link={""} />
                <div className='card bg-white rounded-sm pb-5 mb-5'>
                    <form method='POST' onSubmit={handleUserDataUpdate} autoComplete='off' >
                        <div className='card-body'>
                            {
                                (errorMessage !== "") ? <>
                                    <ErrorMessage message={errorMessage} />
                                </> : ""
                            }

                            <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>

                                <InputTag spanText="User Name" inputType="text" required={true} inputName="name" changeHandle={(e) => setUserDetails((prev) => ({ ...prev, name: e.target.value, }),)} inputValue={userDetails.name} />

                                <InputTag spanText="Email Address" inputType="email" required={true} inputName="email" changeHandle={(e) => setUserDetails((prev) => ({ ...prev, email: e.target.value, }),)} inputValue={userDetails.email} disabledValue={true} />

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
                                    <input type="date" className="input input-bordered w-full  rounded-md bg-gray-100" min={moment().subtract(80, 'years').format("YYYY-MM-DD")} max={moment().subtract(10, 'years').format("YYYY-MM-DD")} onChange={(e) => setUserDetails((prev) => ({ ...prev, dob: e.target.value, }),)} value={userDetails.dob} />
                                </div>

                                <div className="form-control">
                                    <div className="label">
                                        <span className="label-text">User Gender</span>
                                    </div>
                                    <select className='input input-bordered w-full  rounded-md bg-gray-100' onChange={(e) => setUserDetails((prev) => ({ ...prev, gender: e.target.value, }),)} value={userDetails.gender} >
                                        <option value="">Select Gender</option>
                                        <option value={"Male"}>Male</option>
                                        <option value={"Female"}>Female</option>
                                        <option value={"Other"}>Other</option>
                                    </select>
                                </div>

                                <InputTag spanText="Password (Enter Password If you want to change)" inputType="text" required={false} inputName="password" changeHandle={(e) => setUserDetails((prev) => ({ ...prev, password: e.target.value, }),)} inputValue={userDetails.password} />

                            </div>
                        </div>
                        <div className='card-footer px-8'>
                            <div className='grid grid-cols-2 md:grid-cols-4 sm:grid-cols-2'>
                                <button type='submit' className="btn text-white btn-success rounded-md w-auto mr-3">Update User</button>
                                <Link to={"/users/list"} className='btn tbn-secondary bg-gray-400'>
                                    Back To List
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default EditUser;