<script lang="ts">
    import type { PageData } from './$types';
    export let data: PageData;
    let option = 0;
</script>

<div class="container is-widescreen">
<h1 class="is-size-1">{data.movie.title}</h1>
<p>Description: {data.movie.description}</p>
<p>Category: {data.movie.category}</p>
<p>Release year: {data.movie.releaseYear}</p>
<p>Language: {data.movie.language}</p>
<p>ID: {data.movie.movieId}</p>

<h2 class="is-size-3 mb-4 mt-6">Update Movie Name</h2>
<form method="post">
<input
    class="input"
    type="text"
    name="title"
    value={data.movie.title}
    style="max-width: 50ch;"
/>
<input type="hidden" name="movieId" value={data.movie.movieId} />
<button class="button is-primary" type="submit" formaction="?/updateMovieTitle">Update</button>
</form>

</div>