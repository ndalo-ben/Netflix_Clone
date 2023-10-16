"use client"

import { useSession } from "next-auth/react"
import UnauthPage from '@/components/unauth-page/index'
import { GlobalContext } from "@/context"
import { useContext, useEffect } from "react"
import ManageAccounts from "@/components/manage-accounts"
import { useParams } from "next/navigation"
import { getTvorMovieSearchResults } from "@/utils"
import CircleLoader from "@/components/circle-loader"
import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import MediaItem from "@/components/media-item/index"


export default function Search(){
    const {loggedInAccount, searchResults, setSearchResults, setPageLoader, pageLoader} = useContext(GlobalContext)
    const params = useParams();

    useEffect(() => {
        async function getSearchResults(){
            const tvShows = await getTvorMovieSearchResults('tv', params.query)
            const movies = await getTvorMovieSearchResults('movie', params.query)

            setSearchResults([
                    ...tvShows.filter((item) => item.backdrop_path !== null && item.poster_path !== null).map((tvShowItem) => ({
                        ...tvShowItem,
                        type : 'tv',
                        addedToFavorites : false
                    })),
                    ...movies.filter((item) => item.backdrop_path !== null && item.poster_path !== null).map((movieItem) => ({
                        ...movieItem,
                        type : 'movie',
                        addedToFavorites : false
                    })),
                ]);
                setPageLoader(false);

            console.log(tvShows, movies);
        }

        getSearchResults();
    }, [loggedInAccount])

    const {data: session} = useSession()
    if(session === null) return <UnauthPage />
    if(loggedInAccount === null) return <ManageAccounts />;
    if(pageLoader) return <CircleLoader />;

    return <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    >
        <Navbar />
        <div className="mt-[100px] space-y-0.5 md:space-y-2 px-4">
            <h2 className="cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
                Showing Results for {decodeURI(params.query)}
            </h2>
            <div className="grid grid-cols-5 gap-3 items-center scrollbar-hide md:p-2">
                {
                    searchResults && searchResults.length ?
                    searchResults.map((searchItem) => <MediaItem key={searchItem.id} media={searchItem} searchView={true}/>) : null
                }
            </div>
        </div>
    </motion.div>
}