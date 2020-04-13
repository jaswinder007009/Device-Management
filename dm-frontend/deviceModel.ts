export class device
{
    id : number
    value : string

    constructor(data: any )
    {
        this.id = data[0];
        this.value = data[1];
    }
}