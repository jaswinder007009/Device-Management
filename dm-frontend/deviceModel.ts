export class device
{
    id : number
    value : string

    constructor(data: any )
    {
        this.id = data.id;
        this.value = data.name;
    }
}