<template>
	<div class="grid-container-main">
		<div class="grid-item-heading">
			<h2>What's in my Fridge? <i>Recipe Finder</i></h2>
		</div>

		<div class="grid-item-search">
			<recipe-search></recipe-search>
		</div>
		<div class="grid-item-favourites">
			<favourite-select :favourites="favouriteRecipes"></favourite-select>
		</div>
		<div class="grid-item-blank-line"></div>
		<div class="grid-item-recipes">
			<instruction-view
				v-if="recipes.length == 0 && searchString == ''"
			></instruction-view>
			<no-recipe-found
				v-if="recipes.length == 0 && searchString != '' && loaded == true"
			></no-recipe-found>
			<div class="grid-container-recipes">
				<recipe-list
					:favourites="favouriteRecipes"
					:recipeList="recipes"
				></recipe-list>
			</div>
		</div>
		<div class="grid-item-shopping-list">
			<shopping-list :selectedRecipe="selectedRecipe"></shopping-list>
		</div>
	</div>
</template>

<script>
import RecipeSearch from './components/RecipeSearch.vue';
import RecipeList from './components/RecipeList.vue';
import ShoppingList from './components/ShoppingList.vue';
import FavouriteSelect from './components/FavouriteSelect.vue';
import InstructionView from './components/InstructionView.vue';
import NoRecipeFound from './components/NoRecipesFound.vue';
import FavouriteService from './services/FavouriteService.js';
import { eventBus } from './main.js';

export default {
	name: 'app',
	data() {
		return {
			response: {},
			recipes: [],
			selectedRecipe: null,
			recipeDetail: null,
			searchString: '',
			exclusionsArray: [],
			dietaryChoice: '',
			healthChoice: '',
			favouriteRecipes: [],
			selectedFavourite: '',
			componentKey: 0,
			loaded: false,
		};
	},
	mounted() {
		this.fetchFavourites();

		eventBus.$on('recipe-selected', (recipe) => {
			this.selectedRecipe = recipe;
		});

<<<<<<< HEAD
		eventBus.$on('exclusion-entered', excludedIngredients => {
=======
		eventBus.$on('search-entered', (search) => {
			this.searchString = search;
			this.getRecipes();
		});

		eventBus.$on('exclusion-entered', (excludedIngredients) => {
>>>>>>> 1fcac6028a2b3a726103b8ab63216815b5d35970
			this.exclusionsArray = excludedIngredients;
		});

		eventBus.$on('dietary-choices', (choice) => {
			this.dietaryChoice = choice;
		});

		eventBus.$on('health-choices', (choice) => {
			this.healthChoice = choice;
		});

		eventBus.$on('new-favourite', (recipe) => {
			this.addNewFavourite(recipe);
		});

		eventBus.$on('remove-favourite', (recipe) => {
			this.removeSelectedFavourite(recipe);
		});

		eventBus.$on('favourite-selected', (favourite) => {
			this.selectedFavourite = favourite;
		});

		eventBus.$on('search-entered', search => {
			this.searchString = search;
			// this.getRecipes();
		});
	},
	components: {
		'recipe-search': RecipeSearch,
		'recipe-list': RecipeList,
		'shopping-list': ShoppingList,
		'favourite-select': FavouriteSelect,
		'instruction-view': InstructionView,
		'no-recipe-found': NoRecipeFound,
	},
	watch: {
		searchString: function (oldValue, newValue){
      		this.getRecipes()
		}
		// exclusionsArray: function (oldValue, newValue){
      	// 	this.getRecipes()
    	// }
	},
	methods: {
		getFavourite() {
			this.recipes = [];
			let fetchURL = '';
			const splitURI = this.selectedFavourite.split('#');
			fetchURL +=
				'https://api.edamam.com/search?r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23' +
				splitURI[1] +
				`&app_id=${process.env.VUE_APP_RECIPE_ID}&app_key=${process.env.VUE_APP_RECIPE_KEY}`;
			fetch(fetchURL)
				.then((res) => res.json())
				.then((json) => this.recipes.push(json[0]))
				.catch((err) => console.log(err));
		},
		getRecipes() {
			this.loaded = false;
			this.recipes = [];
			let URL = this.buildFetchURL();
			console.log(URL);
			fetch(URL)
				.then((results) => results.json())
				.then((json) =>
					json.hits.forEach((recipe) => this.recipes.push(recipe.recipe))
				)
				.then((res) => (this.loaded = true))
				.catch((err) => console.log(err));
		},
		buildFetchURL() {
			let fetchURL = 'https://api.edamam.com/search?';
			if (this.searchString != '') {
				fetchURL += 'q=' + this.searchString;
			}
			if (this.exclusionsArray.length > 0) {
				this.exclusionsArray.forEach((ingredient) => {
					fetchURL += '&excluded=' + ingredient;
				});
			}
			if (this.dietaryChoice != 'none') {
				fetchURL += '&diet=' + this.dietaryChoice;
			}
			if (this.healthChoice != 'none') {
				fetchURL += '&health=' + this.healthChoice;
			}
			fetchURL += `&app_id=${process.env.VUE_APP_RECIPE_ID}&app_key=${process.env.VUE_APP_RECIPE_KEY}`;
			return fetchURL;
		},
		fetchFavourites() {
			FavouriteService.getFavourites().then(
				(res) => (this.favouriteRecipes = res)
			);
		},
		addNewFavourite(recipe) {
			let payload = {
				name: recipe.label,
				recipe_uri: recipe.uri,
			};
			FavouriteService.addFavourite(payload).then((res) =>
				this.favouriteRecipes.push(res)
			);
		},
		removeSelectedFavourite(recipe) {
			let id = recipe._id;
			FavouriteService.removeFavourite(id).then(
				(res) => (this.favouriteRecipes = res)
			);
		},
	},
};
</script>

<style>
body {
	background-color: #d7dfe0;
}

p {
	display: inline;
	font: 10px;
}

.grid-container-main {
	display: grid;
	grid-template-columns: repeat(20, 1fr);
	grid-template-rows: repeat(100, 50px);
	background-color: white;
	text-align: center;
}

.grid-item-heading {
	grid-area: 1 / 1 / span 2 / span 20;
	background-color: rgba(255, 255, 255, 0);
}

.grid-item-search {
	grid-area: 3 / 1 / span 1 / span 20;
	background-color: rgba(255, 255, 255, 0);
}

.grid-item-favourites {
	grid-area: 4 / 1 / span 1 / span 20;
	background-color: rgba(255, 255, 255, 0);
}

.grid-item-blank-line {
	grid-area: 5 / 1 / span 1 / span 20;
}

.grid-item-recipes {
	grid-area: 6 / 2 / span 15 / span 12;
	background-color: white;
}

.grid-container-recipes {
	display: grid;
	grid-template-columns: auto;
	grid-template-rows: auto;
	background-color: white;
	grid-gap: 40px;
	text-align: left;
}
.grid-item-recipe {
	background-color: #fad4d6;
	border: 3px solid #897475;
	border-radius: 20px;
	padding: 15px;
	margin-bottom: 30px;
	font-family: helvetica, arial, sans-serif;
}

.grid-item-shopping-list {
	grid-area: 6 / 15 / span 15 / span 5;
	background-color: rgba(255, 255, 255, 0);
	font-family: helvetica, arial, sans-serif;
}

h1 {
	color: #494d4e;
	font-family: 'Libre Franklin', 'Helvetica Neue', helvetica, arial, sans-serif;
	text-align: center;
	font-size: 3em;
}

h2 {
	color: #494d4e;
	font-family: 'Libre Franklin', 'Helvetica Neue', helvetica, arial, sans-serif;
	font-size: 2em;
}

h3 {
	color: #494d4e;
	font-family: 'Libre Franklin', 'Helvetica Neue', helvetica, arial, sans-serif;
}
</style>
