'use client'

import { useState } from "react";

export default function DashboardHomePage() {
    const [seatId1, setSeatId1] = useState(0)
    const seats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    console.log(seatId1)
    const submitHandler = async() => {
        const eventData = {
            seatID : seatId1
        }
        const res = await fetch('/api/event/', {
            method : "POST",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(eventData)
        })
        const response = await res.json();
        console.log(response)
    }
    return (
        <>
            <ol>
                <li>Event 1
                    <div className="flex">

                        {seats.map((seat: number, index: number) => (
                            <div key={index} onClick={() => setSeatId1(seat)} className={`p-2 border`}>{seat}</div>
                        ))}
                    </div>
                    <button onClick={submitHandler}>book</button>
                </li>
            </ol>
        </>
    )
}