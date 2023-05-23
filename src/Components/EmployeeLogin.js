
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EmployeeLogin = () => {
    const [userData, setUserData] = useState({ email: "", password: "" });
   
   const navigate = useNavigate();

    const submit = async () => {

        var jsonData = JSON.stringify(userData);
        console.log(jsonData);
        await axios
            .post("http://127.0.0.1:8000/api/auth/", jsonData, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(async (response) => {
                localStorage.setItem('token',response.data.access);
                await axios
                    .get("http://127.0.0.1:8000/api/user/me/", { headers: { Authorization:  'Bearer '.concat(response.data.access) } })
                    .then((res) => {  
                        localStorage.setItem('userid',res.data.id);
                      
            
                        if (res.data.role === "student") {
                            navigate("/studentdashboard")
                        }
                        if (res.data.role === "faculty") {
                            navigate("/facultydashboard")
                        }

                    });
            });

    };
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

                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Username
                                </label>
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                    placeholder="JhonDoe"
                                    required
                                    value={userData.email}
                                    onChange={(e) => {
                                        setUserData((prevData) => {
                                            return { ...prevData, email: e.target.value };
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
                                onClick={() => submit()}
                                className="w-full text-white bg-slate-800 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
