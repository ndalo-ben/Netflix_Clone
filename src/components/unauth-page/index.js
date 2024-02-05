"use client"

import { signIn } from "next-auth/react"
import Image from "next/image"

export default function UnauthPage() {
    return (
        <div className='bg-white flex flex-col items-center justify-center h-screen'>
            <button
                onClick={() => signIn("google")}
                className="relative flex items-center text-black font-semibold text-xl font-sans h-12 bg-slate-100 px-4 rounded-lg shadow-xl hover:bg-slate-200">
                Sign In With
                <Image
                    src="/google.png"
                    width={80}
                    height={80}
                    alt='google'
                />
            </button>
        </div>
    )
}