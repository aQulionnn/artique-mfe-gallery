<script lang="ts">

    import Gallery from "./routes/Gallery.svelte";
    import Artwork from "./routes/Artwork.svelte";
    import { Router, Route } from "svelte-routing";

</script>

<Router>
    <Route path="/">
        <Gallery />
    </Route>

    <Route path="/:id" let:params>
        <Artwork id={params.id} />
    </Route>
</Router>

<style>

</style>
