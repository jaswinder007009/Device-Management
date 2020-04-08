import { GetUserApi } from "./getUserApi";
import { BASEURL } from "../globals";
export class Sort 
{    
   
    sortBy(attributeId : HTMLTableHeaderCellElement)
    {
        
        let  sortType = this.checkSortType(attributeId);
        let find = (document.getElementById("fixed-header-drawer-exp") as HTMLInputElement).value;
        return this.setSortingApiCall(attributeId.dataset.id , find  , sortType);
        
    }
    checkSortType(value : HTMLTableHeaderCellElement) : string
    
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

    setSortingApiCall(sortAttribute : string , find  : string , sortType : string,)
    {
        const uri=  BASEURL + "/api/user?search="+encodeURI(find)+"&sortby="+sortAttribute+"&direction="+sortType;
      
        return new GetUserApi().getSort(uri);

    }
    getSortingUrl(attributeId: HTMLTableHeaderCellElement)
    { 
        
            
            let  sortType = this.checkSortType(attributeId);
            
            return "&sortby="+attributeId.dataset.id+"&direction="+sortType;
            
        

    }
}