import mongoose from "mongoose";

export async function ConnectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("db connected")
        })

        connection.on('error', (err) => {
            console.log("connection error occurred: " + err)
            return;
        })
    } 
    catch (error) {
        console.log("something went wrong in connecting db");
        console.log(error)
    }
}