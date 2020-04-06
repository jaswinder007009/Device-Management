import { localHostUrl } from "./LocalHost";
import { HtmlElementsData } from "./HtmlElementsId";
import { HitApi } from "./HitApi";
import { findResult } from "./search";

export class UserRequestStatus
{
    domElements : HtmlElementsData
    generateRequestData(requestStatus : string = "ALL")
    {   this.domElements = new HtmlElementsData();
        let userName  = (document.getElementById(new HtmlElementsData().search)  as HTMLInputElement).getAttribute(this.domElements.userName);
        var sortAttribute = (document.getElementById(this.domElements.thead) as HTMLTableRowElement).getAttribute(this.domElements.sortAttributr);       
        var sortType  =  (document.getElementById(this.domElements.thead) as HTMLTableRowElement).getAttribute(this.domElements.sortType);
        let uri = new findResult().searchUser() + "&sort="+sortAttribute+"&sort-type="+sortType+"&status="+requestStatus;
        return uri ;
    }

    requestStatusResult(status : string)
    {
        status = status.toLowerCase();
        let uri = this.generateRequestData(status);
        new HitApi().HitGetApi(uri);
    }
}