"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { PlusIcon, ChevronDownIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

 const baseUrl = "https://image.tmdb.org/t/p/w500";


export default function MediaItem({media, searchView = false}) {
    const router = useRouter()
    return <motion.div 
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: 0.5, ease: [0, 0.71, 0.2, 1.01] }}
    className="relative h-[300px] w-[200px] md:h-[400px] md:w-[250px] lg:h-[500px] lg:w-[350px]"
    > 
    <div className="relative cardWrapper h-28 min-w-[180px] cursor-pointer md:h-36 md:min-w-[260px] transform transition duration-500 hover:scale-110 hover:z-[999]">
        <Image
            src={`${baseUrl}${media?.backdrop_path || media?.poster_path}`}
            layout="fill"
            objectFit="cover"
            className="rounded-sm object-cover md:rounded hover:rounded-sm"
            alt=""
            onClick={() => router.push(`/watch/${media?.type}/${media?.id}`)}
        />
   
    <div className="space-x-3 hidden absolute p-2 bottom-0 buttonWrapper">
        <button className="cursor-pointer border flex p-2 items-center gap-x-2 rounded-full  text-sm font-semibold transition hover:opacity-90 border-white  bg-black opacity-75 text-black">
            {
                media?.addedToFavorites ? (
                    <CheckIcon color="#ffffff" className="h-7 w-7"/>
                ) : (
                    <PlusIcon color="#ffffff" className="h-7 w-7"/>
                )
            }
        </button>
        <button className="cursor-pointer border flex p-2 items-center gap-x-2 rounded-full text-sm font-semibold transition hover:opacity-90 border-white  bg-black opacity-75 text-black">
            <ChevronDownIcon color="#ffffff" className="h-7 w-7"/>
        </button>
    </div>
     </div>
    </motion.div>
}