<template>
	<div>
		<p>I'm the shopping list</p>
		<div v-if="!selectedRecipe">
			<p>Please select a recipie fool</p>
		</div>
		<div v-if="selectedRecipe" id="checkboxes">
			<ul>
				<li
					v-for="(ingredient, index) in selectedRecipe.ingredientLines"
					:ingredient="ingredient"
					:key="index"
				>
					<input type="checkbox" />
					{{ ingredient }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'shopping-list',
	props: ['selectedRecipe']
};
</script>

<style></style>
