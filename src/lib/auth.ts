import { ConnectDB } from "@/connectDB/connectDB";
import User from "@/models/userModel";
import { NextAuthOptions } from "next-auth";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    console.log("credentials not found")
                    return null;
                }
                try {
                    await ConnectDB();
                    //find user
                    const user = await User.findOne({ email: credentials?.email });
                    if (!user) {
                        console.log("user not found")
                        return null;
                    }
                    //match the password now
                    const compare = await bcrypt.compare(credentials!.password, user.password);
                    if (!compare) {
                        console.log("password doesn't match")
                        return null;
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email
                    };

                } catch (error : unknown) {
                    console.log(error);
                    return null;
                }
            }
        })
    ],
    session : {
        strategy : "jwt"
    },
    secret : process.env.NEXTAUTH_SECRET,
    pages : {
        signIn : "/",
    },
    callbacks : {
        async jwt({token, user}){
            if(user){
                token.id = user.id
            }
            return token;
        },
        async session({session, token}){
            if(session.user){
                session.user.id = token.id as string;
            }
            return session;
        }
    }
}
