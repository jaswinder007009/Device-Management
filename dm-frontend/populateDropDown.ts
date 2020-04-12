export class populateDropDown
{
    populateDevice(data:any  , value : string)
    {

        this.clear(value);
        data.map( e=>
            {   
                (document.getElementById(value) as HTMLSelectElement).innerHTML += `<option value="${e.name}">${e.name}</option>`;
              console.log(e.name);
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