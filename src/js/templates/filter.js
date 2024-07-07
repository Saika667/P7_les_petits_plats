const filterTemplate = (filterName, filterItems, selectedFilters = []) => {
    const items = searchItemsTemplate(filterItems)

    const htmlSelectedFilters = selectedFilters.map((item, index) => (
        `<span class="filter-item py-2">${item}</span>`
    ))

    return document.createRange().createContextualFragment(`
        <div id="${filterName}" class="flex flex-col relative bg-white min-w-52 rounded-xl py-4 px-6 mr-20 max-h-64 h-fit">
            <button class="filter flex items-center justify-between">
                <span class="font-medium">${filterName}</span>
                <img src="./src/images/arrowDown.svg" alt="flèche" />
            </button>
            
            <div class="bottom-container absolute overflow-y-hidden flex flex-col h-0 max-h-56 left-0 right-0 bg-white rounded-b-xl top-full m-auto z-10 p-0">
                <div class="px-6">
                    <div class="border border-solid border-[#cbcbcb] relative mb-4 rounded-[2px] py-2 pl-2 pr-8 box-border w-full">
                        <input type="text" class="search-bar block w-full box-border focus:outline-none" />
                        <button class="absolute top-0 bottom-0 right-3">
                            <img src="./src/images/magnifiying.svg" alt="loupe"/>
                        </button>
                    </div>
                </div>

                <div class="mb-6">
                    <div class="cursor-pointer px-6 bg-[#FFD15B] flex flex-col">${htmlSelectedFilters.join('')}</div>
                </div>

                <div class="overflow-y-scroll no-scrollbar px-6">
                    <div id="${filterName}-search-items" class="cursor-pointer">${items.join('')}</div>
                </div>
            </div>
        </div>
    `)
}

const searchItemsTemplate = (filterItems) => {
    return filterItems.map((item, index) => (
        `<span class="filter-item block w-fit ${index !== filterItems.length -1 ? 'mb-2' : ''}">${item}</span>`
    ))
}

export { filterTemplate, searchItemsTemplate }