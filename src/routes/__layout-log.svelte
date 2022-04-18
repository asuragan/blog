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
  import { isSidebarOpen, isLoggedIn } from "$lib/stores";
  import App from "./fb";
  import { onMount } from "svelte";
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import { goto } from "$app/navigation";
  
  onMount(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        isLoggedIn.update(() => true);
      } else {
        isLoggedIn.update(() => false);
        goto("/login");
      }
    });
  });

</script>

	<div class="wrapper overflow-hidden">
			<article class="container">
					<slot />
			</article>
	</div>
