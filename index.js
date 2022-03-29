
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
            // console.log(allData[0])
            getKeyNames(allData)
            // getKeyValues(allData)
        })
    }
    const categorySelect = getElement('#category-select')
    const categories = ['ammos', 'armors', 'ashes', 'bosses', 'creatures', 'incantations', 'items', 'locations', 'npcs', 'shields', 'sorceries', 'spirits', 'talismans', 'weapons']
    let thead = createElement('thead')
    let tbody = createElement('tbody')
    let table = createElement('table')
    
    categorySelect.addEventListener('click', buildDropdwnMenu, {once: true})

    function buildDropdwnMenu(){
        for(let i = 0; i < categories.length; i++){
            let opt = categories[i]
            let selectOption = createElement("option")
            selectOption.textContent = opt
            selectOption.value = opt
            categorySelect.appendChild(selectOption)
            // console.log(selectOption)
        }
}
categorySelect.addEventListener('change', (event) => {

    let selectedCategory = categorySelect.options[categorySelect.selectedIndex].value
    selectedCategory.textContent = `${event.target.value}`
    console.log(selectedCategory)
    table.remove()
    fetchCategory(selectedCategory)
})    
    // function buildTableFromData(data){
    //     getKeyNames(data)
    //     getKeyValues(data)
    //     table.appendChild(thead)
    // }
    // function getKeyValues(data){
    //     for(let i = 0; i < Object.entries.length[1]; i++){
    //         for(const [key ,value] of Object.entries([i])){
    //         let dataArr = [`${value}`]
    //         console.log(dataArr)
    //         keyValuesToTableData(dataArr)
    //     }
    //     }
        
        
    // }
    // function keyValuesToTableData(keyValues){
    //     keyValues.forEach(keyVal => {
    //         let td = createElement('td')
    //         td.innerText = keyVal
    //         let keyValData = tbody.appendChild(td)
    //         console.log(keyValData)
    //     })
    // }

    function keyNamesToTableHeader(keyNames){
        keyNames.forEach(keyName => {
            let th = createElement('th')
            th.innerText = keyName
            let keyNamesHeaders = thead.appendChild(th)
            console.log(keyNamesHeaders)
            return keyNamesHeaders
        })

    }
    function getKeyNames(data){
        for(const [index,[keyNames, value]] of Object.entries(Object.entries(data[0]))){
            // console.log(keyNames)
            keyNamesArr = [`${keyNames}`]
            keyNamesToTableHeader(keyNamesArr)
        }
    

}
})
