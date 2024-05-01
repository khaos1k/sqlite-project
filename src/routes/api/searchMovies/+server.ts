import { getInitialFilms, searchMovies } from '$lib/server/db/index.js';
import type { Film } from '$lib/server/db/types.js'
import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export const GET = ( ({ url }) => {
    const searchTerm = url.searchParams.get('searchTerm')?.toString();
    const offsetStr = url.searchParams.get('offset')?.toString();
    let offset = offsetStr ? parseInt(offsetStr): 50 ;

    console.log('searchTerm', searchTerm);

    let films: Film[] = [];

    if (!searchTerm) {
        films = getInitialFilms(50, offset);
    } else {
        films = searchMovies(searchTerm) ?? [];
    }
    return json(films);
} ) satisfies RequestHandler;