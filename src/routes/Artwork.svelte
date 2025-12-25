<script lang="ts">

    import { onMount } from 'svelte'
    import { createReadApi } from "@aqulionnn/artique-api-lib/src/services/readApi"

    type Artwork = {
        title: string
        imageUrl: string
        description: string
        year: number
        artist: {
            id: string
            name: string
        }
    }

    export let id: string
    let artwork: Artwork
    const api = createReadApi(`${import.meta.env.VITE_API_URL}/graphql`)

    onMount(async () => {
        const fields = ["title", "imageUrl", "description", "year", "artist { id, name }"]
        const response = await api.getArtworkById<{ artworks: Artwork[] }>(id, fields)
        artwork = response.data.artworkById
    })

</script>

{#if artwork}
    <article class="artwork">
        <section class="left-section">
            <img src={artwork.imageUrl} alt="" />
        </section>
        <section class="right-section">
            <h1 class="title">
                {artwork.title}
            </h1>
            <p class="description">
                {artwork.description}
            </p>
            <a class="artist" href={`/artists/${artwork.artist.id}/gallery`}>
                {artwork.artist.name}
            </a>
            <time class="year">
                {artwork.year}
            </time>
        </section>
    </article>
{/if}


<style>

    @media (min-width: 1280px) {
        .artwork {
            width: 100dvw;
            height: 100dvh;
            padding: 50px 0;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 100px;
            background: #000;
        }

        .left-section {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .left-section img {
            max-width: 100%;
            max-height: 100%;
        }

        .right-section {
            width: 25%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 25px;

            color: #fff;
        }

        .title {
            line-height: 1.25;
            letter-spacing: 1px;
            word-spacing: 5px;
        }

        .description {
            text-indent: 2em;
            line-height: 1.75;
            letter-spacing: 1px;
            word-spacing: 1px;
        }

        .artist {
            text-align: center;
            letter-spacing: 1px;
            color: var(--color-white)
        }

        .year {
            text-align: end;
        }
    }

    @media (max-width: 480px) {
        .artwork {
            width: 100dvw;
            height: 100dvh;
            padding: 25px;
            display: flex;
            flex-direction: column;
            gap: 25px;

            background: #000;
        }

        .left-section {
            height: 50%;
            display: flex;
            /*align-items: center;*/
            justify-content: center;
        }

        .left-section img {
            width: 100%;
            height: 100%;
        }


        .right-section {
            height: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
                gap: 25px;

            color: #fff;
        }

        .title {
            text-align: center;
        }

        .description {
            text-indent: 1em;
        }

        .artist {
            text-align: center;
        }

        .year {
            text-align: end;
        }
    }

</style>