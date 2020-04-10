export class Api
{
   async hitGetApi(url)
    {
        let res = await fetch(url);
        let data = await res.json();
        console.log(data);
        return await data;
    }
}