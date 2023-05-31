import React, { useEffect, useState } from 'react';
import axios from "axios";

function EachResult({ query }) {

   
    const [solution, setSolution] = useState([])
    const [name, setName] = useState("")
    const [result, setResult] = useState(null)
    const [pollId, setPollId] = useState(localStorage.getItem("pollid"));
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setPollId(localStorage.getItem("pollid"));
    
        axios
        .get( `https://localhost:7014/api/Solution/GetSolutionsByQueryId?queryId=${query.queryId}`, { headers: { Authorization: 'Bearer '.concat(localStorage.getItem('token')) } })
        .then((res) => {
            console.log(res.data)
            setSolution(res.data)
        });

        axios
        .get( `https://localhost:7014/api/Result/GetRankedSolutionCount/${pollId}/${query.queryId}`, { headers: { Authorization: 'Bearer '.concat(localStorage.getItem('token')) } })
        .then((res) => {
            console.log(res.data)
            setResult(res.data)
            console.log(result)
            setIsLoaded(true);   
        });

        axios
        .get( `https://localhost:7014/api/Query/GetQueryById?queryid=${query.queryId}`, { headers: { Authorization: 'Bearer '.concat(localStorage.getItem('token')) } })
        .then((res) => {  
            setName(res.data.query)  
        });

    }, [isLoaded])


    return (
        <>
            <div className="flex flex-col items-center px-5 mx-50">
                <br />
                <div class="box-content h-1/1 w-full p-4 border-4 ">
                    <h3 className="mb-3 font-semibold text-gray-900 dark:text-Black">
                        {name}
                    </h3>
                    <ul className="w-1/1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        {solution.map((item) => (
                            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                <div
                                    className="flex items-center pl-3"
                                >
                                    <label
                                        className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        {item.solutionName}{"          "} 
                                    </label>
                                    {
                                            result && Object.entries(result).map(entry => {
                                                const [key, value] = entry;
                                                console.log(key, value);
                                                if (key === item.solutionName) {
                                                    return  <span className= "mx-2" >
                                                        {value}
                                                    </span>
                                                }
                                            })
                                        }
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default EachResult;
