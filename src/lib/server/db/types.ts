export type Film = { //Minden film
    filmId: number;
    title: string;
    description: string;
    releaseYear: number;
    category: string;
};

export type Movie = { //Az egyes filmek
    movieId: number;
    title: string;
    description: string;
    releaseYear: number;
    category: string;
    language: string;
}