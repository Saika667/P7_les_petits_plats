import Filter from "./Filter.js";

class ApplianceFilter extends Filter {
    constructor (recipeContext) {
        super('Appareils', recipeContext)
        this.refreshFilterItems()
    }

    //permet de rafraichir la liste des filtres
    refreshFilterItems() {
        this.initialItems = this.recipeContext.recipes.reduce((acc, curr) => {
            //remplace la première lettre par une majuscule
            const appliance = curr.appliance.charAt(0).toUpperCase() + curr.appliance.slice(1)
            //si la valeur n'est pas inclus dans acc et si la valeur n'est pas inclus dans le tableau selectedFilters on ajoute au tableau acc
            !acc.includes(appliance) && !this.selectedFilters.includes(appliance) ? acc.push(appliance) : acc
            return acc
        }, [])
        this.items = this.initialItems
        this.refreshContainers()
    }
}

export default ApplianceFilter