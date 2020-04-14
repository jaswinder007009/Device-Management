import { HitApi } from "./HitApi";
import { HtmlElementsData } from "./HtmlElementsId";
import { BASEURL } from "./globals";
import { findResult } from "./search";
import { getStatus } from "./index";


export class Sort 
{    
    token:string;
    elements : HtmlElementsData;
    constructor(token: string)
    {
        this.token = token;
        this.elements = new HtmlElementsData();
    }
    sortBy(attributeId : string)
    {
        
        let  sortType = this.checkSortType(attributeId);
        let find = (document.getElementById( this.elements.search) as HTMLInputElement).value;
        this.setSortingApiCall(attributeId , find  , sortType);
        
    }
    checkSortType(value : string) : string
    {
        const type = document.getElementById(value).getAttribute("class");
        (document.getElementById(this.elements.thead) as HTMLTableRowElement).setAttribute("sort", value);
        if (type ===  this.elements.upArrow)
        {
         document.getElementById(value).setAttribute("class" ,  this.elements.downArrow);
         (document.getElementById(this.elements.thead) as HTMLTableRowElement).setAttribute("sortby", "DESC");
         return "DESC";
        }
        else{
         document.getElementById(value).setAttribute("class" ,  this.elements.upArrow);
         (document.getElementById(this.elements.thead) as HTMLTableRowElement).setAttribute("sortby", "ASC")
         return "ASC";
        }
         
    }

    setSortingApiCall(sortAttribute : string , find  : string , sortType : string)
    
    {
        const status = getStatus((document.getElementById("request-status") as HTMLSelectElement).value);
        const uri= new findResult(this.token).searchUser() +"&status="+status+"&sort="+sortAttribute+"&sort-type="+sortType;
        
        var populateSorting = new HitApi(this.token);
        
        populateSorting.HitGetApi(uri);
    }


    
}