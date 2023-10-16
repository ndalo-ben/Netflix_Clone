"use client"

import { useSession } from "next-auth/react"
import UnauthPage from '@/components/unauth-page/index'
import { GlobalContext } from "@/context"
import { useContext, useEffect } from "react"
import ManageAccounts from "@/components/manage-accounts"
import CommonLayout from "@/components/common-layout"
import CircleLoader from "@/components/circle-loader"
import { getTvorMoviesByGenre } from "@/utils"

export default function Tv() {
    const { loggedInAccount, mediaData, pageLoader, setPageLoader, setMediaData } = useContext(GlobalContext);

    useEffect(() => {
        async function getAllMedias() {
            const actionAdventure = await getTvorMoviesByGenre('tv', 10759);
            const crime = await getTvorMoviesByGenre("tv", 80);
            const comedy = await getTvorMoviesByGenre("tv", 35);
            const family = await getTvorMoviesByGenre("tv", 10751);
            const mystery = await getTvorMoviesByGenre("tv", 9648);
            const reality = await getTvorMoviesByGenre("tv", 10764);
            const scifiAndFantasy = await getTvorMoviesByGenre("tv", 10765);
            const war = await getTvorMoviesByGenre("tv", 10768);
            const western = await getTvorMoviesByGenre("tv", 37);
            const dramaMovies = await getTvorMoviesByGenre("tv", 18);
            setMediaData(
                [
                  {
                    title: "Action and adventure",
                    medias: actionAdventure,
                  },
                  {
                    title: "Crime",
                    medias: crime,
                  },
                  {
                    title: "Comedy",
                    medias: comedy,
                  },
                  {
                    title: "Family",
                    medias: family,
                  },
                  {
                    title: "Mystery",
                    medias: mystery,
                  },
                  {
                    title: "Reality",
                    medias: reality,
                  },
                  {
                    title: "Sci-Fi and Fantasy",
                    medias: scifiAndFantasy,
                  },
                  {
                    title: "Western",
                    medias: western,
                  },
                  {
                    title: "War",
                    medias: war,
                  },
                  {
                    title: "Dramas",
                    medias: dramaMovies,
                  },
                 
                ].map((item) => ({
                  ...item,
                  medias: item.medias.map((mediaItem) => ({
                    ...mediaItem,
                    type: "tv",
                    addedToFavorites: false,
                  })),
                }))
              );
              setPageLoader(false);
        }

        getAllMedias();
    }, [loggedInAccount])

    const { data: session } = useSession()
    if (session === null) return <UnauthPage />
    if (loggedInAccount === null) return <ManageAccounts />;

    if(pageLoader) return <CircleLoader />;

    return <main className="flex min-h-screen flex-col">
        <CommonLayout mediaData={mediaData} />
    </main>
}