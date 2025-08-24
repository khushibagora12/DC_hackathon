import { NextRequest, NextResponse } from "next/server";


export default function POST(req: NextRequest){
    try {
        const body = req.json();
        
    } catch (error: unknown) {
        console.log(error);
        NextResponse.json({message: "error in signing up"})
        
    }
}