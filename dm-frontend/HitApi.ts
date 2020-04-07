import {PopulateData} from "./FillData"
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
        await new PopulateData().fillData(this.RequestDeviceData)
        return res;
    }

    populateData()
    {
        let id = (document.getElementById("pagination") as HTMLDivElement).getAttribute("page")
        // if(parseInt(id)==1)
        // {
        //     new this.populateData().
        // }
    }
   
}