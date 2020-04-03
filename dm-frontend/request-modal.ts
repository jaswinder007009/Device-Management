const Select = mdc.select.MDCSelect;
const TextField = mdc.textField.MDCTextField;

// const MDCFooFoundation = mdc.select.MDCSelectFoundation;

const selects = [].map.call(document.querySelectorAll('.mdc-select'), function(el) {
    return new Select(el);
});

console.log(selects);
const textField = new TextField(document.querySelector('.mdc-text-field'));



// select.listen('MDCSelect:change', ev => {
//     console.log('Value : ' + select.value + " at index " + select.selectedIndex);
// })


(function initialiseDropdowns(){
    const url = 'http://localhost:5000/api/dropdown/'

    // Iterate over all the dropdown elements
    selects.forEach(selectElement => {
        const urlSnip = selectElement.root_.dataset.urlSnip;  // Gets the `data-url-snip` attribute and add it with the url to make a fetch request
        
        fetch(url + urlSnip)
        .then(res => res.json())
        .then(data => populateDropdown(selectElement.root_, data));
    });

})();

function populateDropdown(dropdownElement: HTMLDivElement, dataArray: any){
    const listElement: HTMLUListElement = dropdownElement.querySelector('.mdc-select__menu>ul');
    // First, clear the element
    {
        const childCount = listElement.childElementCount;
        if(childCount > 1){
            const children: HTMLCollection = listElement.children;
            for(let i = childCount - 1; i > 2; i--){
                // console.log(children[i]);
                listElement.removeChild(children[i]);
            }
        }
    }
    console.log(dataArray);
}