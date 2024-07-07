import Filter from "./Filter.js";

class ApplianceFilter extends Filter {
    constructor (recipeContext) {
        super('Appareils', recipeContext)
        this.refreshFilterItems()
    }

    refreshFilterItems() {
        this.initialItems = this.filteredData.reduce((acc, curr) => {
            const appliance = curr.appliance.charAt(0).toUpperCase() + curr.appliance.slice(1)
            !acc.includes(appliance) && !this.selectedFilters.includes(appliance) ? acc.push(appliance) : acc
            return acc
        }, [])
        this.items = this.initialItems
        this.refreshContainers()
    }
}

export default ApplianceFilter