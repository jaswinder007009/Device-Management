import {PopulateData} from "./FillData"
import { page } from "./paging";
export class HitApi
{
    Data : any;
    token: string;

    constructor(token: string){
        this.token = token;
    }
    public async HitGetApi(uri : string)
    {
        (document.getElementById("loading") as HTMLDivElement).style.display = "flex";    // loading start 
        var res  : any
        try{
        res =  await fetch(uri, {
            headers: new Headers({"Authorization": `Bearer: ${this.token}`})
        });
        }
        catch(e)
        {
            console.log(e , "error while  hitting api");
        }
        console.log(res.status);
        this.Data  = await res.json();
        await new PopulateData().fillData(this.Data);
        this.geneartePage();
        (document.getElementById("loading") as HTMLDivElement).style.display = "none";    //  loading end
        return res;
    }

    public async getData()
    {



       // this.HitGetApi()

    }
    geneartePage()
    {
        let id = (document.getElementById("pagination") as HTMLDivElement).getAttribute("pageNum");
        if(parseInt(id)==1)
        {
           new page(this.token).setPages(this.Data["resultCount"]);
        }
    }
   
}