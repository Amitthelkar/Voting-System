import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SetSolution() {

    const [query, setQuery] = useState([]);
    const [queryId, setQueryId] = useState('');
    const [solution, setSolution] = useState({ solutionName: "", queryId: "" })

    const navigate=useNavigate();



    useEffect(() => {


        const getquery = async () => {
            const res = await fetch("https://localhost:7297/api/Query/GetQueries");
            const getque = await res.json();
            setQuery(await getque)
        }
        getquery();
    }, [])

    const handlequery = (e) => {
        const queryid = e.target.value;
        setQueryId(queryid);
        console.log(queryid)
    }

    const onChangeText = e => {
        e.preventDefault();
        setSolution((prevData) => {
            return { ...prevData, solutionName: e.target.value };
        });
        // setSolution(e.target.value);
    };

    const create = async () => {
        setSolution((prevData) => {
            return { ...prevData, queryId: queryId };
        });
        const jsonData = JSON.stringify(solution);
        console.log(jsonData)
        await axios
            .post("https://localhost:7297/api/Solution/CreateSolution", jsonData, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(async (response) => {
                 console.log( await response.data)
                navigate("/dashboard/admin")
            });
    }

    return (
        <>
            <div className='flex flex-col items-center px-5 mx-50 '>

                <label for="queries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                <select id="queries" onChange={(e) => handlequery(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>Choose Query</option>
                    {
                        query.map((queryget) => (
                            <option key={queryget.queryId} value={queryget.queryId}>{queryget.query}</option>

                        ))
                    }
                </select>
            </div>



            <div className='flex flex-col items-center px-6 mx-auto py-12 lg:py-24'>
                <div className="relative flex h-15 w-full min-w-[400px] max-w-[50rem]">
                    <input
                        type="text"
                        className="peer h-full w-full rounded-[7px] border border-blue-black-200 border-blue-black-200 bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 "
                        placeholder="Write Here"
                        onChange={onChangeText}
                        required
                    />
                    <button
                        className="!absolute right-1 top-1 z-10 select-none rounded bg-blue-800  py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
                        type="submit"
                        onClick={create}
                        data-ripple-light="true"
                    >
                        Set Solution
                    </button>

                </div>
            </div>
        </>
    );
}

