<template>
  <div>
      <p>I'm the shopping list</p>
      <div v-if="selectedRecipe" id="checkboxes">
      <label>some label</label>
      <!-- <ul>
        <li><input type="checkbox" v-for="(ingredient, index) in selectedRecipe.ingredientLines" :ingredient="ingredient" :key="index"> {{ingredient}}</li>
      </ul> -->
      </div>
    </div>
</template>

<script>
export default {
  name: 'shopping-list',
  props: ['selectedRecipe']


}
</script>

<style>

</style>