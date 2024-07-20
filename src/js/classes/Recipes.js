import { recipes } from "../data/recipes.js"
import ApplianceFilter from "./ApplianceFilter.js"
import IngredientFilter from "./IngredientFilter.js"
import Search from "./Search.js"
import UtensilFilter from "./UtensilFilter.js"

class Recipes {
    constructor() {
        this.initialRecipes = recipes
        this.recipes = recipes
        this.ingredientsFilter = new IngredientFilter(this)
        this.applianceFilter = new ApplianceFilter(this)
        this.ustensilFilter = new UtensilFilter(this)
        this.search = new Search(this)
        this.selectedFiltersContainer = document.getElementById("filter_container")
        this.recipesContainer = document.getElementById("recipes-container")
        this.recipeCounter = document.getElementById('recipe-counter')
        this.errorScreen = document.getElementById('error-screen')
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

    updateFilters = () => {
        this.ingredientsFilter.refreshFilterItems()
        this.applianceFilter.refreshFilterItems()
        this.ustensilFilter.refreshFilterItems()
        this.displayFilters()
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
        let filteredRecipes = this.initialRecipes

        if (this.applianceFilter.selectedFilters.length !== 0) {
            //filter permet de créer et retourner un tableau des recettes qui remplisse la condition suivante :
            //la recette inclus le filtre des appareils sélectionné (tableau selectedFilters de applianceFilter), via la méthode includes
            filteredRecipes = filteredRecipes.filter((recipe) => this.applianceFilter.selectedFilters.includes(recipe.appliance))
        }
        if (this.ustensilFilter.selectedFilters.length !== 0) {
            //every permet de tester tout les éléments du tableau (selectedFilters de ustensilFilter) et retourne un booléen selon si toutes les conditions sont vraies ou non
            //find renvoie la valeur dy premier élément trouvé dans le tableau qui respecte la condition donnée par la fonction de test passée
            //toUpperCase permet de transformer les strings en majuscules, ce qui permet d'armoniser les deux valeurs afin d'être sur que celles-ci concordent ou non
            filteredRecipes = filteredRecipes.filter((recipe) => this.ustensilFilter.selectedFilters.every(v => recipe.ustensils.find(ustensil => v.toUpperCase() === ustensil.toUpperCase())))
        }
        if (this.ingredientsFilter.selectedFilters.length !== 0) {
            filteredRecipes = filteredRecipes.filter((recipe) => this.ingredientsFilter.selectedFilters.every(v => recipe.ingredients.find(ingredient => v.toUpperCase() === ingredient.ingredient.toUpperCase())))
        }

        //this.recipes = this.search.search(filteredRecipes)
        this.search.search(filteredRecipes)

        this.applianceFilter.refreshFilterItems()
        this.ustensilFilter.refreshFilterItems()
        this.ingredientsFilter.refreshFilterItems()
        
        this.refreshRecipes()

        if (this.search.searchValue.length < 3 && this.search.searchValue.length > 0) {
            this.showSearchTooShortScreen()
        } else if (this.recipes.length === 0) {
            this.showNoRecipesScreen()
        } else {
            this.showRecipesScreen()
        }
    }

    //affiche le conteneur des recettes et cache le conteneur d'error (css)
    showRecipesScreen = () => {
        this.recipesContainer.classList.remove('hidden')
        this.errorScreen.classList.add('hidden')
    }

    //cache le conteneur des recettes et affiche le conteneur d'erreur + remplit le contenu de l'erreur (css)
    showNoRecipesScreen = () => {
        this.errorScreen.innerText = `Aucune recette ne contient "${this.search.searchValue}" vous pouvez chercher « tarte aux pommes », « poisson », etc.`
        this.recipesContainer.classList.add('hidden')
        this.errorScreen.classList.remove('hidden')
    }

    //cache le conteneur des recettes et affiche le conteneur d'erreur + remplit le contenu de l'erreur (css)
    showSearchTooShortScreen = () => {
        this.errorScreen.innerText = 'Vous devez entrer plus de 2 caractères pour que la recherche s\'effectue'
        this.recipesContainer.classList.add('hidden')
        this.errorScreen.classList.remove('hidden')
    }

    //affiche les recettes et les filtres après un tri
    refreshRecipes = () => {
        this.displayFilters()
        this.displayRecipes()
    }

    //permet d'ajouter sur le front le filtre sélectionné et d'appeler la fonction qui permet de filtrer
    handleFilters = () => {
        this.selectedFiltersContainer = document.getElementById("filter_container")
        let table = this.ingredientsFilter.selectedFilters.map(filter => (
            `<div class="flex p-3 bg-[#FFD15B] w-fit rounded-lg mr-6">
                <span class="mr-10" data-filter="ingredients">${filter}</span>
                <img class="cross cursor-pointer" src="./src/images/cross.svg" alt="croix" />
                <img class="remove-filter-cta cursor-pointer hidden" src="./src/images/circle-cross.svg" alt="croix" />
            </div>`
        ))
        table.push(...this.applianceFilter.selectedFilters.map(filter => (
            `<div class="flex p-3 bg-[#FFD15B] w-fit rounded-lg mr-6">
                <span class="mr-10" data-filter="appliance">${filter}</span>
                <img class="cross cursor-pointer" src="./src/images/cross.svg" alt="croix" />
                <img class="remove-filter-cta cursor-pointer hidden" src="./src/images/circle-cross.svg" alt="croix" />
            </div>`
        )))
        table.push(...this.ustensilFilter.selectedFilters.map(filter => (
            `<div class="flex p-3 bg-[#FFD15B] w-fit rounded-lg mr-6">
                <span class="mr-10" data-filter="ustensil">${filter}</span>
                <img class="cross cursor-pointer" src="./src/images/cross.svg" alt="croix" />
                <img class="remove-filter-cta cursor-pointer hidden" src="./src/images/circle-cross.svg" alt="croix" />
            </div>`
        )))

        this.selectedFiltersContainer.innerHTML = table.join('')
        this.filterRecipes()
    }

    //affiche le nombre de recettes
    refreshCounter = () => {
        this.recipeCounter.innerHTML = this.recipes.length
    }

    //supprime puis remet le listener des filtres lorsqu'il y a une mise à jour du html, c'est pour éviter d'avoir une désynchro entre le contenu et l'événement
    handleRemoveFilterListeners = () => {
        document.querySelectorAll('.cross').forEach(filter => {
            filter.removeEventListener('mouseover',(e) => this.crossHover(e, 'over'))
            filter.addEventListener('mouseover', (e) => this.crossHover(e, 'over'))
        })

        document.querySelectorAll('.remove-filter-cta').forEach(selectedFilter => {
            selectedFilter.removeEventListener('click', this.removeFilterListener)
            selectedFilter.addEventListener('click', this.removeFilterListener)

            selectedFilter.removeEventListener('mouseleave', (e) => this.crossHover(e, 'leave'))
            selectedFilter.addEventListener('mouseleave', (e) => this.crossHover(e, 'leave'))
        })
    }

    //fonction permettant de gérer l'affichage de la croix du filter (étiquette jaune) au hover
    crossHover = (e, eventType) => {
        if (eventType === 'over') {
            e.target.classList.add('hidden')
            e.target.parentNode.querySelector('.remove-filter-cta').classList.remove('hidden')
            e.target.parentNode.querySelector('span').classList.add('font-bold')
        } else if (eventType === 'leave') {
            e.target.classList.add('hidden')
            e.target.parentNode.querySelector('.cross').classList.remove('hidden')
            e.target.parentNode.querySelector('span').classList.remove('font-bold')
        }
    }

    removeFilterListener = (e) => {
        const span = e.target.parentNode.querySelector('span')
        const filter = span.getAttribute('data-filter')
        this[filter + 'Filter'].toggleSelectedFilter(span.innerText)
    }
}

export default Recipes