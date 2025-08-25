import dotenv from 'dotenv'
import { Worker } from "bullmq";
import EventModel from "../models/event";
import { ConnectDB } from "../connectDB/connectDB";

dotenv.config({ path: ".env.local" });

const func = async () => {
    await ConnectDB();
    console.log("entering worker")
    console.log(process.env.REDIS_URL)

    const myWorker = new Worker('booked_seats', async job => {
        console.log("job data: ", job.data)
        console.log("job seatid: ", job.data.seatid)
        console.log("user id: ", job.data.userid)

        const seatData = {
            seatId: job.data.seatid,
            userId: job.data.userid
        }
        const seat = [seatData]
        console.log("seat data: ", seat)
        const occupied_seat = await EventModel.findOne({ 'seat.seatId' : job.data.seatid })
        if (occupied_seat) {
            console.log("seat taken")
            
            return;
        }
        else {
            const findEvent = await EventModel.findOne({ eventId : "1" });
            if (findEvent) {
                console.log("updating in existing event")
                findEvent.seat.push(seatData)
                await findEvent.save();
            }
            else {
                const ev = new EventModel({
                    eventId: 1,
                    seat
                })
                const saved = await ev.save();
                console.log("saved user: ", saved)
            }
        }
    }, {
        connection: {
            url: process.env.REDIS_URL,
        },
    });
    myWorker.on('completed', async (job) => {
        console.log("success", job.data)
        await job.remove()

    })
    myWorker.on('failed', (job, error) => {
        console.log("failed", job?.id)
        console.log(error)
    })
    console.log("worker is running")
}
func();