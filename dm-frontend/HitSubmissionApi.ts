export class Api
{
   async hitGetApi(url)
    {
        (document.getElementById("loading") as HTMLDivElement).style.display = "flex";    // loading start 
        let res = await fetch(url);
        let data = await res.json();
        console.log(data);
        (document.getElementById("loading") as HTMLDivElement).style.display = "none";    //  loading end
        return await data;
    }
}