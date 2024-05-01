import { getMovieById, updateMovieTitle } from "$lib/server/db";
import { error, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (({params}) => {
    // Get the ID from url
    const filmId = parseInt(params.filmId);

    if(!filmId) {
        throw error(404, 'Movie not found');
    }

    const movie = getMovieById(filmId);

    if(!movie) {
        throw error(404, 'Movie not found');
    }

    return {
        movie
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    updateMovieTitle: async ({request}) => {
        const data = await request.formData();

        const movieIdStr = data.get('movieId')?.toString();
        const movieId = movieIdStr ? parseInt(movieIdStr) : null;

        console.log(movieId);
        const movieTitle = data.get('title')?.toString();


        if(!movieId){
            throw error(400, 'Id not found!')
        }

        if (!(movieId && movieTitle)) {
            throw error(400, 'Id or Title missing');
        }


        updateMovieTitle(movieId, movieTitle);
    }
}
