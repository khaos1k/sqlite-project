import Database from "better-sqlite3";
import type { Film, Movie } from "./types";
//import { DB_PATH } from '$env/static/private';

const db = new Database("./data/sqlite-sakila.db", {verbose: console.log});

// This function gets the movies from the database on the load
export function getInitialFilms(limit = 50, offset: number): Film[] {
    const sql = `
    SELECT f.film_id as filmId,
			 f.title as title,
			 f.description as description,
       f.release_year as releaseYear,
			 c.name as category
    FROM film f 
    JOIN film_category fc ON f.film_id = fc.film_id
    JOIN category c ON fc.category_id = c.category_id
    limit $limit
    offset $offset
    `;
    const statement = db.prepare(sql); // Compiles the SQL statement into a reusable prepared statement object
    const rows = statement.all({ limit, offset });
    return rows as Film[];
}

export function getNextFilms(limit = 50, offset: number): Film[] {
    const sql = `
    SELECT f.film_id as filmId,
			 f.title as title,
			 f.description as description,
       f.release_year as releaseYear,
			 c.name as category
    FROM film f 
    JOIN film_category fc ON f.film_id = fc.film_id
    JOIN category c ON fc.category_id = c.category_id
    limit $limit
    offset $offset
    `;
    const statement = db.prepare(sql); // Compiles the SQL statement into a reusable prepared statement object
    const rows = statement.all({ limit });
    return rows as Film[];
}

// This function gets the specific movie the user searches for by ID
export function getMovieById(filmId: number): Movie{
    const sql = `
    SELECT f.title, f.description, f.release_year AS releaseYear, c.name AS category, l.name AS language, f.film_id AS movieId FROM film f
    JOIN film_category fc ON f.film_id = fc.film_id
    JOIN category c ON fc.category_id = c.category_id
    JOIN language l ON f.language_id = l.language_id
    WHERE movieId = $filmId;
    `;
    const statement = db.prepare(sql);
    const row = statement.get({ filmId });
    return row as Movie;
}

export function updateMovieTitle(movieId: number, title: string): void {
    const sql = `
        UPDATE film
        SET title = $title
        WHERE film_id = $movieId;
    `
    const statement = db.prepare(sql);
    statement.run( { movieId, title } );
}   

export function searchMovies(searchTerm: string, limit = 50): Film[] {
    const sql = `
    SELECT f.film_id as filmId,
    f.title as title,
    f.description as description,
    f.release_year as releaseYear,
    c.name as category
FROM film f 
LEFT JOIN film_category fc ON f.film_id = fc.film_id
LEFT JOIN category c ON fc.category_id = c.category_id
WHERE lower(title) like lower('%' || $searchTerm || '%')
limit $limit

    `
    const statement = db.prepare(sql);
    const rows = statement.all({ searchTerm, limit })
    return rows as Film[];
}