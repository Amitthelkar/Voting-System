import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateQuery() {

    const [query, setQuery] = useState({query:""});

    const navigate = useNavigate();

    const onChangeText = e => {
        e.preventDefault();
        setQuery((prevData) => {
            return { ...prevData, query: e.target.value };
        });
    };
    const create = async () => {
       const jsonData=JSON.stringify(query);
       const token1 = localStorage.getItem("token")
       console.log(jsonData)
        await axios
        .post("https://localhost:7014/api/Query/CreateQuery", jsonData, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer '.concat(localStorage.getItem('token'))
            },
        })
        .then(async (response) => {
            console.log(response.data)
            navigate("/setsolution")
        });



    }
    
    // function create(e) {
    //     e.preventDefault();
    //     console.log("from send approver")
    //     navigate("/approverdashboard")
    // }

    return (
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
                    Create
                </button>
                
            </div>
        </div>
    );
}

export default CreateQuery;
