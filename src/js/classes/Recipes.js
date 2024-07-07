import { recipes } from "../data/recipes.js"
import ApplianceFilter from "./ApplianceFilter.js"
import IngredientFilter from "./IngredientFilter.js"
import UtensilFilter from "./UtensilFilter.js"

class Recipes {
    constructor() {
        this.ingredientsFilter = new IngredientFilter(this)
        this.applianceFilter = new ApplianceFilter(this)
        this.ustensilFilter = new UtensilFilter(this)
        this.recipes = recipes
        this.selectedFiltersContainer = document.getElementById("filter_container")
        this.recipesContainer = document.getElementById("recipes-container")
        this.recipeCounter = document.getElementById('recipe-counter')
    }

    //affiche les recettes
    displayRecipes = () => {
        const recipesTemplate = this.recipes.map((recipe, index) => {
            //création d'un tableau avec les ingrédients de la recette
            const ingredientsTemplate = recipe.ingredients.map((ingredient) => {
                let quantity = ''
                if (ingredient.quantity) {
                    quantity += ingredient.quantity
                }
                if (ingredient.unit) {
                    quantity += ' ' + ingredient.unit
                }
                return `<div class="w-1/2 pr-2.5 mb-2">
                            <h4>${ingredient.ingredient}</h4>
                            <span class="text-[#9f9f9f]">${quantity}</span>
                        </div>`
            })

            return `<article duration="${recipe.time}min" class="bg-white w-[30%] ${(index + 1) % 3 === 0 ? '' : 'mr-[5%]'} rounded-3xl min-h-[62rem] overflow-hidden mb-[5%] relative after:content-[attr(duration)] after:text-xs after:px-3 after:py-1 after:bg-[#FFD15B] after:rounded-2xl after:absolute after:top-5 after:right-5">
                        <img src="./src/images/recipes_images/${recipe.image}" alt="Recette de ${recipe.name}" class="h-[16rem] w-full object-cover"/>
                        <div class="px-6 py-8">
                            <h2 class="text-lg font-extrabold">${recipe.name}</h2>

                            <h3 class="uppercase text-[#9f9f9f] text-xs font-semibold mt-8 mb-3">Recette</h3>
                            <p>
                                ${recipe.description}
                            </p>  

                            <h3 class="uppercase text-[#9f9f9f] text-xs font-semibold mt-8 mb-3">Ingrédients</h3>
                            <div class="flex flex-wrap">
                                ${ingredientsTemplate.join('')}
                            </div>
                        </div>
                    </article>`
        })
        //ajout des recettes dans le html
        this.recipesContainer.innerHTML = recipesTemplate.join('')
        this.refreshCounter()
    }

    //affichage des filtres
    displayFilters = () => {
        this.applianceFilter.emptyContainer()
        this.ingredientsFilter.display()
        this.applianceFilter.display()
        this.ustensilFilter.display()
    }

    //filtre les recettes
    filterRecipes = () => {
        let filteredRecipes = recipes 

        if (this.applianceFilter.selectedFilters.length !== 0) {
            //filter permet de créer et retourner un tableau des recettes qui remplisse la condition suivante :
            //la recette inclus le filtre des appareils sélectionné (tableau selectedFilters de applianceFilter), via la méthode includes
            filteredRecipes = filteredRecipes.filter((recipe) => this.applianceFilter.selectedFilters.includes(recipe.appliance))
        }
        if (this.ustensilFilter.selectedFilters.length !== 0) {
            //every permet de tester tout les éléments du tableau (selectedFilters de ustensilFilter) et retourne un booléen selon si touts les conditions sont vraies ou non
            //
            filteredRecipes = filteredRecipes.filter((recipe) => this.ustensilFilter.selectedFilters.every(v => recipe.ustensils.find(ustensil => v.toUpperCase() === ustensil.toUpperCase())))
        }
        if (this.ingredientsFilter.selectedFilters.length !== 0) {
            filteredRecipes = filteredRecipes.filter((recipe) => this.ingredientsFilter.selectedFilters.every(v => recipe.ingredients.find(ingredient => v.toUpperCase() === ingredient.ingredient.toUpperCase())))
        }

        this.recipes = filteredRecipes
        this.applianceFilter.data = filteredRecipes
        this.applianceFilter.refreshFilterItems()
        this.ustensilFilter.data = filteredRecipes
        this.ustensilFilter.refreshFilterItems()
        this.ingredientsFilter.data = filteredRecipes
        this.ingredientsFilter.refreshFilterItems()
        this.displayFilters()
        this.displayRecipes()
    }

    handleFilters = () => {
        this.selectedFiltersContainer = document.getElementById("filter_container")
        let table = this.ingredientsFilter.selectedFilters.map(filter => (
            `<div class="flex p-3 bg-[#FFD15B] w-fit rounded-lg mr-6">
                <span class="mr-10" data-filter="ingredients">${filter}</span>
                <img class="remove-filter-cta cursor-pointer" src="./src/images/cross.svg" alt="croix" />
            </div>`
        ))
        table.push(...this.applianceFilter.selectedFilters.map(filter => (
            `<div class="flex p-3 bg-[#FFD15B] w-fit rounded-lg mr-6">
                <span class="mr-10" data-filter="appliance">${filter}</span>
                <img class="remove-filter-cta cursor-pointer" src="./src/images/cross.svg" alt="croix" />
            </div>`
        )))
        table.push(...this.ustensilFilter.selectedFilters.map(filter => (
            `<div class="flex p-3 bg-[#FFD15B] w-fit rounded-lg mr-6">
                <span class="mr-10" data-filter="ustensil">${filter}</span>
                <img class="remove-filter-cta cursor-pointer" src="./src/images/cross.svg" alt="croix" />
            </div>`
        )))

        this.selectedFiltersContainer.innerHTML = table.join('')
        this.filterRecipes()
    }

    refreshCounter = () => {
        this.recipeCounter.innerHTML = this.recipes.length
    }

    handleRemoveFilterListeners = () => {
        document.querySelectorAll('.remove-filter-cta').forEach(selectedFilter => {
            console.log(selectedFilter)
            selectedFilter.removeEventListener('click', this.removeFilterListener)
            selectedFilter.addEventListener('click', this.removeFilterListener)
        })
    }

    removeFilterListener = (e) => {
        const span = e.target.parentNode.querySelector('span')
        const filter = span.getAttribute('data-filter')
        this[filter + 'Filter'].toggleSelectedFilter(span.innerText)
    }
}

export default Recipes