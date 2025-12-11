<script lang="ts">

    import Gallery from "./routes/Gallery.svelte";
    import Artwork from "./routes/Artwork.svelte";
    import { Router, Route } from "svelte-routing";
    import ArtistGallery from './routes/ArtistGallery.svelte'

</script>

<Router>
    <Route path="/">
        <Gallery />
    </Route>

    <Route path="/:id" let:params>
        <Artwork id={params.id} />
    </Route>

    <Route path="artists/:id/gallery" let:params>
        <ArtistGallery artistId={params.id} />
    </Route>
</Router>

<style>

</style>
