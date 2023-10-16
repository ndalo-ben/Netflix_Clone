"use client"

import { signIn } from "next-auth/react"
import Image from "next/image"

export default function UnauthPage(){
    return (
        <div className='bg-white flex flex-col items-center justify-center h-screen'>
            <button onClick={() => signIn("google")}className="flex items-center text-black font-semibold text-2xl font-sans bg-slate-100 px-4 rounded-lg shadow-xl">Sign In With <Image src="/google.png" width={100} height={100} alt=''/> </button>
        </div>
    )
}