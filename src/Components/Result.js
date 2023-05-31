import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import EachResult from './EachResult';
import axios from 'axios';

function Result() {

    const [poll, setPoll] = useState([]);
    const [query, setQuery] = useState([]);
    const [pollData, setPollData] = useState({ pollId: '', queryId: "", solutionId: "", userId: '' });

    useEffect(() => {
        axios
        .get( `https://localhost:7014/api/Poll/GetPolls`, { headers: { Authorization: 'Bearer '.concat(localStorage.getItem('token')) } })
        .then((res) => {
            console.log(res.data)
            setPoll(res.data) 
        });  
    }, [])

    const handlepoll = (e) => {
        const pollid = e.target.value;
        setPollData((prevData) => {
            return { ...prevData, pollId: e.target.value };
        });
        console.log(pollid)
        localStorage.setItem("pollid",pollid)

        axios
        .get( `https://localhost:7014/api/Query/GetQueriesByPollId?pollId=${pollid}`, { headers: { Authorization: 'Bearer '.concat(localStorage.getItem('token')) } })
        .then((res) => {
            console.log(res.data)
            setQuery(res.data)
            console.log(query)
        });
    }
    return (
        <>
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
                            <EachResult key={que.queryId} query={que} />
                        ))}
                    </Row>
                </div>
            </div>
        </>
    );
}

export default Result;
