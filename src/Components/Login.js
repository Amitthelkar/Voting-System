
import React from 'react'
import {Link} from 'react-router-dom'



const Login = () => {


    

    return (

        <div>
            <section className="bg-[#F3F4F6] pt-20 pb-10 lg:pt-[120px] lg:pb-20">
                <div className="flex w-5/5 space-x-1">
                    <Link
                        to="/login/student"
                        className="flex rounded-lg items-center bg-gray-100 p-8 space-x-4 w-1/2 hover:shadow-lg"
                    >
                        <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                            <svg
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                            >
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                            </svg>
                        </div>
                        <h2 className="text-gray-900 text-lg title-font font-medium">
                            Student Login
                        </h2>
                        <div className=" text-indigo-500 inline-flex items-center">
                            <svg
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                className="w-4 h-4 ml-2"
                                viewBox="0 0 24 24"
                            >
                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </div>
                    </Link>
                    <Link
                        to="/login/faculty"
                        className="flex rounded-lg items-center bg-gray-100 p-8 space-x-4 w-1/2 hover:shadow-lg"
                    >
                        <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                            <svg
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                            >
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                            </svg>
                        </div>
                        <h2 className="text-gray-900 text-lg title-font font-medium">
                            Faculty Login
                        </h2>
                        <div className=" text-indigo-500 inline-flex items-center">
                            <svg
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                className="w-4 h-4 ml-2"
                                viewBox="0 0 24 24"
                            >
                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </div>
                    </Link>

                    <Link
                        to="/login/admin"
                        className="flex rounded-lg items-center bg-gray-100 p-8 space-x-4 w-1/2 hover:shadow-lg"
                    >
                        <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                            <svg
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                            >
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                            </svg>
                        </div>
                        <h2 className="text-gray-900 text-lg title-font font-medium">
                        Admin Login
                        </h2>
                        <div className=" text-indigo-500 inline-flex items-center">
                            <svg
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                className="w-4 h-4 ml-2"
                                viewBox="0 0 24 24"
                            >
                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </div>
                    </Link>
                </div>
            </section>

        </div>

    )
}

export default Login
