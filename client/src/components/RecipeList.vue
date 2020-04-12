<template lang="html">
  <div>
      <ul>
          <recipe-item v-for="(recipe, index) in recipeList" :recipe="recipe" :key="index"></recipe-item>
      </ul>
  </div>
</template>

<script>
import RecipeItem from './RecipeItem.vue';

export default {
    name: 'recipe-list',
    props: ['recipeList'],
    components: {
        "recipe-item": RecipeItem
    }
}
</script>

<style scoped>

</style>