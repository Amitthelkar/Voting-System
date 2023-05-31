import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Queryjs({ query }) {
    const [solution, setSolution] = useState([]);
    const [name, setName] = useState("");
    const [solutionidd, setSolutionidd] = useState(null)
    const [pollData, setPollData] = useState({
        pollId: localStorage.getItem("pollid"),
        queryId: query.queryId,
        solutionId: "",
        userId: localStorage.getItem("userId"),
    });
    const navigate = useNavigate();
    useEffect(() => {

        // const getsolution = async () => {
        //     const res = await fetch(
        //         `https://localhost:7014/api/Solution/GetSolutionsByQueryId?queryId=${query.queryId}`
        //     );
        //     const getsol = await res.json();
        //     setSolution(await getsol);
        //     // console.log(getsol)
        // };
        // getsolution();

        axios
        .get( `https://localhost:7014/api/Solution/GetSolutionsByQueryId?queryId=${query.queryId}`, { headers: { Authorization: 'Bearer '.concat(localStorage.getItem('token')) } })
        .then((res) => {
            console.log(res.data)
            setSolution(res.data)
            
        });

        // const getqueryname = async () => {
        //     const res = await fetch(
        //         `https://localhost:7014/api/Query/GetQueryById?queryid=${query.queryId}`
        //     );
        //     const getname = await res.json();
        //     setName(await getname.query);
        //     // console.log(getname.query)
        // };
        // getqueryname();

        axios
        .get( `https://localhost:7014/api/Query/GetQueryById?queryid=${query.queryId}`, { headers: { Authorization: 'Bearer '.concat(localStorage.getItem('token')) } })
        .then((res) => {
            console.log(res.data)
            setName(res.data.query)
        });
        
        

    }, []);

    const handlesolution = async (e) => {
        const solutionid = e.target.value;
        setPollData((prevData) => {
            return {
                ...prevData,
                solutionId: solutionid,
            };
        });
   
    };



    // const handleRadioChange = async (e) => {
    //     const solutionid = e.target.value;
    //     setSolutionidd(await solutionid)
    //     console.log(solutionid)
    //     console.log(solutionidd)
   
       
    //     const jsonData = JSON.stringify(pollData);
    //     console.log(jsonData);

    //     await axios
    //         .post("https://localhost:7014/api/Response/CreateResponse", jsonData, {
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": 'Bearer '.concat(localStorage.getItem('token'))
    //             },
    //         })
    //         .then(async (response) => {
    //             console.log(response.data);
    //         });
    // };

    function handleCheck(solutionIdParam){
        console.log(solutionIdParam)
        setSolutionidd(solutionIdParam)
        const temp = {
            pollId: pollData.pollId,
            queryId: pollData.queryId,
            solutionId: solutionIdParam,
            userId: pollData.userId,
        }
        const accessToken = localStorage.getItem('token')
        console.log(accessToken)
        console.log(temp)
        axios
            .post("https://localhost:7014/api/Response/CreateResponse", temp, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer '+accessToken
                },
            })
            .then((response) => {
                console.log(response.status)
            }).catch((res)=>{
                alert('Already responded')

            })
    }

    return (
        <>
            <div className="flex flex-col items-center px-5 mx-50">
                <br />
                <div class="box-content h-1/1 w-full p-4 border-4 ">
                    <h3 className="mb-3 font-semibold text-gray-900 dark:text-Black">
                        {name}
                    </h3>
                    <ul className="w-1/1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        {solution.map((item) => {
                            return <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                <div
                                    className="flex items-center pl-3"
                                    // onClick={(e) => handlesolution(e)}
                                    // onChange={  (e) => handleRadioChange(e)}
                                >
                                    <input
                                        id="list-radio-license"
                                        type="radio"
                                        value={item.solutionId}
                                        onClick={(e)=>{
                                            if(e.target.checked)
                                                handleCheck(item.solutionId)
                                        }}
                                        name="list-radio"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                    />
                                    <label
                                        htmlFor="list-radio-license"
                                        className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        {item.solutionName}{" "}
                                    </label>
                                </div>
                            </li>
                        })}
                    </ul>
                </div>
                <Button className="voteBtn info" type="submit"></Button>
            </div>
        </>
    );
}

export default Queryjs;