<template>
	<div>
		<li v-on:click="handleClick">
			<h3>{{ recipe.recipe.label }}</h3>
		<p>Sound good?</p>
		</li>
	</div>
</template>

<script>
import { eventBus } from '../main.js';

export default {
	name: "recipe-item",
	props: ['recipe'],
	methods: {
		handleClick(){
			eventBus.$emit('recipe-selected', this.recipe)
		}
	}
};

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
  li{
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
</style>
