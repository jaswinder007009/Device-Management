import { BASEURL, Token, navigationBarsss } from "../globals";
import { HitApi } from "../Device-Request/HitRequestApi";
import { FaultyDeviceModel } from "./FaultyDeviceModel";
import { FalultyDevice } from "./Fault";
import { Sort } from "../user-profile/SortingUser";


let token = Token.getInstance();



navigationBarsss("Admin" , "navigate");

new FalultyDevice().getAllData();

(document.querySelector("#waterfall-exp") as HTMLInputElement).addEventListener("keypress", function (event) {
  if (event.key == "Enter") {
    var data = (document.getElementById("waterfall-exp") as HTMLInputElement).value;
    document.getElementById("waterfall-exp").setAttribute("data-find" , data);
    document.getElementById("waterfall-exp").setAttribute("data-find" , (document.getElementById("serial-number") as HTMLInputElement).value);
    new FalultyDevice().getAllData( getSearch());
   
  }
});


(document.querySelector("#tableHead") as HTMLTableHeaderCellElement).addEventListener("click", function (e) {
  let id = (e.target as HTMLInputElement).id;
  if (id === "user"|| id === "date" ||  id === "serialnumber" || id === "device") 
          {
            var element = (document.getElementById(id) as HTMLTableHeaderCellElement);
      
            var direction =  "&direction=" + new Sort(token.tokenKey).checkSortType(element);;
            var attribute = "&sort=" + id;
            new FalultyDevice().getAllData( getSearch() + attribute + direction);
     
  }});




(document.querySelector("#getdata") as HTMLInputElement).addEventListener("click", function (event) {

  (document.getElementById("waterfall-exp") as HTMLInputElement).value = "";
  (document.getElementById("serial-number") as HTMLInputElement).value ="";
  document.getElementById("waterfall-exp").setAttribute("data-find" , "");
  document.getElementById("serial-number").setAttribute("data-find" , "");
  new FalultyDevice().getAllData();

});

(document.querySelector("#serial-number") as HTMLInputElement).addEventListener("keypress", function (event) {
  if (event.key == "Enter") {
    var data = (document.getElementById("serial-number") as HTMLInputElement).value;
    document.getElementById("serial-number").setAttribute("data-find" , data);
    document.getElementById("serial-number").setAttribute("data-find" , (document.getElementById("waterfall-exp") as HTMLInputElement).value);
    new FalultyDevice().getAllData( getSearch());
  }
});




function getSearch() {
  let url = "";
  var obj = new FalultyDevice();
  url = "?search=" + obj.getSearchData("waterfall-exp") + "&serial-number=" +  obj.getSearchData("serial-number");
  obj.getSearchData("serial-number");
  
  return  url;
  
}





function checkSortType(value : HTMLTableHeaderCellElement) : string
{
   
    const type = value.className;
   
    if (type ==="mdl-data-table__header--sorted-descending")
    {
       value.setAttribute("class" ,  "mdl-data-table__header--sorted-ascending");
     return "asc";
    }
    else{
       value.setAttribute("class" ,  "mdl-data-table__header--sorted-descending");
  
     return "desc";
    }
}
