  
import { HitApi } from "./HitApi"
import { HtmlElementsData } from "./HtmlElementsId";
import { BASEURL } from "./globals";
import { findResult } from "./search";



export class UserRequestStatus
{
    domElements : HtmlElementsData
    token: string
    constructor(token: string)
    {
        this.token = token;
        this.domElements = new HtmlElementsData();
    }

    generateRequestData(requestStatus : string)
    {   let userName  = (document.getElementById(new HtmlElementsData().search)  as HTMLInputElement).getAttribute(this.domElements.userName);
        var sortAttribute = (document.getElementById(this.domElements.thead) as HTMLTableRowElement).getAttribute(this.domElements.sortAttributr);       
        var sortType  =  (document.getElementById(this.domElements.thead) as HTMLTableRowElement).getAttribute(this.domElements.sortType);
        let uri = BASEURL + "/sorting?status="+requestStatus;
        return uri ;
    }

    requestStatusResult(status : string)
    {
        status = status.toLowerCase();
        let uri = this.generateRequestData(status);
        new HitApi(this.token).HitGetApi(uri);
    }
}