import {PopulateData} from "./FillData"
import { GeneratePaging } from "./pagination";
export class HitApi
{
    RequestDeviceData : any
    public async HitGetApi(uri)
    {
        try{
        var res =  await fetch(uri); 

        }
        catch(e)
        {
            console.log(e , "error while  hitting api");
        }
        console.log(res.status);
        this.RequestDeviceData  = await res.json();
        await new PopulateData().fillData(this.RequestDeviceData);
        return res;
    }

    geneartePage()
    {
        let id = (document.getElementById("pagination") as HTMLDivElement).getAttribute("pageNum");
        if(parseInt(id)==1)
        {
           // new GeneratePaging().addPageElement();
        }
    }
   
}