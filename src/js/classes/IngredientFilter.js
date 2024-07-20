import Filter from "./Filter.js";

class IngredientFilter extends Filter {
    constructor (recipeContext) {
        super('Ingrédients', recipeContext)
        this.refreshFilterItems()
    }

    //permet de rafraichir la liste des filtres
    refreshFilterItems = () => {
        this.initialItems = this.recipeContext.recipes.reduce((acc, curr) => {
            //map sur chaque élément du tableau ingredients de la recette
            curr.ingredients.map((ingredient) => {
                //remplace le premier caractère par une majuscule
                const capitalized = ingredient.ingredient.charAt(0).toUpperCase() + ingredient.ingredient.slice(1)
                //si la valeur n'est pas inclus dans acc et si la valeur n'est pas inclus dans le tableau selectedFilters on ajoute au tableau acc
                return !acc.includes(capitalized) && !this.selectedFilters.includes(capitalized) ? acc.push(capitalized) : acc
            })
            return acc
        }, [])
        this.items = this.initialItems
        this.refreshContainers()
    }
}

export default IngredientFilter