<template lang="html">
  <div class="main-container">
    <form v-on:submit.prevent="handleSearch" >
        <label for="search_box" class="form-inline">Search: </label>
        <input type="text" id="search_box" v-model="searchString" required/>
        <label for="exclusion_box" class="form-inline">Exclude: </label>
        <input type="text" id="exclusion_box" v-model="exclusionString"/>
        <label for="dietary_choices" >Dietary Preference: </label>
        <select id="dietary_choices" v-model="dietaryChoices">
            <option value="none">none</option>
            <option value="balanced">balanced</option>
            <option value="high protein">high protein</option>
            <option value="low-fat">low-fat</option>
            <option value="low-carb ">low-carb </option>
        </select>
        <label for="health_choices" >Health Preference: </label>
        <select id="health_choices" v-model="healthChoices">
            <option value="none">none</option>
            <option value="vegan">vegan</option>
            <option value="vegetarian">vegetarian </option>
            <option value="sugar-conscious">sugar-conscious</option>
            <option value="peanut-free">peanut-free</option>
            <option value="tree-nut-free">tree-nut-free</option>
            <option value="alcohol-free">alcohol-free</option>
        </select>
        <input type="submit" value ="Search" class="button"/>
    </form>
  </div>
</template>

<script>

import { eventBus } from '../main.js';

export default {
    name: 'recipe-search',
    data(){
        return{
            searchString: "",
            exclusionString: "",
            exclusionsArray: [],
            dietaryChoices: 'none',
            healthChoices: 'none'
        }
    },
    props: ['recipeSearch'],
    methods: {
        handleSearch(){
            var stringWithoutCommaSpace = this.searchString.replace(/,\s?/g, ",")
            var stringWithoutSpaces = stringWithoutCommaSpace.replace(/ /g, "+")
            
            var exclusionStringWithoutCommaSpace = this.exclusionString.replace(/,\s?/g, ",")
            var exclusionStringWithoutSpaces = exclusionStringWithoutCommaSpace.replace(/ /g, "+")
            this.exclusionsArray = exclusionStringWithoutCommaSpace.split(',')
          
            eventBus.$emit('dietary-choices', this.dietaryChoices)
            this.dietaryChoices = 'none'

            eventBus.$emit('health-choices', this.healthChoices)
            this.healthChoices = 'none'

            eventBus.$emit('search-entered', stringWithoutSpaces)
            this.searchString = "" 

            eventBus.$emit('exclusion-entered', this.exclusionsArray)
            this.exclusionString = ""
            this.exclusionsArray = [] 
        }
    }

}
</script>

<style scoped>

/* input {
  vertical-align: middle;
  margin: 0px 20px 0px 10px;
  padding: 10px;
  background-color: #f8f8f8;
  border: 1px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
  color: #444;
  font-size: 16px;
  font-family: sans-serif;
  font-weight: 300;
}

label{
    color: #052962;
    font-size: 1.2em;
    font-weight: bold;
    vertical-align: middle;
}

.button {
  vertical-align: middle;
  padding: 10px 20px;
  border: 1px solid #052962;
  color: black;
  margin: 0px 20px 0px 10px;
  font-size: 1em;

}

.button:hover {
  background-color: #052962;
  color: white;
  cursor: pointer;
}

select {
    vertical-align: middle;
	font-size: 16px;
	font-family: sans-serif;
	font-weight: 300;
	color: #444;
	padding: 10px;
	margin: 0px 20px 0px 10px;
	border: 1px solid #aaa;
	box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
	border-radius: .2em;
	appearance: none;
}
select:hover {
    cursor: pointer;
} */

</style>