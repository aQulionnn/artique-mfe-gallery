<script lang="ts">

    import Search from "./Search.svelte";

</script>

<header class="header">
    <h3 class="title">ARTIQUE</h3>
    <Search />
    <h4 class="title">Account</h4>
</header>

<style>
    .title {
        color: #fff;
    }

    .header {
        width: 100dvw;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgba(255, 255, 255, 0.25);
        padding: 0 50px;
    }
</style>
