<template>
  <div>
        <form>
        <select id="select_favourite" v-on:change="handleSelect($event)" >
            <option>Select Favourite</option>
            <option v-for="favourite in favourites" :key="favourite._id" :value="favourite.recipe_uri">{{ favourite.name }}</option>
        </select>
        </form>
  </div>
</template>

<script>
import { eventBus } from '../main.js';

export default {
    name: "favourite-select",
    props: ['favourites'],
    methods: {
        handleSelect(event){
            eventBus.$emit('favourite-selected', event.target.value)
        }
    }
}
</script>
<style scoped>

</style>