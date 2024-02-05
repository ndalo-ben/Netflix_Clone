"use client"

import Image from "next/image";
import { AiFillPlayCircle } from "react-icons/ai";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useRouter } from "next/navigation";

require('dotenv').config()
const baseUrl = process.env.BASE_URL

export default function Banner({ medias }) {
    const router = useRouter();

    const createRandomMedia = medias && medias.length ? medias[Math.floor(Math.random() * medias.length)] : null;
    return <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12 lg:pl-24">
        <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
            <Image src={`${baseUrl}/${createRandomMedia?.backdrop_path || createRandomMedia?.poster_path}`} alt="banner" layout="fill" objectFit="cover" />
            <div className="absolute h-32 w-screen bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20"></div>
        </div>
        <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
            {
                createRandomMedia?.title || createRandomMedia?.name || createRandomMedia?.original_name
            }
        </h1>
        <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl line-clamp-5">
            {
                createRandomMedia?.overview
            }
        </p>
        <div className="flex space-x-3">
            <button
                onClick={() => router.push(`/watch/${createRandomMedia?.type}/${createRandomMedia?.id}`)}
                className="cursor-pointer flex items-center gap-x-2 rounded px-5 py-1 text-sm font-bold transition duration-200 hover:opacity-75 md:py-2.5 md:px-8 md:text-xl bg-white text-black">
                <AiFillPlayCircle className="h-4 w-4 text-black md:h-7 md:w-7 cursor-pointer" />
                Play
            </button>
            <button className="cursor-pointer flex items-center gap-x-2 rounded px-5 py-1 text-sm font-bold transition duration-200 hover:opacity-75 md:py-2.5 md:px-8 md:text-xl bg-[gray]/70">
                <IoMdInformationCircleOutline className="h-5 w-5 md:h-8 md:w-8 cursor-pointer" />
                More Info
            </button>
        </div>
    </div>
}