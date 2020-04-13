import { device } from "./deviceModel";

export class populateDropDown
{
    populateDevice(data:any  , value : string)
    {

        this.clear(value);
        data.map( e=>
            {   var data = new device(e);
                (document.getElementById(value) as HTMLSelectElement).innerHTML += `<option value="${data.id}">${data.value}</option>`;
              console.log(e);
            });
    }
    populateSpecs(data:any  , value : string )
    {

    }
    
    concatSpecs(value : any )
    {
        
    }
    clear(value : string)
    {
        (document.getElementById(value) as HTMLSelectElement).innerHTML = ""
    }
}