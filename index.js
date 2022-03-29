
document.addEventListener('DOMContentLoaded', e =>{
    const URL_PREFIX = 'https://eldenring.fanapis.com/api/'
    /* get and create Element functions*/
    function getElement(selector){
        const element = document.querySelector(selector)

        if(element) return element
        throw Error(`${selector} doesn't exist`)
    }
    function createElement(selector){
        const element = document.createElement(selector)

        if(element) return element
        throw Error(`${selector} doesn't exist`)
    }
    function fetchCategory(selectedCategory){
        fetch(`${URL_PREFIX}${selectedCategory}`)
        .then(async resp => {
            if(!resp.ok){
                throw Error('ERROR')
            }
            const results = await resp.json()
            const allData = results.data.map(item => (item))
            console.log(allData)
        })
    }
    const categorySelect = getElement('#category-select')
    const categories = ['ammos', 'armors', 'ashes', 'bosses', 'creatures', 'incantations', 'items', 'locations', 'npcs', 'shields', 'sorceries', 'spirits', 'talismans', 'weapons']

    categorySelect.addEventListener('click', buildDropdwnMenu, {once: true})

    function buildDropdwnMenu(){
        for(let i = 0; i < categories.length; i++){
            let opt = categories[i]
            let selectOption = createElement("option")
            selectOption.textContent = opt
            selectOption.value = opt
            categorySelect.appendChild(selectOption)
            console.log(selectOption)
        }
}
categorySelect.addEventListener('change', (event) => {
    let selectedCategory = categorySelect.options[categorySelect.selectedIndex].value
    selectedCategory.textContent = `${event.target.value}`
    console.log(selectedCategory)
    fetchCategory(selectedCategory)
})

// selectedCategory.onclick = fetchCategory(selectedCategory)

    // const categorySelection = categories => {
    //     for(let i = 0; i < categorySelect.length; i++){
    //         if(categorySelect.options[i].value === categories[i]){
    //             categorySelect.selectedIndex = i
    //         }
    //     }
    // }
    // function categorizeData(data){
    //     for(let i = 0; i < data.length; i++){
    //         console.log(data[i])
            
    //     }
    // }
    // function getKeyNames(data){
    //     let keyNames = []
    //     Object.keys(data[0].forEach(key => keyNames.push(key)))
    //     console.log(keyNames)
    // }

})
