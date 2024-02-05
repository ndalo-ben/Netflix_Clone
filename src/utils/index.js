require('dotenv').config();

const API_KEY = process.env.MOVIE_DB_API_KEY;
const BASE_URL = process.env.MOVIE_DB_BASE_URL;


//trending movies query
export const getTrendingMedias = async (type) => {
    try {
        const res = await fetch(`${BASE_URL}/trending/${type}/day?api_key=${API_KEY}&language=en-US`,
            {
                method: "GET",
            }
        );

        const data = await res.json();

        return data && data.results;
    } catch (error) {
        console.log(error);
    }
};

//top rated movies query
export const getTopRatedMedias = async (type) => {
    try {
        const res = await fetch(`${BASE_URL}/${type}/top_rated?api_key=${API_KEY}&language=en-US`,
            {
                method: "GET",
            }
        );

        const data = await res.json();

        return data && data.results;
    } catch (error) {
        console.log(error);
    }
};

//popular movies query
export const getPopularMedias = async (type) => {
    try {
        const res = await fetch(`${BASE_URL}/${type}/popular?api_key=${API_KEY}&language=en-US`,
            {
                method: "GET",
            }
        );

        const data = await res.json();

        return data && data.results;
    } catch (error) {
        console.log(error);
    }
};


//get by genre query
export const getTvorMoviesByGenre = async (type, id) => {
    try {
        const res = await fetch(
            `${BASE_URL}/discover/${type}?api_key=${API_KEY}&language=en-US&include_adult=true&sort_by=popularity.desc&with_genres=${id}`,
            {
                method: "GET",
            }
        );

        const data = await res.json();

        return data && data.results;
    } catch (e) {
        console.log(e);
    }
};


//get by details & id query
export const getTvorVideoDetailsByID = async (type, id) => {
    try {
        const res = await fetch(
            `${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}&language=en-US&append_to_response=videos`,
            {
                method: "GET",
            }
        );

        const data = await res.json();

        return data;
    } catch (error) {
        console.log(error);
    }
};

//search query
export const getTvorMovieSearchResults = async (type, query) => {
    try {
        const res = await fetch(`${BASE_URL}/search/${type}?api_key=${API_KEY}&include_adult=true&language=en-US$query=${query}`,
            {
                method: "GET",
            }
        );

        const data = await res.json();

        return data && data.results;
    } catch (error) {
        console.log(error);
    }
};