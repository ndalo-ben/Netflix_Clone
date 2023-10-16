"use client"

import Image from "next/image"
import { CgLogOut } from "react-icons/cg"

export default function AccountPopup({accounts, signOut, loggedInAccount, setLoggedInAccount, setPageLoader}){
    return <div className="px-8 py-8 fixed flex flex-col items-start right-[45px] bg-black top-[50px] opacity-[0.85] z-[999]">
        <div className="flex flex-col gap-5">
            {
                accounts && (accounts.length ? accounts
                .filter((item) => item._id !== loggedInAccount?._id)     
                .map((account) => <div 
                onClick={() => {setLoggedInAccount(nll)
                sessionStorage.removeItem("loggedInAccount")}
                }
                className="cursor-pointer flex gap-5" key={account._id}>
                    <Image src="/netflix.png" alt="Account" height={30} width={30} 
                    className="max-w-[30px] rounded min-w-[20px] max-h-[30px] min-h-[20px] object-cover w-[30px] h-[30px]"
                    />
                    <p className="font-semibold mb-4">{account.name}</p>
                </div>) : null)              
                
            }
        </div>
        <button className="flex items-center gap-1 w-28 border p-1 bg-[#e5b109] outline-none rounded-lg text-white text-center justify-center text-sm bottom-2 font-bold" 
        onClick={() => {
            setPageLoader(true)
            signOut()
            setLoggedInAccount(null)
            sessionStorage.removeItem("loggedInAccount")
        }}
        ><CgLogOut size={25}/> Sign Out</button>
    </div>
}