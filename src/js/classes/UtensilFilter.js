import Filter from "./Filter.js";

class UtensilFilter extends Filter {
    constructor (recipeContext) {
        super('Ustensils', recipeContext)
        this.refreshFilterItems()
    }

    refreshFilterItems() {
        this.initialItems = this.filteredData.reduce((acc, curr) => {
            curr.ustensils.map((ustensil) => {
                ustensil = ustensil.charAt(0).toUpperCase() + ustensil.slice(1)
                return !acc.includes(ustensil) && !this.selectedFilters.includes(ustensil) ? acc.push(ustensil) : acc
            })
            return acc
        }, [])
        this.items = this.initialItems
        this.refreshContainers()
    }
}

export default UtensilFilter