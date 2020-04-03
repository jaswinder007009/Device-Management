import { HitApi } from "./HitApi"
import { PopulateData } from "./FillData";
import { localHostUrl } from "./LocalHost";
import { HtmlElementsData } from "./HtmlElementsId";
export class findResult {
    data: any

    public find(find: string = "") {
        let elements = new HtmlElementsData();
        (document.getElementById(elements.thead) as HTMLTableRowElement).setAttribute(elements.sortAttributr , "");       
        (document.getElementById(elements.thead) as HTMLTableRowElement).setAttribute(elements.sortType , "");
        var uri = new localHostUrl().uri+"?find=" + encodeURI(find) + "";
        new HitApi().HitGetApi(uri);

    }
}

