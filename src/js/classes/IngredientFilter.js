import Filter from "./Filter.js";

class IngredientFilter extends Filter {
    constructor (recipeContext) {
        super('Ingrédients', recipeContext)
        this.refreshFilterItems()
    }

    refreshFilterItems = () => {
        this.initialItems = this.filteredData.reduce((acc, curr) => {
            curr.ingredients.map((ingredient) => {
                const capitalized = ingredient.ingredient.charAt(0).toUpperCase() + ingredient.ingredient.slice(1)
                return !acc.includes(capitalized) && !this.selectedFilters.includes(capitalized) ? acc.push(capitalized) : acc
            })
            return acc
        }, [])
        this.items = this.initialItems
        this.refreshContainers()
    }
}

export default IngredientFilter