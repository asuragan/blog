<script context="module">
  export const load = async ({ stuff }) => {
    const { posts } = stuff;

    return {
      props: {
        posts,
      },
    };
  };
</script>

<script>
    import { onMount } from 'svelte';
    import auth from '$lib/services/auth';
    import { isAuthenticated, user } from '$lib/stores/auth';

    let auth0Client;

    onMount(async () => {
        isAuthenticated.set(await auth0Client.isAuthenticated());
        user.set(await auth0Client.getUser());
    });

    function login() {
        auth.loginWithPopup(auth0Client);
    }

    function logout() {
        auth.logout(auth0Client);
    }
</script>

<script>
  import PostItem from "$lib/components/PostItem.svelte";
  import Seo from "$lib/components/Seo.svelte";
  import { siteTitle, siteDescription } from "$lib/constants";
  export let posts;

  const seo = {
    title: siteTitle,
    description: siteDescription,
  };
</script>

<Seo {...seo} />
{#if $isAuthenticated}
<button on:click={logout}>Logout</button>
  {#each posts as post}
    <PostItem {post} />
  {/each}
{:else}
    <button on:click={login}>Login</button>
{/if}
