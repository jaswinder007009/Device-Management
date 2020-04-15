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
export class PartialUserModel {
    salutation: string = ""
    firstName: string = ""
    middleName: string = ""
    lastName: string = ""
    departmentName: string = ""
    designationName: string = ""
    email: string = ""
    dob: string = ""
    gender: string = ""
    doj: string = ""

}
