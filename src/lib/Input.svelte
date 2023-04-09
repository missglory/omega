<script>
  export let onChange
  let value = ''
  $: onChange(value)
</script>

<input type="text" bind:value />

<style>
	input{
		height: fit-content;
	}
</style>