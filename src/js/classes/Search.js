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

        const regex = new RegExp(this.searchValue, 'i');
        this.recipeContext.recipes = filteredRecipes.filter((recipe) => {
            return recipe.name.match(regex)
                || recipe.description.match(regex)
                || recipe.ingredients.some(ingredient => ingredient.ingredient.match(regex));
        });
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