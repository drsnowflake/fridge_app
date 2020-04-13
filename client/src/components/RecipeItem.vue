<template>
	<div>
		<li class="recipe-item" v-on:click="handleClick">
			<h3>{{ recipe.label }}</h3>
            <img :src=recipe.image alt="recipe image ">
            <p> Find the full recipe <a :href=recipe.url target="_blank" rel="noreferrer noopener">here</a></p>
            <h4>Ingredients</h4>
            <ul>
                <li v-for="(ingredient, index) in recipe.ingredientLines" :ingredient="ingredient" :key="index">{{ ingredient }}</li>
            </ul>
            <button v-if="!favouritesCheck()" v-on:click="addToFavourites()" type="button">Add to Favourites</button>
            <audio ref="audioElm" src="../assets/add_to_favourites.wav"></audio>
            <button v-if="favouritesCheck()" v-on:click="removeFromFavourites()">Remove from Favourites</button>
		</li>
	</div>
</template>

<script>
import { eventBus } from '../main.js';

export default {
	name: "recipe-item",
    props: ['recipe', 'favourites'],
	methods: {
        favouritesCheck: function () {
             let match = false
             this.favourites.forEach(element => { 
            if (element.recipe_uri === this.recipe.uri){
                this.recipe._id = element._id 
                match = true
            } 
        });
        return match
      },
		handleClick(){
			eventBus.$emit('recipe-selected', this.recipe)
        },
        addToFavourites(){
            eventBus.$emit('new-favourite', this.recipe)
            // this.$refs.audioElm.play();
        },
        removeFromFavourites(){
            eventBus.$emit('remove-favourite', this.recipe)
        }
	
}
}
</script>

<style scoped>
h3{
    color: #052962;
    font-family: "Guardian Text Egyptian Web",Georgia,serif;
    margin: 0.5em; 
  }

  p{
      margin-bottom: 3px;
      margin-top: 3px;
  }
  .recipe-item{
      list-style-type: none;
      border: #052962 solid 2px;
      margin: 10px;
      padding: 0px 5px 5px 5px;
      background-color: lightgray;
      border-radius: 20px;
  }

  li:hover{
      background-color: silver;
      cursor: pointer;
  }

  .pad-left{
      padding: 0px 10px 0px 10px;
      margin: 0px;
      border: 0px;
  }

  .button {
  padding: 10px 20px;
  border: 1px solid #052962;
  color: black;
  margin: 0px 20px 0px 10px;
  font-size: 1em;

}
</style>
