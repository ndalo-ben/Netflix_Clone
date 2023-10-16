"use client"

import { useSession } from "next-auth/react"
import UnauthPage from '@/components/unauth-page/index'
import { useContext, useEffect } from "react"
import { GlobalContext } from "@/context"
import ManageAccounts from '@/components/manage-accounts/index'
import CommonLayout from '@/components/common-layout/index'
import CircleLoader from "@/components/circle-loader"
import { getTrendingMedias, getPopularMedias, getTopRatedMedias } from "@/utils"

export default function Browse() {
    const { loggedInAccount, mediaData, setMediaData, setPageLoader, pageLoader } = useContext(GlobalContext);

    useEffect(() => {
        async function getAllMedias() {
            const trendingTvShows = await getTrendingMedias('tv');
            const popularTvShows = await getPopularMedias('tv');
            const topRatedTvShows = await getTopRatedMedias('tv');

            const trendingMovies = await getTrendingMedias('movie');
            const popularMovies = await getPopularMedias('movie');
            const topRatedMovies = await getTopRatedMedias('movie');

            setMediaData([
                    ...[
                        {
                            title: "Trending TV Shows",
                            medias: trendingTvShows
                        },
                        {
                            title: "Popular TV Shows",
                            medias: popularTvShows
                        },
                        {
                            title: "Top Rated TV Shows",
                            medias: topRatedTvShows
                        }
                    ].map((item) => ({
                        ...item,
                        medias: item.medias.map((mediaItem) => ({
                            ...mediaItem,
                            mediaType: "tv",
                        })),
                    })),
                    ...[
                        {
                            title: "Trending Movies",
                            medias: trendingMovies
                        },
                        {
                            title: "Popular Movies",
                            medias: popularMovies
                        },
                        {
                            title: "Top Rated Movies",
                            medias: topRatedMovies
                        }
                    ].map((item) => ({
                        ...item,
                        medias: item.medias.map((mediaItem) => ({
                            ...mediaItem,
                            type: "movie",
                        })),
                    })),
                ]
            )

            setPageLoader(false);

        }
        getAllMedias();
    }, []);

    const { data: session } = useSession()
    if (session === null) return <UnauthPage />
    if (loggedInAccount === null) return <ManageAccounts />;
    if (pageLoader) return <CircleLoader />


    console.log(mediaData);


    return <main className="flex flex-col min-h-screen ">
        <CommonLayout mediaData={mediaData}/>
    </main>
}