import { HitApi } from "./HitApi";
import { HtmlElementsData } from "./HtmlElementsId";
import { BASEURL } from "./globals";
import { findResult } from "./search";
import { getStatus } from "./index";
import { Sort } from "./user-profile/SortingUser";


export class Sorting
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
        let  sortType = new Sort(this.token).checkSortType((document.getElementById(attributeId) as HTMLTableHeaderCellElement));
        let find = (document.getElementById( this.elements.search) as HTMLInputElement).value;
        this.setSortingApiCall(attributeId , find  , sortType);
    }
   
    setSortingApiCall(sortAttribute : string , find  : string , sortType : string)
    
    {
        const status = getStatus((document.getElementById("request-status") as HTMLSelectElement).value);
        const uri= new findResult(this.token).searchUser() +"&status="+status+"&sort="+sortAttribute+"&sort-type="+sortType;
        var populateSorting = new HitApi(this.token);
        populateSorting.HitGetApi(uri);
    }
   
}