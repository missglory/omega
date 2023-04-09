<script lang="ts">
  import { onMount } from "svelte";
  export let name: string;
  // import { main } from "./sigma/examples/chrome-deps/index";
  import Sigma from "./sigma/examples/chrome-deps/Sigma.svelte";
  import Input from "./lib/Input.svelte";
  import * as graphology from "graphology";
  import type State from "./State";

  export let graph = new graphology.DirectedGraph({});
  // export let renderer = new Sigma(graph, container, {
  //     // defaultEdgeType: g_state.edgesRenderer,
  //     defaultEdgeType: "edges-fast",
  //     edgeProgramClasses: {
  //       "edges-default": EdgesDefaultProgram,
  //       "edges-fast": EdgesFastProgram,
  //     },
  //   });
  export let renderer;

  onMount(async () => {
    // main();
  });

  const testttt = (newValue) => {
    console.log(newValue);
  }

  export let state: State = {
      searchQuery: ["", ""],
      sq2: "",
      inNeighbors: true,
      outNeighbors: false,
      selected: [
        { selected: undefined, suggest: undefined },
        { selected: undefined, suggest: undefined },
      ],
      paths: [],
      pathIndex: 0,
    };

</script>

<main>
  <h1>{name}!</h1>
  <Sigma {graph} {state} {renderer}/>
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
