import { PopulateData } from "./FillData";
import { HitApi } from "./HitApi";
import { findResult } from "./search"
import { Sort } from "./sorting";
import { HtmlElementsData } from "./HtmlElementsId";

new findResult().find();

document.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        let id = (e.target as HTMLInputElement).id;
        new findResult().find((document.getElementById(id) as HTMLInputElement).value);
    }});


(document.querySelector("#getdata") as HTMLButtonElement).addEventListener("click" ,e =>
{   
    (document.getElementById("waterfall-exp") as HTMLInputElement).value = "";
    new findResult().find();
});


document.addEventListener("click", function (e) {
    let id = (e.target as HTMLInputElement).id;
    if (id === "user" || id === "returndate" || id === "admin" || id === "assigndate" || id === "status"
             || id === "type" || id === "serialNumber" || id === "device") 
             {
        new Sort().sortBy(id);
    }});


    (document.querySelector("#pagination") as HTMLButtonElement).addEventListener("click" ,e =>
{   
    var x  = (e.target as HTMLButtonElement).id;
   (document.getElementById("pagination") as HTMLDivElement).setAttribute("page" , x);
    new findResult().find();
});

