<script lang="ts">

    import { onMount } from "svelte"
    import { getArtworks } from "../services/artworkService";
    import type { GetArtworksResponse } from "../types/artwork";

    let artworks: GetArtworksResponse[] = []

    onMount(async () => {
        artworks = await getArtworks()
    })

</script>

<main class="gallery">
    <div class="artworks">
        {#each artworks as artwork}
            <a href={`/${artwork.id}`}>
                <img src={artwork.imageUrl} alt="" class="artwork"/>
            </a>
        {/each}
    </div>
</main>

<style>

    .gallery {
        max-width: 100dvw;
        min-height: 100dvh;
        background: #000;
    }

    .artworks {
        padding: 50px 25px;
        columns: 400px;
    }

    .artwork {
        width: 100%;
        margin-bottom: 1em;

        cursor: pointer;
    }

</style>