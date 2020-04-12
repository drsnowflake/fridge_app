use food_app;

db.dropDatabase();


db.favourites.insertMany([
{
    name: "Egg drop chicken noodle soup",
    recipe_uri: "recipe_0f4bb9f24d21fa3e064b3f66083d954c"
},
{
    name: "Chicken, Vegetable, and Ricotta Frittata Recipe",
    recipe_uri: "recipe_322a233df2b6d8a72d301472fdf0f024"
}
])