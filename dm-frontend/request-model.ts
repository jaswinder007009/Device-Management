const Select = mdc.select.MDCSelect;
const TextField = mdc.textField.MDCTextField;



class RequestDevice
{
    deviceModel : string =""
    deviceBrand : string =""
    deviceType : string =""
    specs : Specification | undefined 
    noOfDays : number = 0
    comment : string = ""
}

class Specification
{
    RAM : String | undefined 
    Storage : String | undefined
    ScreenSize : String | undefined
    Connectivity :  String | undefined
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


function  hitPostApi(data : RequestDevice)
{
    const url = 'https://localhost:44392/api/Request'
    
    
    console.log(JSON.stringify(data));
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
    const url = 'http://localhost:5000/api/dropdown/';
    //const url = 'https://localhost:44392/api/Dropdown/';
    selects.forEach(selectElement => {
        const urlSnip = selectElement.root_.dataset.urlSnip;  // Gets the `data-url-snip` attribute and add it with the url to make a fetch request
        
        fetch(url + urlSnip)
        .then(res => res.json())
        .then(data => populateDropdown(urlSnip, data));
    });
}


function  submitForm() :  null
{
    for (let val of selects)
    {
        if(val.value == "")
        {
            alert("please fill all fields");
            return null;
        }
    }    
    let specs = new Specification();
    let request = new RequestDevice();
    request.noOfDays =parseInt((document.getElementById("no-of-days") as HTMLInputElement).value);
   
    request.deviceType = selects[0].value;
    request.deviceBrand = selects[1].value;
    request.deviceModel = selects[2].value;
    specs.RAM = selects[3].value;
    specs.Storage = selects[4].value;
    specs.ScreenSize = selects[5].value;
    specs.Connectivity = selects[6].value;
    request.specs =  specs;
    


    hitPostApi(request);
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
        (document.getElementById(id) as HTMLDivElement).innerHTML += `<li class="mdc-list-item" data-value="${data["value"]}">
                                                    <span class="mdc-list-item__text">
                                                    ${data["value"]}
                                                    </span>
                                                    </li>`
    }
}


function clear(id : string)
{

    (document.getElementById(id) as HTMLDivElement).innerHTML = '';
}


initialiseDropdowns();