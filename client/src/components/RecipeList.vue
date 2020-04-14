<template lang="html">
	<ul>
		<recipe-item
			v-for="(recipe, index) in recipeList"
			:favourites="favourites"
			:recipe="recipe"
			:key="index"
		></recipe-item>
	</ul>
</template>

<script>
import RecipeItem from './RecipeItem.vue';

export default {
	name: 'recipe-list',
	props: ['recipeList', 'favourites'],
	components: {
		'recipe-item': RecipeItem
	}
};
</script>

<style scoped>
ul {
	margin: 0px;
}
</style>
