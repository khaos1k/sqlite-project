import { getInitialFilms } from '$lib/server/db/index.js';
import type { Film } from '$lib/server/db/types.js'
import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = ( ({ url, request, params  }) => {
   let films: Film[] = [];
    // let offset = 50;

    let offsetStr = url.searchParams.get('offset')?.toString();
    let offset = offsetStr ? parseInt(offsetStr): 50 ;

   films = getInitialFilms(50, offset);
 //  offset += 50;
   return json(films);
} ) satisfies RequestHandler;