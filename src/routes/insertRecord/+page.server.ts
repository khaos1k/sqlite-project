import { error, type Actions } from "@sveltejs/kit";
import Database from "better-sqlite3";

const db = new Database("./data/sqlite-sakila.db", {verbose: console.log});


export const actions: Actions = {
    insertRecord: async ({request}) => {
        const data = await request.formData();

        const title = data.get('title')?.toString();
        const releaseYearStr = data.get('releaseYear')?.toString();
        const releaseYear = releaseYearStr ? parseInt(releaseYearStr) : null;
       // const category = data.get('category')?.toString();
        const description = data.get('description')?.toString();

        console.log('Form data:', Object.fromEntries(data.entries()));
        
        if (!(title && releaseYear && description)) {
            throw error(400, 'Some fields are missing');
        }

        insertRecord(title, releaseYear, description);
    }
};

function insertRecord(title: string, releaseYear: number, description: string): void {
    const query = 'INSERT INTO film (film_id, title, release_year, description, language_id, last_update) VALUES ($filmId, $title, $releaseYear, $description, $languageId, CURRENT_TIMESTAMP)';
    const filmId = generateUniqueFilmId();
    const languageId = generateLanguageId();
    const queryParams = { filmId: filmId, title: title, releaseYear: releaseYear, 
        description: description,
        languageId: languageId};

    const categoryQuery = 'INSERT INTO film_category (film_id, category_id, last_update) VALUES ($filmId, $categoryId, CURRENT_TIMESTAMP)';
    const categoryQueryParams = {
        filmId: filmId,
        categoryId: generateCategoryId()
    };

    const categoryStatement = db.prepare(categoryQuery);
    const statement = db.prepare(query);


    statement.run(queryParams);
    categoryStatement.run(categoryQueryParams);
}

function generateUniqueFilmId(): number {
    const query = 'SELECT MAX(film_id) as maxId FROM film';
    const { maxId } = db.prepare(query).get() as { maxId: number | null };
    return maxId ? maxId + 1 : 1;
}
function generateLanguageId(): number {
    return Math.floor(Math.random() * 6) + 1;
}

function generateCategoryId(): number {
    return Math.floor(Math.random() * 16) + 1;
}