// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req : NextRequest){
//     try {
        
//     } catch (error: unknown) {
//         console.log(error)
//         NextResponse.json({message: "error in "})
//     }
// }
import { Queue } from 'bullmq';

const myQueue = new Queue('foo');

async function addJobs() {
  await myQueue.add('myJobName', { foo: 'bar' });
  await myQueue.add('myJobName', { qux: 'baz' });
}

await addJobs();