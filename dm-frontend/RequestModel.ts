export class Requests
{
    deviceModel:string ="";
    deviceType:string = "";
    deviceBrand:string ="";
    specs : Specification;
    constructor()
    {
        this.specs = new Specification();
    }
}
export class Specification
{
    ram: string ="";
    storage: string ="";
    screenSize: string ="";
    connectivity: string ="";
        
}
