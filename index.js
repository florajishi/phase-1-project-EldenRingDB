
document.addEventListener('DOMContentLoaded', e =>{/* get and create Element functions*/
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

fetch('https://eldenring.fanapis.com/api/items')
    .then(res => {
        if(!res.ok){
            throw Error('ERROR')
        }
        return res.json()

    .then(itemData => {
        // console.log(itemData.data)
        const allItems = itemData.data.map(item =>{
            // console.log(key)
         return `
         <tbody>
            <tr>
            
                <td>${item.name}</td>
                <td><img src="${item.image}"></td>
                <td>${item.description}</td>
                <td>${item.type}</td>
                <td>${item.effect}</td>
                
            </tr>
        </tbody>`
        }).join('')
        // console.log(html);
    let itemsTableHeader = createElement('thead')
    itemsTableHeader.innerHTML = `         
        <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Description</th>
            <th>Type</th>
            <th>Effect</th>
        </tr>`
    itemsTable = getElement('#items-table')
    itemsTable.innerHTML = allItems
    itemsTable.appendChild(itemsTableHeader)

    })
    .catch(err => 
        console.log(err))

    })
})
