import { getMovieById, updateMovieTitle } from "$lib/server/db";
import { error, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import Database from "better-sqlite3";

const db = new Database("./data/sqlite-sakila.db", {verbose: console.log});

interface UpdateData {
    movieId: number;
    movieTitle?: string;
    movieDescription?: string;
}

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

        console.log('Form data:', Object.fromEntries(data.entries()));


        const movieIdStr = data.get('movieId')?.toString();
        const movieId = movieIdStr ? parseInt(movieIdStr) : null;


        if(!movieId){
            throw error(400, 'Id not found!')
        }

        const movieTitle = data.get('title')?.toString();
        const movieDescription = data.get('description')?.toString();

        const updateData: UpdateData = {
            movieId,
            movieTitle,
            movieDescription
        };
        
        updateMovie(updateData);
       // updateMovieTitle(movieId, movieTitle);
    }
}

function updateMovie(updateData: UpdateData): void {
    let query = 'UPDATE film SET ';
    let queryParams: { [key: string]: string | number } = {};

    if(updateData.movieTitle) {
        query += 'title = $title, ';
        queryParams.title = updateData.movieTitle;
    }

    if(updateData.movieDescription) {
        query += 'description = $description, ';
        queryParams.description = updateData.movieDescription;
    }

    query = query.slice(0, -2);

    query += ' WHERE film_id = $movieId';
    queryParams.movieId = updateData.movieId;

    const statement = db.prepare(query);
    statement.run(queryParams);
}
