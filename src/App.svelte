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
  <!-- <div id="sigma-container" /> -->
<Sigma bind:graph></Sigma>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }

  #sigma-container {
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
