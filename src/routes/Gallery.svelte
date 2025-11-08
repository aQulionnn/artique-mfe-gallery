<script lang="ts">

    import { onMount } from "svelte"
    import { createApi } from "@aqulionnn/artique-api-lib/src/services/api"

    type Artwork = {
        id: string
        imageUrl: string
    }

    let artworks: Artwork[] = []
    const api = createApi(`${import.meta.env.VITE_API_URL}/graphql`);

    onMount(async () => {
        const fields = ["id", "imageUrl"]
        const response = await api.getArtworks<{ artworks: Artwork[] }>(fields);
        artworks = response.data.artworks;
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