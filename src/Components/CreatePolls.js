import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreatePolls() {


    const [poll, setPoll] = useState([]);
    const [query, setQuery] = useState([]);
    // const [pollId, setPollId] = useState("")
    // const [queryId, setQueryId] = useState('');
    const [pollData, setPollData] = useState({ pollId: '', queryId: "" });
    const [res, setRes] = useState("")
    const navigate=useNavigate();
   
    useEffect(() => {
        // const getpoll = async () => {
        //     const res = await fetch("https://localhost:7297/api/Poll/GetPolls");
        //     const getpoll = await res.json();

        //     setPoll(await getpoll)
        // }

        // getpoll();

        axios
        .get( `https://localhost:7014/api/Poll/GetPolls`, { headers: { Authorization: 'Bearer '.concat(localStorage.getItem('token')) } })
        .then((res) => {
            
                console.log(res.data)
                setPoll(res.data)
        
            
        });

        // const getquery = async () => {
        //     const res = await fetch("https://localhost:7297/api/Query/GetQueries");
        //     const getque = await res.json();
        //     setQuery(await getque)
        // }
        // getquery();

        
        axios
        .get( `https://localhost:7014/api/Query/GetQueries`, { headers: { Authorization: 'Bearer '.concat(localStorage.getItem('token')) } })
        .then((res) => {
            console.log(res.data)
            setQuery(res.data)
            
        });
    }, [])

    const handlepoll = (e) => {
        const pollid = e.target.value;
        // setPollId(pollid);
        setPollData((prevData) => {
            return { ...prevData, pollId: e.target.value };
        });
        console.log(pollid)
    }



    const handlequery = (e) => {
        const queryid = e.target.value;
        // setQueryId(queryid);
        setPollData((prevData) => {
            return { ...prevData, queryId: e.target.value };
        });
        console.log(queryid)
    }

    const create = async () => {
        // setPollData((prevData) => {
        //     return { ...prevData, queryId: queryId };
        // });
        const jsonData = JSON.stringify(pollData);
        console.log(jsonData)
        await axios
            .post("https://localhost:7014/api/PollQuery/CreatePollQuery", jsonData, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer '.concat(localStorage.getItem('token'))
                },
            })
            .then(async (response) => {
                console.log(response.data)
                    setRes(response.data)
                    navigate("/dashboard/admin")
               
              
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

                <label htmlFor="queries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                <select id="queries" onChange={(e) => handlequery(e)} className="bg-blue-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>Choose Query</option>
                    {
                        query.map((queryget) => (
                            <option key={queryget.queryId} value={queryget.queryId}>{queryget.query}</option>

                        ))
                    }
                </select>
            </div>
            <div className='flex flex-col items-center px-5 mx-50 '>
                <button
                    className="!absolute my-10 z-10 select-none rounded bg-blue-500  py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] "
                    type="submit"
                    onClick={create}
                    data-ripple-light="true"
                >
                    Create Poll
                </button>

            </div>
         
        
        </>
    );
}

export default CreatePolls;
