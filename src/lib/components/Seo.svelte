<script>
  export let title = undefined;
  export let description = undefined;
  export let keywords = undefined;
  export let canonical = undefined;
</script>

<svelte:head>
  {#if title}
    <title>{title}</title>
  {/if}

  <meta
    name="robots"
    content="noindex,nofollow,noarchive,noodp"
  />
  <meta 
	name="googlebot" 
	content="nosnippet"
  />
  

  {#if description}
    <meta name="description" content={description} />
  {/if}

  {#if canonical}
    <link rel="canonical" href={canonical} />
  {/if}

  {#if keywords}
    <meta name="keywords" content={keywords} />
  {/if}

  <slot />
</svelte:head>
