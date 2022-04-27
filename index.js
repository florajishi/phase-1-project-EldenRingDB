
document.addEventListener('DOMContentLoaded', e =>{
    const URL_PREFIX = 'https://eldenring.fanapis.com/api/'
    const table = createElement('table')
        table.setAttribute('class', 'table table-bordered table-dark table-hover table-responsive rounded-6')


    /* Dynamic DOM Manipulation helpers*/
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
    /* All dropdown menu variables and functionality*/
    const categorySelect = getElement('#category-select')
    const categories = ['ammos', 'armors', 'ashes', 'bosses', 'creatures', 'incantations', 'items', 'locations', 'npcs', 'shields', 'sorceries', 'spirits', 'talismans', 'weapons']
    categorySelect.addEventListener('click', buildDropdwnMenu, {once: true})

    function buildDropdwnMenu(){
        categories.forEach(category => {
            let opt = category
            let selectOption = createElement("option")
            selectOption.textContent = opt
            selectOption.value = opt
            categorySelect.appendChild(selectOption)
        })
    }
    categorySelect.addEventListener('change', (event) => {
        let selectedCategory = categorySelect.options[categorySelect.selectedIndex].value
        selectedCategory.textContent = `${event.target.value}`
        fetchCategory(selectedCategory)
        resetTable()
    })
    function resetTable(){
        table.innerHTML = ''
    }
    
    /* Dynamically generated table from data*/
    function createTable(data){
        createHeader(data)
        createRows(data)
        const tableContainer = getElement('#tableContainer')
            tableContainer.innerHTML = ''
            tableContainer.appendChild(table)
    }
    function createHeader(data){
        let keys = Object.keys(data[0])
        let tr = createElement('tr')
        keys.forEach(key =>{
            const th = createElement('th')
            th.textContent = key
            th.textContent === 'id' ? th.remove() : (tr.appendChild(th) , table.appendChild(tr))
        })
    }
    function createRows(data){
        let keys = Object.keys(data[0])
        data.forEach(obj =>{ 
            let tr = table.insertRow(-1)
            keys.forEach(key => {
                let tableCell = tr.insertCell(-1)
                checkItemKeys(obj, key, tableCell)
            })
        })      
    }
    function checkItemKeys(obj, key, tableCell){
        if(Array.isArray(obj[key])){
            obj[key].forEach(item => {
            const div = createElement('div')
                if(typeof item === 'string'){
                    div.textContent = item
                    tableCell.appendChild(div)
                }else{
                    let itemData = Object.values(item)
                    div.textContent = itemData
                    tableCell.appendChild(div) 
                }
            })
        }
        else if (key.includes('image')){
            tableCell.innerHTML = `<img src="${obj[key]}">`
        }
        else if (key.includes('id')){
            delete key
            tableCell.remove()
        }
        else {
            tableCell.textContent = obj[key]
        }
    }

    /* SEARCH FEATURE */
    const searchInput = getElement("#searchInput")
    searchInput.addEventListener('input', searchData)

    function searchData(){
        const filter = searchInput.value.toUpperCase()
        tr = table.getElementsByTagName('tr')
        for(let i = 0; i < tr.length; i++){
            td = tr[i].getElementsByTagName('td')[0];
            if(td){
                txtVal = td.textContent || td.innerText;
                if(txtVal.toUpperCase().indexOf(filter) > -1){
                    tr[i].style.display = ''
                } else {
                    tr[i].style.display = 'none'
                }
            }
        }
    }
        /* FETCH */
    const fetchCategory = selectedCategory => {
        fetch(`${URL_PREFIX}${selectedCategory}?limit=200`)
        .then(async resp => {
            if(!resp.ok){
                throw Error('ERROR')
            }
            const results = await resp.json()
            const allData = results.data.map(item => (item))
            createTable(allData)
        })
    } 
})

