<script lang="ts">

    import type { GetArtworkByIdResponse } from "../types/artwork"
    import { onMount } from 'svelte'
    import { createApi } from "@aqulionnn/artique-api-lib/src/services/api";

    export let id: string
    let artwork: GetArtworkByIdResponse
    const api = createApi(import.meta.env.VITE_API_URL);

    onMount(async () => {
        artwork = await api.getArtworkById(id)
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
            <h3 class="artist">
                {artwork.artistName}
            </h3>
            <time datetime={artwork.year} class="year">
                {artwork.year}
            </time>
        </section>
    </article>
{/if}


<style>

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
    }

    .year {
        text-align: end;
    }

</style>