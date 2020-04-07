import { HitApi } from "./HitApi";
import { HtmlElementsData } from "./HtmlElementsId";
import { BASEURL } from "./globals";


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
        const uri= BASEURL+"/sorting?find="+encodeURI(find)+"&sort="+sortAttribute+"&sort-type="+sortType;
        
        var populateSorting = new HitApi();
        
        populateSorting.HitGetApi(uri);
    }


    
}