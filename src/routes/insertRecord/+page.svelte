<script>
    let title = '';
    let releaseYear = 2024;
    let category = '';
    let description = '';
</script>

<h1 class="is-size-1 block ml-2">Insert new record</h1>

<div class="px-4">
<p class="block">Title</p>
<input
    type="text"
    placeholder="Title..."
    class="input mb-5"
    style="max-width: 80ch;"
    value="{title}"
/>

<p class="block">Release Year</p>
<input
    type="search"
    placeholder="Release Year..."
    class="input mb-5"
    style="max-width: 80ch;"
    value="{releaseYear}"
/>

<p class="block">Category</p>
<input
    type="search"
    placeholder="Category..."
    class="input mb-5"
    style="max-width: 80ch;"
    value="{category}"
/>
<p class="block">Description</p>
<input
    type="search"
    placeholder="Description..."
    class="input mb-5"
    style="max-width: 80ch;"
    value="{description}"
/>

</div>
<button class="button ml-4 mt-5 is-white is-primary" type="button">Insert new record</button>