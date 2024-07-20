import Filter from "./Filter.js";

class UtensilFilter extends Filter {
    constructor (recipeContext) {
        super('Ustensils', recipeContext)
        this.refreshFilterItems()
    }

    //permet de rafraichir la liste des filtres
    refreshFilterItems() {
        this.initialItems = this.recipeContext.recipes.reduce((acc, curr) => {
            //map sur chaque élément du tableau ustensils de la recette
            curr.ustensils.map((ustensil) => {
                //remplace le premier caractère par une majuscule
                ustensil = ustensil.charAt(0).toUpperCase() + ustensil.slice(1)
                //si la valeur n'est pas inclus dans acc et si la valeur n'est pas inclus dans le tableau selectedFilters on ajoute au tableau acc
                return !acc.includes(ustensil) && !this.selectedFilters.includes(ustensil) ? acc.push(ustensil) : acc
            })
            return acc
        }, [])
        this.items = this.initialItems
        this.refreshContainers()
    }
}

export default UtensilFilter