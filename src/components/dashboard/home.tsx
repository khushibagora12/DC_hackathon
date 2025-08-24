import { Queue } from "bullmq"
import { useState } from "react";

export default function Home() {
    const [seatId, setSeatId] = useState("")
    const myQueue = new Queue('foo');

    async function addJobs() {
        await myQueue.add('myJobName', { foo: 'bar' });
        await myQueue.add('myJobName', { qux: 'baz' });
    }
    return (
        <>
            <ol>
                <li>Event 1
                    {}
                </li>
                <li>Event 2</li>
            </ol>
        </>
    )
}