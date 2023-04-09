<script lang="ts">
  // export let onChange
  // let value = ''
  // $: onChange(value)
	export let idx: number;
	export let state;
	export let graph; 
	// : graphology.DirectedGraph;

	function setSearchQuery(query: string, selection: number) {
		state.paths = [];
		if (!query) {
			state.selected[selection] = { selected: undefined, suggest: undefined };
			renderer.refresh();
			return;
		}

		if (query[0] === '"') {
			query = "^" + query.substring(1);
		}

		if (query.at(-1) === '"') {
			query = query.substring(0, query.length - 1) + "$";
		}

		state.searchQuery[selection] = query;
		// if (searchInputs[selection].value !== query) {
		// 	searchInputs[selection].value = query;
		// }

		const suggestions = graph
			.nodes()
			.map((n) => ({
				id: n,
				label: "^" + n + "$",
			}))
			.filter(({ label }) => label.includes(query));

		if (suggestions.length === 1 && suggestions[0].label.includes(query)) {
			state.selected[selection] = { selected: suggestions[0].id, suggest: undefined };
			const selectedOther = state.selected[(selection + 1) % 2]?.selected;
			if (selectedOther !== undefined) {
				assignPath(selectedOther, state.selected[selection].selected);
			}

			if (selection === 0) {
				const ttInn = document.getElementById("ttInn");
				const ttOutn = document.getElementById("ttOutn");
				const selectedNeighbors = graph.neighbors(state.selected[selection].selected);
				// console.log(selectedNeighbors);
				ttInn.innerHTML = selectedNeighbors.reduce((prev, x, i) => {
					return prev + x + "<br/>";
				}, "");
				// console.log(ttInn.innerHTML);
			}
			const nodePosition = renderer.getNodeDisplayData(state.selected[selection].selected) as Coordinates;
			renderer.getCamera().animate(nodePosition, {
				duration: 500,
			});
		} else {
			state.selected[selection] = { selected: undefined, suggest: new Set(suggestions.map(({ id }) => id)) };
		}

		renderer.refresh();
	}

	const onInput = e => {
		setSearchQuery((e.target as HTMLInputElement).value  || "", idx);
	}

</script>

<input type="text" on:input={onInput} />

<style>
	input{
		height: fit-content;
	}
</style>