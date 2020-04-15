export class HitApi
{
   public async  HitGetApi(uri : string)
    {
        let  res;
        try 
        {
            res = await fetch(uri);
            console.log(res.status);
        }
        catch
        {
            console.log("error while hittiing api")
        }
        const  data = await res?.json();
        
        return await data;
    }

    public async HitPostApi(uri : string , data : any )
    {
       return fetch(uri , {
            method : "post",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data)
        })
            
    }


}