import axios from 'axios';
import { key } from '../config';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const result = await axios(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);

            this.title = result.data.recipe.title;
            this.author = result.data.recipe.publisher;
            this.img = result.data.recipe.image_url;
            this.url = result.data.recipe.source_url;
            this.ingredients = result.data.recipe.ingredients;
        } catch (error) {
            alert('Something went wrong :(');
        }
    }

    // Every 3 ingredients (considering an ingredient as an element of the array) -> 15 min
    calculateTime() {
        const numOfIngredients = this.ingredients.length;
        const periods = Math.ceil(numOfIngredients / 3);

        this.time = periods * 15;
    }

    calculateServings() {
        this.servings = 4;
    }

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort, 'kg', 'g'];

        const newIngredients = this.ingredients.map(el => {
            // Uniform units
            let ingredient = el.toLowerCase();

            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });

            // Remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // Parse ingredients into count, unit and ingredient itself
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el => units.includes(el));

            let objIng;

            if (unitIndex > -1) {

                // There is a unit
                // Everything that is before the unit, is a number
                // Example: ['4', '1/2', 'cups'] -> arrCount = ['4', '1/2']
                //          ['4', 'cups'] -> arrCount = ['4']
                const arrCount = arrIng.slice(0, unitIndex);
                let count;

                if (arrCount.length === 1) {
                    // Example: '4' -> 4
                    // Example: '4-1/2' -> '4+1/2'
                    count = eval(arrIng[0].replace('-', '+'));

                } else {

                    // Join the two numbers (strings) and then eval
                    // eval '4+1/2' = 4.5
                    count = eval(arrIng.slice(0, unitIndex).join('+'));

                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ') // from the unit to the end
                }

            } else if (parseInt(arrIng[0]))  {

                // There is no unit, but 1st element is a number
                // '234' can be parsed to int -> true
                // 'text' can't be parsed to int -> NaN (false)
                objIng = {
                    count: parseInt(arrIng[0]),
                    unit: '',

                    // without the first element (number)
                    // ['italian', 'tomato', 'sauce'] -> italian tomato sauce
                    ingredient: arrIng.slice(1).join(' ')
                }

            } else if (unitIndex === -1) {

                // There is no unit and no number in 1st position
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }
                
            }

            return objIng;
        });

        // Structure: [{count, unit, ingredient}, {count, unit, ingredient}, {count, unit, ingredient}]
        this.ingredients = newIngredients;
    }

    // type = 'dec' or 'inc'
    updateServings(type) {
        // Servings
        const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

        // Ingredients
        this.ingredients.forEach(ingredient => {
            // new count = old count * (new servings / old servings)
            ingredient.count *= (newServings / this.servings);
        });

        this.servings = newServings;
    }
}