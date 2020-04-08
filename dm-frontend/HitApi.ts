import {PopulateData} from "./FillData"
import { page } from "./paging";
export class HitApi
{
    RequestDeviceData : any
    public async HitGetApi(uri : string)
    {
        (document.getElementById("loading") as HTMLDivElement).style.display = "flex";    // loading start 
        var res  : any
        try{
        res =  await fetch(uri);
        }
        catch(e)
        {
            console.log(e , "error while  hitting api");
        }
        console.log(res.status);
        this.RequestDeviceData  = await res.json();
        await new PopulateData().fillData(this.RequestDeviceData);
        this.geneartePage();
        (document.getElementById("loading") as HTMLDivElement).style.display = "none";    //  loading end
        return res;
    }

    geneartePage()
    {
        let id = (document.getElementById("pagination") as HTMLDivElement).getAttribute("pageNum");
        if(parseInt(id)==1)
        {
           new page().setPages(this.RequestDeviceData["resultCount"]);
        }
    }
   
}