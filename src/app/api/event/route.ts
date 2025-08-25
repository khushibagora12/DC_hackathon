import { NextResponse, NextRequest } from "next/server";
import { Queue } from "bullmq";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const booked_seats = new Queue('booked_seats', {
    connection:
        { url: process.env.REDIS_URL }
});
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        const body = await req.json()
        console.log("body: ", body)
        console.log("userId: ", session?.user.id)
        const enqueue = async () => {
            await booked_seats.add('seatID', { seatid: body.seatID, userid: session?.user.id })
        }
        await enqueue();

        return NextResponse.json({ message: "request in queue" })
    } catch (error: unknown) {
        console.log(error);
        return NextResponse.json({ message: "error in event route" })
    }
}