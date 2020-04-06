import { HitApi } from "./HitApi";
import { HtmlElementsData } from "./HtmlElementsId";
import { localHostUrl } from "./LocalHost";
import { findResult } from "./search";


export class Sort 
{    
    elements : HtmlElementsData
    constructor()
    {
        this.elements = new HtmlElementsData();
    }
    sortBy(attributeId : string)
    {
        
        let  sortType = this.checkSortType(attributeId);
      //  let userName = (document.getElementById(new HtmlElementsData().search)  as HTMLInputElement).getAttribute(this.elements.userName);
        this.setSortingApiCall(attributeId , sortType);
        
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

    setSortingApiCall(sortAttribute : string  , sortType : string)
    {
        const uri= new findResult().searchUser() + "&sort="+sortAttribute+"&sort-type="+sortType;
        
        var populateSorting = new HitApi();
        
        populateSorting.HitGetApi(uri);
    }



}