import { PopulateData } from "./FillData";
import { HitApi } from "./HitApi";
import { findResult } from "./search"
import { Sort } from "./Sorting";
import { HtmlElementsData } from "./HtmlElementsId";
import { page } from "./paging";
import { UserRequestStatus } from "./RequestStatus";

new findResult().findByUser(); // for get all data 

var domElement =  new HtmlElementsData();
(document.querySelector("#waterfall-exp") as HTMLInputElement).addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        let id = (e.target as HTMLInputElement).id;
        (document.getElementById("request-status") as HTMLSelectElement).selectedIndex = 0;     // assign , reject , all 
        let search = (document.getElementById(id) as HTMLInputElement).value;
        (document.getElementById(id) as HTMLInputElement).setAttribute("user" , search)
        new findResult().findByUser();
    }});

(document.querySelector("#device") as HTMLInputElement).addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        let id = (e.target as HTMLInputElement).id;
        (document.getElementById("request-status") as HTMLSelectElement).selectedIndex = 0;     // assign , reject , all 
        let search = (document.getElementById(id) as HTMLInputElement).value;
        (document.getElementById(id) as HTMLInputElement).setAttribute("serialNumber" , search)
        new findResult().findByUser();
    }});






    (document.querySelector("#waterfall-exp") as HTMLInputElement).addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            let id = (e.target as HTMLInputElement).id;
            (document.getElementById("request-status") as HTMLSelectElement).selectedIndex = 0;     // assign , reject , all 
            let search = (document.getElementById(id) as HTMLInputElement).value;
            (document.getElementById(id) as HTMLInputElement).setAttribute("user" , search)
            new findResult().findByUser();
        }});
    

(document.querySelector("#getdata") as HTMLButtonElement).addEventListener("click" ,e =>
{   
    (document.getElementById("waterfall-exp") as HTMLInputElement).value = "";
    (document.getElementById("request-status") as HTMLSelectElement).selectedIndex = 0;               // assign , reject , all 
    (document.getElementById(domElement.search)  as HTMLInputElement).setAttribute("user" , "");
    (document.getElementById(domElement.devicesearch)  as HTMLInputElement).setAttribute(domElement.deviceSerial , "");
    new findResult().findByUser();
    (document.getElementById("pagination") as HTMLDivElement).setAttribute("page" , "1");    // set page to 1
});


document.addEventListener("click", function (e) {
    let id = (e.target as HTMLInputElement).id;
    if (id === "user"|| id === "admin" ||  id === "serialNumber" || id === "device") 
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
    new page().slectedPage(x);
});

(document.querySelector("#request-status") as HTMLSelectElement).addEventListener("change" ,e =>
{
    var requestStatus = (e.target as HTMLOptionElement).value;
    if (requestStatus ==  "Assigned" || requestStatus == "assigned")
        requestStatus = "assigned"
        if (requestStatus ==  "Rejected" || requestStatus ==  "reject")
        requestStatus = "reject"
    console.log(requestStatus);
    new UserRequestStatus().requestStatusResult(requestStatus);
    

});


console.log((document.getElementById("request-status") as HTMLSelectElement).value);
