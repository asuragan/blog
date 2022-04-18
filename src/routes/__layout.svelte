<script context="module">
  export const load = async ({ fetch }) => {
    // Use a `limit` querystring parameter to fetch a limited number of posts
    // e.g. fetch('posts.json?limit=5') for 5 most recent posts
    const res = await fetch("/api/posts.json");
    const posts = await res.json();

    return {
      stuff: {
        posts,
      },
    };
  };
</script>

<script>
  import "../../static/reset.css";
  import "../../static/global.css";
  import SidebarToggle from "$lib/components/SidebarToggle.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import { isSidebarOpen } from "$lib/stores";
  import SvelteTheme from "svelte-themes/SvelteTheme.svelte";
  import Header from "$lib/components/Header.svelte";
  
  let fontSize = 1.15;
</script>

<div class="wrapper overflow-hidden">
  <Sidebar />
  <main class:show={$isSidebarOpen}>
    <SidebarToggle />
    <Header />
    <div class="button">
    <input type="range" min="1" max="1.4" step="0.05" bind:value={fontSize} />
    <p> Size: {fontSize} </p>
    </div>
    <article class="container">
      <div style="--fontSize: {fontSize}rem">
        <slot />
      </div>
    </article>
  </main>
</div>

<SvelteTheme />

<style>
  .wrapper {
    display: flex;
    overflow: hidden;
  }
  main {
    width: 100%;
  }
	p {
		font-size: var(--fontSize);
	}
  article {
    margin: 2rem auto;
  }
  .show {
    transform: translateX(18rem);
  }
  .button {
    display: block;
    max-width: 10rem;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
   }
  button {
    height: 3rem;
    width: 3rem;
    margin-right: 5px;
  }
  :host(.leading-none) {
  display: none;
  }
  :host(.sidebar-collapsed) {
  display: none;
  }
	
  @media screen and (max-width: 800px) {
    .show {
      transform: translateX(14rem);
    }
  }
</style>
