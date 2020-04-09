import { HitApi } from "./HitApi"
import { PopulateData } from "./FillData";
import { BASEURL } from "./globals";
import { HtmlElementsData } from "./HtmlElementsId";
export class findResult {
    data: any
    elements : HtmlElementsData
    constructor()
    {
        this.elements = new HtmlElementsData();
    }
    public findByUser() 
    {
        var uri = this.searchUser();
        new HitApi().HitGetApi(uri);
    }

    public searchUser() {
        let userName=(document.getElementById(this.elements.search) as HTMLInputElement).getAttribute(this.elements.userName);
        let serialNumber = (document.getElementById(this.elements.devicesearch) as HTMLInputElement).getAttribute(this.elements.deviceSerial);
        (document.getElementById(this.elements.thead) as HTMLTableRowElement).setAttribute(this.elements.sortAttributr, "");
        (document.getElementById(this.elements.thead) as HTMLTableRowElement).setAttribute(this.elements.sortType, "");
        var uri = BASEURL + "/sorting?user-name=" + encodeURI(userName) + "&serial-number=" + encodeURI(serialNumber) + "";;
        return uri;
    }

}

