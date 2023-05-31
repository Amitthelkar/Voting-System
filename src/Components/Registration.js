import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registration() {

    const [userData, setUserData] = useState({ username: "", email: "", password: "" });
    const navigate = useNavigate();

    const submit = async () => {

        var jsonData = JSON.stringify(userData);
        console.log(jsonData);
        await axios
            .post("https://localhost:7297/api/User/CreateUser", jsonData, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer '.concat(localStorage.getItem('token'))
                },
            })
            .then((response) => {

                console.log(response.data);
                if (response.data) {
                    navigate("/login/student");
                }
              

            });
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Register Here
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        className="space-y-4 md:space-y-6"
                        action="#"
                        onSubmit={async (e) => {
                            e.preventDefault();
                            console.log(userData);
                        }}
                    >
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    autoComplete=""
                                    placeholder="Amit"
                                    required
                                    className="block w-full rounded-md border-0 py-2 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={userData.username}
                                    onChange={(e) => {
                                        setUserData((prevData) => {
                                            return { ...prevData, username: e.target.value };
                                        });
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="/" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={userData.password}
                                    onChange={(e) => {
                                        setUserData((prevData) => {
                                            return { ...prevData, password: e.target.value };
                                        });
                                    }}

                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                onClick={() => submit()}
                                className="w-full text-white bg-slate-800 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-center"
                            >
                                Register 
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
