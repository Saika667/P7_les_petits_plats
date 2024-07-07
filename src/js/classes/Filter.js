import { filterTemplate, searchItemsTemplate } from "../templates/filter.js"
import { recipes } from "../data/recipes.js"

class Filter {
    constructor (title, recipeContext) {
        this.container = document.getElementById('filters-container')
        this.selectedFilters = []
        this.initialItems = []
        this.items = []
        this.title = title
        this.data = recipes
        this.filteredData = recipes
        this.recipeContext = recipeContext
    }

    emptyContainer = () => {
        this.container.innerHTML = ''
    }

    display = () => {
        this.sort()
        // ajoute le html
        this.container.appendChild(filterTemplate(this.title, this.items))

        this.registerListeners()
    }

    sort = () => {
        this.items.sort((a, b) => a.localeCompare(b))
    }
    
    search = (e) => {
        this.items = this.initialItems.filter(item => item.toUpperCase().includes(e.target.value.toUpperCase()))
        this.refreshSearchItems()
        this.registerListeners()
    }

    refreshSearchItems = () => {
        const searchItemsContainer = this.container.querySelector(`#${this.title}-search-items`)
        searchItemsContainer.innerHTML = ''
        searchItemsContainer.innerHTML = searchItemsTemplate(this.items).join('')
    }

    // récupère les elements html dont nous aurons besoin pour toggle visibility
    refreshContainers = () => {
        this.itemsContainer = this.container.querySelector(`#${this.title} .bottom-container`)
        this.initialContainer = this.container.querySelector(`#${this.title}`)
    }

    registerListeners = () => {
        this.refreshContainers()
        
        document.querySelector(`#${this.title} button.filter`).removeEventListener('click', this.toggleFilterListener)
        document.querySelector(`#${this.title} button.filter`).addEventListener('click', this.toggleFilterListener)

        // ajoute listener selection filtre
        document.querySelectorAll(`#${this.title} .filter-item`).forEach(filterItem => {
            filterItem.removeEventListener('click', this.toggleSelectedFilter)
            filterItem.addEventListener('click', e => this.toggleSelectedFilter(e.target.innerText))
        })

        // recherche
        document.querySelector(`#${this.title} .search-bar`).removeEventListener('keyup', this.search)
        document.querySelector(`#${this.title} .search-bar`).addEventListener('keyup', this.search)
    }

    toggleFilterListener = () => {
        this.toggleVisibility()
    }

    toggleSelectedFilter = (filterText) => {
        if (this.selectedFilters.includes(filterText)) {
            this.selectedFilters.splice(this.selectedFilters.indexOf(filterText), 1)
            this.items.push(filterText)
        } else {
            this.selectedFilters.push(filterText)
            this.items.splice(this.items.indexOf(filterText), 1)
        }
        this.sort()
        this.recipeContext.handleFilters()
        this.recipeContext.handleRemoveFilterListeners()
        this.initialContainer.replaceWith(filterTemplate(this.title, this.items, this.selectedFilters))
        this.registerListeners()
    }

    getFilters = () => {
        return this.selectedFilters
    }

    toggleVisibility = () => {
        this.itemsContainer.classList.toggle('h-0')
        this.itemsContainer.classList.toggle('p-0')
        this.itemsContainer.classList.toggle('py-4')
        this.itemsContainer.classList.toggle('h-auto')
        this.initialContainer.classList.toggle('rounded-b-none')
    }
}

export default Filter