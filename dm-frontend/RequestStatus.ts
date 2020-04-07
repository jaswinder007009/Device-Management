  
import { HitApi } from "./HitApi"
import { HtmlElementsData } from "./HtmlElementsId";
import { BASEURL } from "./globals";
import { findResult } from "./search";



export class UserRequestStatus
{
    domElements : HtmlElementsData
    constructor()
    {
        this.domElements = new HtmlElementsData();
    }

    generateRequestData(requestStatus : string = "ALL")
    {   let userName  = (document.getElementById(new HtmlElementsData().search)  as HTMLInputElement).getAttribute(this.domElements.userName);
        var sortAttribute = (document.getElementById(this.domElements.thead) as HTMLTableRowElement).getAttribute(this.domElements.sortAttributr);       
        var sortType  =  (document.getElementById(this.domElements.thead) as HTMLTableRowElement).getAttribute(this.domElements.sortType);
        let uri = BASEURL + "&sort="+sortAttribute+"&sort-type="+sortType+"&status="+requestStatus;
        return uri ;
    }

    requestStatusResult(status : string)
    {
        status = status.toLowerCase();
        let uri = this.generateRequestData(status);
        new HitApi().HitGetApi(uri);
    }
}