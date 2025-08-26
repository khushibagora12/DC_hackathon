'use client'

import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
interface Seat {
    seatId: string,
    userId: string
}
interface User {
    seat: Seat[],
    eventId: string
}
export default function DashboardHomePage() {
    const [seatId1, setSeatId1] = useState(0)
    const [select, setSelect] = useState(0)
    const [seatData, setSeatData] = useState<User[]>([{
        seat: [{
            seatId: '',
            userId: ''
        }
        ],
        eventId: ''
    }]);

    const seats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    console.log(seatId1)
    const submitHandler = async () => {
        const eventData = {
            seatID: seatId1
        }
        const res = await fetch('/api/event/', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(eventData)
        })
        const response = await res.json();
        console.log(response)
        toast(response.message)
    }
    useEffect(() => {
        const getSeatData = async () => {
            try {
                const res = await fetch('/api/event', {
                    method: "GET"
                });
                const response = await res.json();
                console.log("fetch res: ", response);
                setSeatData(response)

            }
            catch (error: unknown) {
                console.log("error in fetching booking details!")
            }
        }
        getSeatData()
    },
        [])
    console.log("state data: ", seatData);
    console.log(seatData)
    return (
        <>
            <div>
                <ol>
                    <li>
                        <div className="w-[80%] border-2 border-gray-400 rounded-2xl m-10 p-8">
                            <h1 className="font-bold text-2xl">Event 1</h1>
                            <div className="flex">
                                {seats.map((seat: number, index: number) => (
                                    <div key={index} onClick={() => {
                                        setSeatId1(seat)
                                        setSelect(seat)
                                    }} className={`p-2 border ${select == seat ? 'bg-green-500' : ''}`}>{seat}</div>
                                ))}
                            </div>
                            <button onClick={submitHandler} className="p-3 bg-gray-300 mt-5 rounded-2xl font-bold">confirm</button>
                        </div>
                        <div>
                            {seatData.map((seat, index) => (
                                <div key={index} className="m-10 p-10 border">
                                    Event: {seat.eventId}
                                    {seat.seat.map((st, idx) => (
                                        <div key={idx}>
                                            seat no. - {st.seatId}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </li>
                </ol>
                <div className="">
                    <button className="m-10 bg-red-500 p-3 rounded-2xl font-bold items-baseline-last" onClick={() => { signOut({ callbackUrl: '/login' }) }}>LogOut</button>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}