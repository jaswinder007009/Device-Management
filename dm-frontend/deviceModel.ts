export class device
{
    id : number
    value : string

    constructor(data: any )
    {
        // console.log(data[0]);
        this.id = data.id;
        this.value = data.name;
    }
}