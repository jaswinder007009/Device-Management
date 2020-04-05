import { HitApi } from "./HitApi"
import { PopulateData } from "./FillData";
import { localHostUrl } from "./LocalHost";
import { HtmlElementsData } from "./HtmlElementsId";
export class findResult {
    data: any
    public findByUser(userName: string = "") 
    {
        let elements = new HtmlElementsData();
        (document.getElementById(elements.thead) as HTMLTableRowElement).setAttribute(elements.sortAttributr , "");       
        (document.getElementById(elements.thead) as HTMLTableRowElement).setAttribute(elements.sortType , "");
        var uri = new localHostUrl().uri+"?user-name=" + encodeURI(userName) + "";
        new HitApi().HitGetApi(uri);
    }

    public findBySerailNumber()
    {
        
    }
}

