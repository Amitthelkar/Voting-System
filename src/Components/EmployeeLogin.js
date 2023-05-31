import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const EmployeeLogin = () => {
    const [userData, setUserData] = useState({ username: "", password: "" });
    const [user, setUser] = useState([])
    const navigate = useNavigate();

    const submit = async () => {
        const jsonData = JSON.stringify(userData);
        await axios
            .post("https://localhost:7014/api/Authentication", jsonData, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {

                localStorage.setItem("token", response.data.token)
                console.log(response.data.user.userId);
                localStorage.setItem("userid",response.data.user.userId)
                if (response.data.user.role === "employee") {

                    navigate("/dashboard/employee");
                }
                else{
                    alert("You Are Not Allowes To Login In Employee Dashboard")
                }


            });

    }



    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center px-6 mx-auto py-12 lg:py-24">
                <div className="w-full bg-white rounded-lg shadow-xl md:mt-0 sm:max-w-md xl:p-0 ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight w-full text-center tracking-tight text-gray-900 md:text-2xl ">
                            Employee Login
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"
                            action="#"
                            onSubmit={async (e) => {
                                e.preventDefault();
                                console.log(userData);
                            }}
                        >
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                    placeholder="Amit"
                                    required
                                    value={userData.username}
                                    onChange={(e) => {
                                        setUserData((prevData) => {
                                            return { ...prevData, username: e.target.value };
                                        });
                                    }}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                    required
                                    autoComplete="on"
                                    value={userData.password}
                                    onChange={(e) => {
                                        setUserData((prevData) => {
                                            return { ...prevData, password: e.target.value };
                                        });
                                    }}
                                />
                            </div>

                            <button
                                type="submit"
                                onClick={submit}
                                className="w-full text-white bg-slate-800 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-center"
                            >
                                Sign in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EmployeeLogin;

