<template>
	<div>
    <h1>Fridge App</h1>
    <section class="main-container">
      <div class="center">
        <recipe-search :recipeSearch='searchString' ></recipe-search>
      </div>  
    </section>
    <section class="main-container">
        <div class="flex-item main-left">
          <div class ="sub-heading">
            <!-- <h2>{{subHeadingToDisplay}}</h2> -->
          </div>
          <div>
            <recipe-list :favourites='favouriteRecipes' :recipeList='recipes' ></recipe-list>
          </div>
        </div>
        <!-- <shopping-list :shoppingList='shoppingList' class="flex-item main-right"></shopping-list> -->
    </section>
	</div>
</template>

<script>
import RecipeSearch from './components/RecipeSearch.vue';
import RecipeList from './components/RecipeList.vue';
import ShoppingList from './components/ShoppingList.vue';
import FavouriteService from './services/FavouriteService.js';
import { eventBus } from './main.js';

export default {
  name: 'app',
  data (){
    return {
      response: {},
      recipes: [],
      selectedRecipe: null,
      recipeDetail: null,
      searchString: "",
      dietaryChoice: "",
      healthChoice: "",
      newFavourite: null,
      removeFavourite: null,
      favouriteRecipes: []
    }
  },
  mounted(){
    this.fetchFavourites()

    eventBus.$on('recipe-selected', (recipe) => {
      this.selectedRecipe = recipe
    })

    eventBus.$on('search-entered', (search) => {
      this.searchString = search
    })

    eventBus.$on('dietary-choices', (choice) => {
    this.dietaryChoice = choice
    })

    eventBus.$on('health-choices', (choice) => {
    this.healthChoice = choice
    })

    eventBus.$on('new-favourite', (recipe) => {
    this.newFavourite = recipe
    })

    eventBus.$on('remove-favourite', (recipe) => {
    this.removeFavourite = recipe
    })
    
  },
  watch: {
    newFavourite: function (oldValue, newValue){
       this.addNewFavourite(this.newFavourite)
    },
    removeFavourite: function (oldValue, newValue){
       this.removeSelectedFavourite(this.removeFavourite)
    },
    searchString: function (oldValue, newValue){
      this.getRecipes(this.searchString)

    },
    orderPriority: function (oldValue, newValue){
      this.getRecipes(this.searchString)

    }
  },
  components: {
    "recipe-search": RecipeSearch,
    "recipe-list": RecipeList,
    "shopping-list": ShoppingList
  },
  methods: {
      getRecipes(){
        let URL = this.buildFetchURL()
        fetch(URL)
        .then(results => results.json())
        .then(json => (this.recipes = json.hits))
        .catch(err => console.log(err))
        },
        buildFetchURL(){
          let fetchURL = ''
          let baseURL = 'https://api.edamam.com/search?'
          if (this.searchString != ""){
            fetchURL = baseURL + 'q=' + this.searchString 
          }
          if (this.dietaryChoice != 'none'){
            fetchURL += '&diet=' + this.dietaryChoice
          }
          if (this.healthChoice != 'none'){
            fetchURL += '&health=' + this.healthChoice
          }
          fetchURL += `&app_id=${process.env.VUE_APP_RECIPE_ID}&app_key=${process.env.VUE_APP_RECIPE_KEY}&from=0&to=4`
          return fetchURL
        },
      fetchFavourites(){
        FavouriteService.getFavourites()
        .then((res) => (this.favouriteRecipes = res))
    },
      addNewFavourite(recipe){
        let payload = {
          "name": recipe.recipe.label,
          "recipe_uri": recipe.recipe.uri
        }
        FavouriteService.addFavourite(payload)
      },
      removeSelectedFavourite(recipe){
        let id = recipe._id
        FavouriteService.removeFavourite(id)
      }
    },
    
}
</script>

<style>
h1{
    color: #052962;
    font-family: "Guardian Text Egyptian Web",Georgia,serif;
    text-align: center;
    font-size: 3em;
  }

  h2{
    color: #052962;
    font-family: "Guardian Text Egyptian Web",Georgia,serif;
    font-size: 1.7em;
    margin-bottom: 0;
  }

  h3{
    color: #052962;
    font-family: "Guardian Text Egyptian Web",Georgia,serif;
  }

  .main-container{
    display: flex;
    justify-content: space-between;
    flex: 5;
    flex-direction: row;
  }

  .main-left {
    flex: 4;
    padding: 10px;

  }

  .main-right {
    flex: 1;
    padding: 10px;
  
  }

  .center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  border: 5px;
  padding: 5px;
  }
  .sub-heading {
  margin-left: auto;
  text-align: center;
  margin-bottom: 0;
  }
  </style>
