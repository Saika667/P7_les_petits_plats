class Search {
    constructor(recipeContext) {
        this.recipeContext = recipeContext
        this.searchValue = ''
        this.registerListeners()
    }

    //permet de faire la recherche
    search = (filteredRecipes) => {
        //cette fonction est appelé dans tout les cas, qu'il y aille ou non une recherche d'écrite dans la barre de recherche
        //s'il n'y a pas de recherche faite, alors on récupère recipes de la classe Recipes via le contexte que l'on a passé à Search
        //on associe filteredRecipes à recipes de la classe Recipes
        if (this.searchValue < 3) {
            this.recipeContext.recipes = filteredRecipes
            return
        }
        //return
        const tmpRecipes = []
        for (let i = 0; i < filteredRecipes.length - 1; i++) {
            const recipe = filteredRecipes[i]
            if (recipe.name.toUpperCase().includes(this.searchValue.toUpperCase())) {
                tmpRecipes.push(recipe)
            } else if (recipe.description.toUpperCase().includes(this.searchValue.toUpperCase())) {
                tmpRecipes.push(recipe)
            } else {
                for (let j = 0; j < recipe.ingredients.length - 1; j++) {
                    if (recipe.ingredients[j].ingredient.toUpperCase().includes(this.searchValue.toUpperCase())) {
                        tmpRecipes.push(recipe)
                        break;
                    }
                }
            }
        }

        this.recipeContext.recipes = tmpRecipes
    

        // this.recipeContext.recipes = filteredRecipes.filter((recipe) => {
        //     return recipe.name.toUpperCase().includes(this.searchValue.toUpperCase())
        //         || recipe.description.toUpperCase().includes(this.searchValue.toUpperCase())
        //         || recipe.ingredients.find(ingredient => ingredient.ingredient.toUpperCase().includes(this.searchValue.toUpperCase()))
        // })
        this.recipeContext.refreshRecipes()
        this.recipeContext.updateFilters()
    }

    registerListeners = () => {
        document.getElementById('search-bar').addEventListener('keyup', (e) => {
            const searchValue = e.target.value

            this.searchValue = searchValue
            this.recipeContext.filterRecipes()
        })
    }
}

export default Search