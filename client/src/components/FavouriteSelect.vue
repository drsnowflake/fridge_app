<template>
	<div>
		<form>
			<select id="select_favourite" v-on:change="handleSelect($event)">
				<option>Select Favourite</option>
				<option
					v-for="favourite in favourites"
					:key="favourite._id"
					:value="favourite.recipe_uri"
					>{{ favourite.name }}</option
				>
			</select>
		</form>
	</div>
</template>

<script>
import { eventBus } from '../main.js';

export default {
	name: 'favourite-select',
	props: ['favourites'],
	methods: {
		handleSelect(event) {
			eventBus.$emit('favourite-selected', event.target.value);
		}
	}
};
</script>
<style scoped>
select {
	vertical-align: middle;
	font-size: 14px;
	font-family: sans-serif;
	font-weight: 300;
	color: #444;
	padding: 10px;
	margin: 0px 20px 0px 10px;
	border: 1px solid #aaa;
	box-shadow: 1px 1px 1px 1px rgba(250, 212, 214, 0.5);
	border-radius: 0.2em;
	min-width: 300px;
}
select:hover {
	cursor: pointer;
}
</style>
