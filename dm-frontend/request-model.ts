import { BASEURL } from "./globals";

const Select = mdc.select.MDCSelect;
const TextField = mdc.textField.MDCTextField;



// var BASEURL = "http://localhost:5000";
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
    const url = BASEURL + "/request/add"
    let data = fun()
    console.log(data);
    
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
   const url = BASEURL + '/api/dropdown/';
   

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
    request.noOfDays = parseInt((document.getElementById("expecteddays") as HTMLInputElement).value);
    specs.RAM = selects[3].value;
    specs.Storage = selects[4].value;
    specs.ScreenSize = selects[5].value;
    specs.Connectivity = selects[6].value;
    request.specs =  specs;
    return request;
}

function populateDropdown(id : string, dataArray: any)
{
    console.log(dataArray);
    clear(id);
    for(let data of dataArray)
    {
        document.getElementById(id).innerHTML += `<li class="mdc-list-item" data-value="${data["name"]}">
                                                    <span class="mdc-list-item__text">
                                                    ${data["name"]}
                                                    </span>
                                                    </li>`
    }
}



document.querySelector("#DeviceRequest").addEventListener('click', event =>
{
    submitForm();
})


function clear(id : string)
{

    document.getElementById(id).innerHTML = '';
}


initialiseDropdowns();