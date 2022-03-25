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
})
