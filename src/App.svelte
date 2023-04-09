<script lang="ts">
  import { onMount } from "svelte";
  export let name: string;
  // import { main } from "./sigma/examples/chrome-deps/index";
  import Sigma from "./sigma/examples/chrome-deps/Sigma.svelte";
  import * as graphology from "graphology";

  export let graph = new graphology.DirectedGraph({});

  onMount(async () => {
    // main();
  });
</script>

<main>
  <h1>{name}!</h1>
  <Sigma bind:graph />
 	<div>
		scrollbar 'hidden'
	</div> 
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }

  main {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 100%;
    right: 100%;
    display: flex;
  }
</style>
