import { GetUserApi } from "./getApi";

export class Sort 
{    
   
    sortBy(attributeId : string)
    {
        
        let  sortType = this.checkSortType(attributeId);
        let find = (document.getElementById("fixed-header-drawer-exp") as HTMLInputElement).value;
        return this.setSortingApiCall(attributeId , find  , sortType);
        
    }
    checkSortType(value : string) : string
    {
        const type = (document.getElementById(value) as HTMLTableRowElement).getAttribute("class");
       
        if (type ==="mdl-data-table__header--sorted-descending")
        {
         document.getElementById(value).setAttribute("class" ,  "mdl-data-table__header--sorted-ascending");
      
         return "-1";
        }
        else{
         document.getElementById(value).setAttribute("class" ,  "mdl-data-table__header--sorted-descending");
      
         return "1";
        }
         
    }

    setSortingApiCall(sortAttribute : string , find  : string , sortType : string,)
    {
        const uri=  "https://localhost:5002/api/user?searchby="+encodeURI(find)+"&sortby="+sortAttribute+"&direction="+sortType;
      
        return new GetUserApi().getSort(uri);



    }
}