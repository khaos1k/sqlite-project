// The stuff gets executed on the server

/** @type {import('./$types').Actions} */
import { getInitialFilms, getNextFilms } from "$lib/server/db";
import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";


export const load = (() => {
    const limit = 50;
    const offset = 0;
    const films = getInitialFilms(limit, offset);

    return {
        films
    };

}) satisfies PageServerLoad; // Svelte knows this needs to run before the page loads

