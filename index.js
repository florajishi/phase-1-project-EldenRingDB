
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
            createTable(allData)
            })
    }
    const categorySelect = getElement('#category-select')
    const categories = ['ammos', 'armors', 'ashes', 'bosses', 'creatures', 'incantations', 'items', 'locations', 'npcs', 'shields', 'sorceries', 'spirits', 'talismans', 'weapons']
    categorySelect.addEventListener('click', buildDropdwnMenu, {once: true})
    const table = createElement('table')

    function buildDropdwnMenu(){
        for(let i = 0; i < categories.length; i++){
            let opt = categories[i]
            let selectOption = createElement("option")
            selectOption.textContent = opt
            selectOption.value = opt
            categorySelect.appendChild(selectOption)
        }
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
function createTable(data){
    let column = Object.keys(data[0])
    console.log(column)
    let tr = createElement('tr')
    column.forEach(key =>{
        const th = createElement('th')
        th.textContent = key
        if(th.textContent === 'id'){
            th.remove()
        }else{
            tr.appendChild(th)
            console.log(tr)
            table.appendChild(tr)
        }
        
    })
    data.forEach(obj =>{ 
        let tr = table.insertRow(-1)
        column.forEach(key => {
            let tableCell = tr.insertCell(-1)
            if(Array.isArray(obj[key])){
                obj[key].forEach(item => {
                    let itemData = Object.values(item)
                    const div = createElement('div')
                    div.textContent = itemData
                    tableCell.appendChild(div)
                })
            }else if (key.includes('image')){
                tableCell.innerHTML = `<img src="${obj[key]}">`
            } else if (key.includes('id')){
                delete key
                tableCell.remove()
            } else {
                tableCell.textContent = obj[key]
            }
        })
    })
    const tableContainer = getElement('#tableContainer')
    tableContainer.innerHTML = ''
    tableContainer.appendChild(table)
}
table.setAttribute('class', 'table table-bordered table-dark table-hover table-responsive')

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
    
})
