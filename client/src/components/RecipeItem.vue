<template>
	<div class="grid-item-recipe row" v-on:click="handleClick">
		<div class="column left">
			<img id="recipe_image" :src="recipe.image" alt="recipe image " />
			<br />
			<button
				class="button"
				v-if="!favouritesCheck()"
				v-on:click="addToFavourites()"
				type="button"
			>
				Add to Favourites
			</button>
			<audio ref="audioElm" src="../assets/add_to_favourites.wav"></audio>
			<button
				class="button"
				v-if="favouritesCheck()"
				v-on:click="removeFromFavourites()"
			>
				Remove from Favourites
			</button>
		</div>
		<div class="column right">
			<h3>{{ recipe.label }}</h3>
			<p>
				<u><b>Ingredients </b>(serves {{ recipe.yield }})</u>
			</p>
			<ul>
				<li
					id="ingredient_list"
					v-for="(ingredient, index) in recipe.ingredientLines"
					:ingredient="ingredient"
					:key="index"
				>
					{{ ingredient }}
				</li>
			</ul>
			<br />
			<p>
				Find the full recipe
				<a :href="recipe.url" target="_blank" rel="noreferrer noopener">here</a>
			</p>
		</div>
	</div>
</template>

<script>
import { eventBus } from '../main.js';

export default {
	name: 'recipe-item',
	props: ['recipe', 'favourites'],
	methods: {
		favouritesCheck: function() {
			let match = false;
			this.favourites.forEach(element => {
				if (element.recipe_uri === this.recipe.uri) {
					this.recipe._id = element._id;
					match = true;
				}
			});
			return match;
		},
		handleClick() {
			eventBus.$emit('recipe-selected', this.recipe);
		},
		addToFavourites() {
			eventBus.$emit('new-favourite', this.recipe);
			// this.$refs.audioElm.play();
		},
		removeFromFavourites() {
			eventBus.$emit('remove-favourite', this.recipe);
		}
	}
};
</script>

<style scoped>
/* li:hover {
	background-color: silver;
	cursor: pointer;
} */

.row {
	display: flex;
	text-align: center;
}

.column {
	float: left;
}

.left {
	width: 35%;
	text-align: center;
}

.right {
	width: 65%;
}

#recipe_image {
	margin: 15px;
	border: 1px;
	border-style: solid;
	border-color: #897475;
}

#ingredient_list {
	list-style: none;
	font: 10px;
}

.button {
	vertical-align: middle;
	padding: 5px 10px;
	border: 1px solid #897475;
	color: #897475;
	margin: 0px 20px 0px 10px;
	font-size: 1em;
}

.button:hover {
	background-color: #897475;
	color: white;
	cursor: pointer;
}
</style>
