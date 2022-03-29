
document.addEventListener('DOMContentLoaded', e =>{
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
    const fetchCategory = selectedCategory => {
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
    const select = getElement('#category-select')
    const buildDropdwnMenu = () =>{
        const categories = new Array(
            'ammos', 'armors', 'ashes', 'bosses', 'creatures', 'incantations', 'items', 'locations', 'npcs', 'shields', 'sorceries', 'spirits', 'talismans', 'weapons'
            )
        for(let i = 0; i < categories.length; i++){
            let option = categories[i]
            const optElem = createElement('option')
            optElem.textContent = option
            optElem.value = option
            select.appendChild(optElem)
        }
    }
    const categorySelection = categories => {
        for(let i = 0; i < select.length; i++){
            if(select.options[i].value === categories[i]){
                select.selectedIndex = i
            }
        }
    }
    function fetchJson(urls){
        fetch(urls)
        .then(async resp => {
            if(!resp.ok){
                throw Error('ERROR')
            }
            const results = await resp.json()
            const allData = results.data.map(item => (item))
            // console.log(allData)
            categorizeData(allData)
        })
    }
    function categorizeData(data){
        for(let i = 0; i < data.length; i++){
            console.log(data[i])
            
        }
    }
    function getKeyNames(data){
        let keyNames = []
        Object.keys(data[0].forEach(key => keyNames.push(key)))
        console.log(keyNames)
    }

})
