import { ConnectDB } from "@/connectDB/connectDB";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; 

export async function POST(req:NextRequest) {
    try {
        await ConnectDB();
        const body = await req.json();
        console.log(body)
        const {username , email , password} = body;
        console.log("body : ",body);
        console.log("u : ",username);
        console.log("e : ",email);
        console.log("p : ",password);

        const user = await User.findOne({email});
        if(user){
            return NextResponse.json({message : "user already exist!"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const createuser = new User({
            username: body.username,
            email: body.email,
            password : hashedPassword
        });
        const saved = await createuser.save();
        console.log("saved data",saved)

        return NextResponse.json({message : "signed up successfully"});


    } catch (error : unknown) {
        console.log(error)
        return NextResponse.json({error : "error"}, {status : 500});
    }
    
}
export async function GET() {
    const session = await getServerSession(authOptions);
    if(!session || !session?.user.id){
        return NextResponse.json("unauthorized");
    }
    try {
        await ConnectDB();
        const user = await User.findById(session?.user.id);
        console.log("user: ", user);
        return NextResponse.json(user);
    } 
    catch (error : unknown) {
        console.log(error)
        return NextResponse.json({error: "error"}, {status : 500})
    }
}
