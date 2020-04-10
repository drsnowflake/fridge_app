<template>
	<div v-if="searchNarrowed">
		<result-card
			v-for="(result, index) in searchNarrowed"
			:key="index"
			:result="result.recipe"
		></result-card>
	</div>
</template>

<script>
import ResultCard from './ResultCard';

export default {
	data() {
		return {
			searchFull: null,
			searchNarrowed: null
		};
	},
	mounted() {
		this.doSearch();
		this.checkKeys();
	},
	methods: {
		checkKeys: function() {
			console.log(process.env.VUE_APP_RECIPE_ID);
		},
		doSearch: function() {
			return fetch(
				`https://api.edamam.com/search?q=chicken&app_id=${process.env.VUE_APP_RECIPE_ID}&app_key=${process.env.VUE_APP_RECIPE_KEY}&from=0&to=4`
			)
				.then(res => res.json())
				.then(json => (this.searchFull = json))
				.then(json => (this.searchNarrowed = json.hits));
		}
	},
	components: {
		'result-card': ResultCard
	}
};
</script>

<style></style>
