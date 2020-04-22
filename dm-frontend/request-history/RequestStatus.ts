import { HtmlElementsData } from "./HtmlElementsId";
import { BASEURL } from "../globals";
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
    {
        let uri = new findResult(this.token).searchUser() + "&status="+requestStatus;
        return uri ;
    }

}