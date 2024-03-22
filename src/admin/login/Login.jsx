import React, { useEffect, useState } from 'react'
import AdminLogin from '../../api_calls/admin/login/AdminLogin';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';

const Login = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errorMessage, setErrorMessage] = useState("");
    const [btnDisable, setBtnDisable] = useState(false);
    const [btnText, setBtnText] = useState("Login");
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        checkAdminStatus();
    }, []);

    const checkAdminStatus = () => {

        const token = localStorage.getItem("admin_token");
        const admin_id = localStorage.getItem("admin_id");

        if (token !== "" && token != null && admin_id !== "" && admin_id != null) {

            window.location.replace('/dashboard');

        } else { setShowForm(true); }
    };

    const handleAdminLogin = async (e) => {

        e.preventDefault();
        setBtnDisable(true);
        setBtnText("Loading...");

        const object = {
            email: email,
            password: password,
        };

        const reponse = await AdminLogin(object);

        if (reponse.status === true) {

            const data = reponse.data.data;
            localStorage.setItem("admin_token", reponse.data.jwt_token);
            localStorage.setItem("admin_id", data.id);
            localStorage.setItem("admin_name", data.name);
            localStorage.setItem("admin_email", data.email);

            window.location.replace('/dashboard');

        } else {
            setBtnDisable(false);
            setBtnText("Login");
            setErrorMessage(reponse.message);
        }
    };

    return (
        <>
            {(showForm === true) ?
                <section>
                    <div className=" items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">

                            {
                                (errorMessage !== "") ? <>
                                    <ErrorMessage message={errorMessage} />
                                </> : ""
                            }

                            <div className="mb-2 flex justify-center text-5xl font-semibold italic mt-7 md:mt-2">
                                Fevoff
                            </div>
                            <h2 className="text-center text-3xl font-bold leading-tight  text-gray-500 italic mt-7 md:mt-3">
                                Admin Login
                            </h2>

                            <form onSubmit={handleAdminLogin} method="POST" className="mt-8" autoComplete='off' >
                                <div className="space-y-5">
                                    <div>
                                        <label htmlFor="" className="text-base font-medium text-gray-900">
                                            Email address
                                        </label>
                                        <div className="mt-2">
                                            <input className="flex h-15 w-full rounded-md border border-gray-300 bg-transparent px-3 py-4 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50" type="email" placeholder="Email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="" className="text-base font-medium text-gray-900">
                                                Password
                                            </label>
                                        </div>
                                        <div className="mt-2">
                                            <input className="flex h-15 w-full rounded-md border border-gray-300 bg-transparent px-3 py-4 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50" type="password" placeholder="Password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className='mt-4'>
                                        <button type='submit' disabled={btnDisable} className="inline-flex w-full items-center justify-center rounded-md px-3.5 py-2.5 font-semibold leading-7 text-black hover:bg-gray-500/70 hover:text-white hover:border-2 hover:border-gray-500/50 border-2 border-black text-xl italic">
                                            {btnText}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
                :
                <></>
            }
        </>
    )
}

export default Login;