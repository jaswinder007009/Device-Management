const Select = mdc.select.MDCSelect;
const TextField = mdc.textField.MDCTextField;




class RequestDevice
{
    deviceModel : string
    deviceBrand : string
    deviceType : string
    specs : Specification
    noOfDays : number
    comment : string = ""
}
class Specification
{
    RAM : String 
    Storage : String
    ScreenSize : String
    Connectivity :  String
}

console.log(Select);

// const MDCFooFoundation = mdc.select.MDCSelectFoundation;

const selects = [].map.call(document.querySelectorAll('.mdc-select'), function(el) {
    
    return new Select(el);
});

console.log(selects);
const textField = new TextField(document.querySelector('.mdc-text-field'));


// document.addEventListener('onload' ,e =>)


// select.listen('MDCSelect:change', ev => {
//     console.log('Value : ' + select.value + " at index " + select.selectedIndex);
// })


function  submitForm()
{
    const url = 'https://localhost:44392/api/Request'
    let data = fun()
    fetch(url , {
        method : "post",
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    }).then(res =>
        console.log(res))
        .catch(e =>
            console.log(e));
            

}

function initialiseDropdowns(){
   // const url = 'http://localhost:5000/api/dropdown/';
    const url = 'https://localhost:44392/api/Dropdown/';

    // Iterate over all the dropdown elements
    selects.forEach(selectElement => {
        const urlSnip = selectElement.root_.dataset.urlSnip;  // Gets the `data-url-snip` attribute and add it with the url to make a fetch request
        
        fetch(url + urlSnip)
        .then(res => res.json())
        .then(data => populateDropdown(urlSnip, data));
    });

}


function  fun () :  RequestDevice
{
    let specs = new Specification();
    let request = new RequestDevice();
    request.deviceType = selects[0].value;
    request.deviceBrand = selects[1].value;
    request.deviceModel = selects[2].value;
    specs.RAM = selects[2].value;
    specs.Storage = selects[2].value;
    specs.ScreenSize = selects[2].value;
    specs.Connectivity = selects[2].value;
    request.specs =  specs;
    return request;
}

            // selects[0].listen('MDCSelect:change', ev => {
            //    console.log(ev);
            // console.log('Value : ' + selects[0].value + " at index " + selects[0].selectedIndex);
            //     })
            
    // let head=[];
    // selects.forEach(selectElement => {
    //     const urlSnip = selectElement.root_.id;
    //     console.log((document.getElementById(urlSnip) as HTMLSelectElement).value);

// });
// }

function populateDropdown(id : string, dataArray: any)
{
    console.log(dataArray);
    clear(id);
    for(let data of dataArray)
    {
        document.getElementById(id).innerHTML += `<li class="mdc-list-item" data-value="${data["value"]}">
                                                    <span class="mdc-list-item__text">
                                                    ${data["value"]}
                                                    </span>
                                                    </li>`
    }
}


function clear(id : string)
{

    document.getElementById(id).innerHTML = '';
}


initialiseDropdowns();