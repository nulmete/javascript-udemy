import axios from 'axios';
import { key } from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        try {
            // Blocks execution & returns the resolved promise
            const result = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);

            // Store the array of 30 recipes in the result property
            this.result = result.data.recipes;
        } catch (error) {
            alert(error);
        }
    }
}