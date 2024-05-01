<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import type {PageData} from './$types';
    export let data: PageData;

    let timer: NodeJS.Timeout;
    let searchTerm = '';
    let movies = data.films;
    let isDisabled = true;
    let isDisabled2 = false;

    function fetchMovies() {
        fetch(`/api/searchMovies?searchTerm=${searchTerm}&offset=${currentEntries}`)
        .then((res) => res.json())
        .then((data) => {
            movies = data;
        });
    }

    function handleSearch(e: Event) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            const target = e.target as HTMLInputElement;
            searchTerm = target.value;
            fetchMovies();
        }, 300)
    }
    
    
    let currentEntries = 0;
    let currentPage = 1;
    let films = data.films;

     function loadNext() {
        fetch(`/api/loadNext?offset=${currentEntries}`)
        .then((res) => res.json())
        .then((data) => {
            movies = data;
        })
    }

    function loadPrevious() {
        fetch(`/api/loadNext?offset=${currentEntries}`)
        .then((res) => res.json())
        .then((data) => {
            movies = data;
        })
    }

    function updateNumber() {
        currentEntries += 50;
        loadNext();
        checkDisabled();
        currentPage += 1;
    }

    function decreaseNumber() {
        currentEntries -= 50;
        loadPrevious()
        checkDisabled();
        currentPage -= 1;
    }

    function checkDisabled() {
        if(currentEntries == 0) {
            isDisabled = true;
            isDisabled2 = false;
        } else if(currentEntries == 1050) {
            isDisabled2 = true;
        }
        else {
            isDisabled = false;
            isDisabled2 = false;
        } 
    }

</script>

<div class="px-4">
<h1 class="is-size-1">Movies</h1>

<input
    type="search"
    placeholder="Search..."
    class="input mb-5"
    style="max-width: 80ch;"
    value="{searchTerm}"
    on:keyup="{handleSearch}"
    on:search="{handleSearch}"
/>
<table class="table">
    <thead>
        <tr>
            <th>Title</th>
            <th>Release year</th>
            <th>Category</th>
        </tr>
    </thead>
    <tbody>
        {#each movies as film}
            <tr>
                <td><a href={`/movies/${film.filmId}`}>{film.title}</a></td>
                <td>{film.releaseYear}</td>
                <td>{film.category}</td>
            </tr>
        
        {/each}
    </tbody>
</table>
<button class="button is-white is-primary" type="button" on:click={decreaseNumber} disabled={isDisabled}>Előző oldal</button>
<button class="button is-white is-primary" type="button" on:click={updateNumber} disabled={isDisabled2}>Következő oldal</button>
</div>