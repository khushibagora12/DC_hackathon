'use client'

import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify'
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
    const [submit, setSubmit] = useState(false);
    const [signupData, setsignupData] = useState({
        username: '',
        email: '',
        password: ''
    })
    const router = useRouter();
    async function submitHandler(e: React.FormEvent) {
        e.preventDefault();
        if(signupData.username === '' || signupData.email === '' || signupData.password === ''){
                    toast("All fields are required")
                    return;
        }
        setSubmit(true);
        try {
            const res = await fetch('/api/authentication/signup', {
                method: "POST",
                headers: {
                    'content-type': "application/json",
                },
                body: JSON.stringify(signupData)
            })
            const response = await res.json();
            console.log(response)
            toast(response.message);

            if (response.message === 'signed up successfully') {
                setsignupData({ ...signupData, username: '', email: '', password: '' })
                router.push('/login');
            }
            setSubmit(false);

        } catch (error: unknown) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="flex justify-center items-center h-svh overflow-clip bg-linear w-full ">
                <div className="flex flex-col md:flex-row items-center justify-center w-full h-[90%] m-10 bg-white rounded-2xl">
                    <div className="justify-center m-auto">
                        <p className={`text-2xl font-medium text-black`}>Get Started Now</p>
                        <form className="mt-5">
                            <div>
                                <label htmlFor="username" className={`text-sm text-gray-700`}>Username</label><br />
                                <input name="username" type="text" placeholder="Enter username" className="border-2 border-gray-200 rounded-xl p-2 w-60 text-black"
                                    value={signupData.username}
                                    onChange={(e) => {
                                        setsignupData({ ...signupData, username: e.target.value })
                                    }} />
                            </div>
                            <div className="mt-3">
                                <label htmlFor="email" className={`text-sm text-gray-700`}>Email</label><br />
                                <input name="email" type="email" placeholder="Enter email" className="border-2 border-gray-200 rounded-xl p-2 w-60 text-black"
                                    value={signupData.email}
                                    onChange={(e) => {
                                        setsignupData({ ...signupData, email: e.target.value })
                                    }} />
                            </div>
                            <div className="mt-3">
                                <label htmlFor="password" className={`text-sm text-gray-700`}>Password</label><br />
                                <input name="password" type="password" placeholder="Enter password" className="border-2 border-gray-200 rounded-xl p-2 w-60 text-black"
                                    value={signupData.password}
                                    onChange={(e) => {
                                        setsignupData({ ...signupData, password: e.target.value })
                                    }} />
                            </div>

                            <button className="mt-5 w-60 p-2 rounded-xl font-bold bg-gray-500" onClick={submitHandler}>{submit === true ? "submitting" : "SignUp"}</button>
                        </form>
                        <div className={`mt-5 text-[#545454] text-sm`}>Already have an account?<Link href={'/login'} className="font-bold">SignIn</Link></div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}