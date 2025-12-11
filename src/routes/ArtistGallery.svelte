<script lang="ts">
    import axios from "axios"
    import { onMount } from "svelte"

    type Artwork = {
        id: string
        imageUrl: string
        artistId: string
    }

    type QueryResponse<TResponse> = {
        data: T
        errors?: { message: string }[]
    }

    let artworks: Artwork[] = []
    let artistName = ""

    async function getArtworksByArtistId<TResponse>(artistId: string, fields: string[]) {
        const query = `
            query {
                artworksByArtistId(artistId: "${artistId}") {
                    ${fields.join(" ")}
                }
            }
        `

        const variables = {
            artistId: artistId
        }

        const {data} = await axios.post<QueryResponse<TResponse>>(`${import.meta.env.VITE_API_URL}/graphql`, {
            query,
            variables
        })
        return data
    }

    export let artistId: string

    onMount(async () => {
        const fields = ["id", "imageUrl", "artistId"]
        const response = await getArtworksByArtistId<{ artworks: Artwork[] }>(artistId, fields)
        artworks = response.data.artworksByArtistId

        if (artworks.length > 0) {
            artistName = artworks[0].artistId
        }
    })
</script>

<main class="gallery">
    <h1 class="gallery__artist">
        {artistName}
    </h1>
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

    .gallery__artist {
        color: white
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
