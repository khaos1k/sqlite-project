<script>
    import { page } from '$app/stores';
</script>

<h1 class="is-size-1 has-text-danger">An error occured!</h1>
<p>{$page.status}: {$page.error?.message}</p>