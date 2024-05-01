<script lang="ts">
    import type { PageData } from './$types';
    let title = 'test';
    let releaseYear = 2024;
    let category = '';
    let description = 'test';
</script>

<h1 class="is-size-1 block ml-2">Insert new record</h1>

<div class="px-4">
<p class="block">Title</p>
<form action="insertRecord" method="post">
<input
    type="text"
    name="title"
    placeholder="Title..."
    class="input mb-5"
    style="max-width: 80ch;"
    bind:value="{title}"
/>

<p class="block">Release Year</p>
<input
    type="number"
    name="releaseYear"
    placeholder="Release Year..."
    class="input mb-5"
    style="max-width: 80ch;"
    bind:value="{releaseYear}"
/>

<p class="block">Category</p>
<input
    type="text"
    name="category"
    placeholder="Category..."
    class="input mb-5"
    style="max-width: 80ch;"
    bind:value="{category}"
/>
<p class="block">Description</p>
<input
    type="text"
    name="description"
    placeholder="Description..."
    class="input mb-5"
    style="max-width: 80ch;"
    bind:value="{description}"
/>
<button class="button ml-4 mt-5 is-white is-primary" type="submit" formaction="?/insertRecord">Insert new record</button>
</form>
</div>

