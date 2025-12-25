<script lang="ts">
    import axios from "axios"
    import { onMount } from "svelte"

    type Artwork = {
        id: string
        imageUrl: string
    }

    let artworks: Artwork[] = []
    let query = ""

    const api = axios.create({
        baseURL: `${import.meta.env.VITE_API_URL}/graphql`
    })

    async function search() {
        const gql = `
            query SearchArtworks($input: SearchArtworksInput!) {
                searchArtworks(input: $input) {
                    id
                    imageUrl
                }
            }
        `

        const variables = {
            input: {
                title: query,
                artistIds: [],
                years: []
            }
        }

        const { data } = await api.post("", { query: gql, variables })
        artworks = data.data.searchArtworks
    }

    onMount(search)
</script>

<main class="gallery">
    <input
            class="search"
            placeholder="Search artworks"
            bind:value={query}
            on:input={search}
    />

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

    .search {
        width: 100%;
        padding: 12px;
        font-size: 16px;
        background: #000;
        color: #fff;
        border: 1px solid #333;
        outline: none;
    }

    .search::placeholder {
        color: #777;
    }

    .search:focus {
        border-color: #fff;
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