<script context="module">
  export const load = async ({ stuff }) => {
    const { posts } = stuff;

    // https://dmitripavlutin.com/javascript-array-group/
    const groupByCategory = posts.reduce((group, post) => {
      const { categories } = post;
      for (let category of categories) {
        group[category] = group[category] ?? [];
        group[category].push(post);
      }
      return group;
    }, {});

    const groupedPosts = Object.entries(groupByCategory);

    return {
      props: {
        groupedPosts,
      },
    };
  };
</script>

<script>
  import PostItem from "$lib/components/PostItem.svelte";
  export let groupedPosts;
</script>

<h1>Categories</h1>

{#each groupedPosts as [category, posts]}
  <h2>#{category}:</h2>
  <hr>
  <div class="grid">
    {#each posts as post}
      <PostItem {post} />
    {/each}
  </div>
  <hr>
{/each}

<style>
  h2 {
    text-transform: capitalize;
  }
</style>
