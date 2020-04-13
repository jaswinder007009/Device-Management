 import { Api } from "./HitSubmissionApi";
import { RequestDeviceModel } from "./deviceRequestModel";
import { RequestSubmitModel } from "./SubmissionRequestModel";
import { populateData } from "./genrateSubmissionRequest";
import { RequestModel } from "./RequetsDatamodel";
import { Sort } from "./user-profile/SortingUser";


let uri = "http://localhost:5000/api/ReturnRequest";



(document.querySelector("#fixed-header-drawer-exp")  as HTMLInputElement).addEventListener("keypress" , event =>
{
    if(event.key == "Enter")
    {
        
        let id = (event.target as HTMLInputElement).id;
        let search = (document.getElementById(id) as HTMLInputElement).value;
        (document.getElementById(id) as HTMLInputElement).setAttribute("data-device-name" , search);
        let url = uri + "" + getSearchUrl();
        console.log(url);
        getData(url);
    }
});

function getSearchUrl()
{
    let url;
    let search = (document.getElementById("fixed-header-drawer-exp") as HTMLInputElement).getAttribute("data-device-name")
    if (search != "")
    return "?search="+search;
    else 
    return "?";
}


document.querySelector("#tableHead").addEventListener('click' , event =>
{
    let id = (event.target as HTMLInputElement).dataset.id;
    if(id == "name" || id == "type" || id == "device" )
    {   
        let sortAttributr = (event.target as HTMLTableHeaderCellElement).dataset.id;
        let sort = new Sort();
       var sortType =  sort.checkSortType((event.target as HTMLTableHeaderCellElement));
       let url = uri + getSearchUrl() +"&sort="+sortAttributr +"&direction="+ sortType ;
        getData(url);
    }

});


function getAll()
{
    let url =  uri;
    (document.getElementById("fixed-header-drawer-exp") as HTMLInputElement).setAttribute("data-device-name" , "");
    getData(url);
}

async function getData(url)
{
    var elementId = "submission_request";
    var generateData = new populateData(elementId);
    
    var data = await new Api().hitGetApi(url);
    data.map(value=>
        {
            console.log("sdfghjk")
         var data = new RequestSubmitModel().bindData(value);
         generateData.generateField(data , elementId);
        })
    return null;
}

document.addEventListener("click", function (event) {
    if ((event.target as HTMLButtonElement).className == "accept") {
        
        var returnId = (event.target as HTMLButtonElement).dataset.returnId
        
        console.log("abc");

        let uri = "http://localhost:5000/api/RequestHistory/"+ returnId +"/accept";
        new Api().hitGetApi(uri);
        
}
});



document.querySelector("#getData").addEventListener("click" , event=>
    {
        getAll();
    });
getAll();

