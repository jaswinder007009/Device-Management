import { PopulateData } from "./FillData";
import { HitApi } from "./HitApi";
import { findResult } from "./search"
import { Sort } from "./Sorting";
import { HtmlElementsData } from "./HtmlElementsId";
import { page } from "./paging";
import { UserRequestStatus } from "./RequestStatus";

(async function(){
    let token=JSON.parse(sessionStorage.getItem("user_info"))["token"];
    new findResult(token).findByUser(); // for get all data 

    var domElement =  new HtmlElementsData();
    (document.querySelector("#waterfall-exp") as HTMLInputElement).addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            let id = (e.target as HTMLInputElement).id;
            (document.getElementById("request-status") as HTMLSelectElement).selectedIndex = 0;     // assign , reject , all 
            let search = (document.getElementById(id) as HTMLInputElement).value;
            (document.getElementById(id) as HTMLInputElement).setAttribute("user" , search)
            new findResult(token).findByUser();
        }});

    (document.querySelector("#device_serial_number") as HTMLInputElement).addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            let id = (e.target as HTMLInputElement).id;
            (document.getElementById("request-status") as HTMLSelectElement).selectedIndex = 0;     // assign , reject , all 
            let search = (document.getElementById(id) as HTMLInputElement).value;
            (document.getElementById(id) as HTMLInputElement).setAttribute("serialNumber" , search)
            new findResult(token).findByUser();
        }});



    (document.querySelector("#getdata") as HTMLSpanElement).addEventListener("click" ,e =>
    {   
        (document.getElementById("waterfall-exp") as HTMLInputElement).value = "";
        (document.getElementById("device_serial_number") as HTMLInputElement).value = "";
        (document.getElementById("request-status") as HTMLSelectElement).selectedIndex = 0;               // assign , reject , all 
        (document.getElementById(domElement.search)  as HTMLInputElement).setAttribute(domElement.userName , "");
        (document.getElementById(domElement.devicesearch)  as HTMLInputElement).setAttribute(domElement.deviceSerial , "");
        new findResult(token).findByUser();
        (document.getElementById("pagination") as HTMLDivElement).setAttribute("page" , "1");    // set page to 1
    });


    (document.querySelector("#tableHead") as HTMLTableHeaderCellElement).addEventListener("click", function (e) {
        let id = (e.target as HTMLInputElement).id;
        if (id === "user"|| id === "admin" ||  id === "serialNumber" || id === "device_name") 
                {
            new Sort().sortBy(id);
            (document.getElementById("pagination") as HTMLDivElement).setAttribute("page" , "1");    // set page to 1
        }});


    (document.querySelector("#pagination") as HTMLButtonElement).addEventListener("click" ,e =>
    {   
        console.log("asdfghjklpoiuytrew");
        var x  = (e.target as HTMLButtonElement).id;
        console.log(x);
    //(document.getElementById("pagination") as HTMLDivElement).setAttribute("page" , x);
        new page(token).slectedPage(x);
    });

    (document.querySelector("#request-status") as HTMLSelectElement).addEventListener("change" ,e =>
    {

    // console.log((document.getElementById("request-status") as HTMLSelectElement).value);
        var requestStatus = (e.target as HTMLOptionElement).value;
        
        requestStatus = getStatus(requestStatus) ;
        if( requestStatus == "")
    { 
        
        (document.getElementById(domElement.search)  as HTMLInputElement).setAttribute(domElement.userName , "");
        (document.getElementById(domElement.devicesearch)  as HTMLInputElement).setAttribute(domElement.deviceSerial , "");
        }
        
        new UserRequestStatus().requestStatusResult(requestStatus);
        
        // console.log(requestStatus);
    });

    console.log((document.getElementById("request-status") as HTMLSelectElement).value);
})();

export function getStatus( requestStatus : string) : string
{
    
    if (requestStatus ==  "Returned" || requestStatus == "returned")
        requestStatus = "Returned";
    
    else if (requestStatus ==  "Rejected" || requestStatus ==  "reject")
    requestStatus = "Rejected";

    else 
    requestStatus = "";
    return requestStatus;
}