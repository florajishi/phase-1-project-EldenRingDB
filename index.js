document.addEventListener('DOMContentLoaded', (e) => {
    
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
/*Extract Keys from JSON*/
const tableCol = []
for(let i = 0; i < eldenRingData.length; i++){
    for(const key in eldenRingData[i]){
        if(tableCol.indexOf(key) === -1){
            tableCol.push(key)
        }
    }
}
function createTable(){
    const table = createElement('table')
    const tblRow = table.insertRow(-1)

    for(let i = 0; i < tableCol.length; i++){
        const th = createElement('th');
        th.innerHTML = tableCol[i]
        tblRow.appendChild(th)
    }
}

})
