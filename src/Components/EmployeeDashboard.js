import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Queryjs from './Queryjs';
import { Link } from "react-router-dom";

function EmployeeDashboard() {

    const [poll, setPoll] = useState([]);
    const [query, setQuery] = useState([]);
    const [solution, setSolution] = useState([]);
    const [pollId, setPollId] = useState(null)
    const [pollData, setPollData] = useState({ pollId: '', queryId: "", solutionId: "", userId: '' });

    const navigate = useNavigate();

    useEffect(() => {
        // const getpoll = async () => {
        //     // console.log(localStorage.getItem("token"));
        //     const res = await fetch("https://localhost:7014/api/Poll/GetPolls",{
        //         headers: {Authentication:'Bearer '.concat(localStorage.getItem("token"))}
        //       });
        //     const getpoll = await res.json();
        //     setPoll(await getpoll)
        //     console.log(getpoll)
        // }
        // getpoll();
        axios
            .get("https://localhost:7014/api/Poll/GetPolls", { headers: { Authorization: 'Bearer '.concat(localStorage.getItem('token')) } })
            .then((res) => {
                // console.log(res.data)
                setPoll(res.data)
            });
    }, [])




    const handlepoll = (e) => {
        const pollid = e.target.value;
        setPollData((prevData) => {
            return { ...prevData, pollId: e.target.value };
        });
        console.log(pollid)
        localStorage.setItem("pollid", pollid)
        // const getquery = async () => {
        //     const res = await fetch(`https://localhost:7014/api/PollQuery/GetPollQueryByPollId?pollId=${pollid}`, { headers: { Authorization: 'Bearer '.concat(localStorage.getItem('token')) } });
        //     const getque = await res.json();
        //     setQuery(await getque)
        //     console.log(getque)
        // }
        // getquery();
        axios
            .get(`https://localhost:7014/api/PollQuery/GetPollQueryByPollId?pollId=${pollid}`, { headers: { Authorization: 'Bearer '.concat(localStorage.getItem('token')) } })
            .then((res) => {
                console.log(res.data)
                setQuery(res.data)

            });
    }


    return (
        <>
            <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-5">


                <div className="rounded overflow-hidden shadow-lg">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Create Query</div>
                        <Link
                            to="/result"
                            style={{ display: "flex", justifyContent: "center" }}
                            className="flex rounded-lg items-center bg-gray-100 p-8 space-x-3 w-1/1 hover:shadow-lg "
                        >
                            <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="w-4 h-5"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                </svg>
                            </div>
                            <h2 className="text-gray-900 text-lg title-font font-medium">
                                View Result
                            </h2>
                            <div className=" text-indigo-500 inline-flex items-center">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="w-4 h-4 ml-2"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                                </svg>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='flex flex-col items-center px-5 mx-50 '>
                <label htmlFor="poll" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                <select id="poll" onChange={(e) => handlepoll(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>Choose Poll Name</option>
                    {
                        poll.map((pollget) => (
                            <option key={pollget.pollId} value={pollget.pollId}>{pollget.pollName}</option>

                        ))
                    }
                </select>
            </div>
            <div className='flex flex-col items-center px-5 mx-50 '>
                <div className='row-wrapper w-1/1'>
                    <Row>
                        {query.map(que => (
                            <Queryjs key={que.queryId} query={que} />
                        ))}
                    </Row>
                </div>
            </div>
        </>
    );
}

export default EmployeeDashboard;
