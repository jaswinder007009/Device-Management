

export class RequestModel
{
    public userName : string = "" ;
    public email : string = "" ;
    public deviceId : number = 0;
    public serialNumber : string = "";
    public deviceType :string = "";
    public deviceName : string = "";
    public requestStatus : string = "" ;
    public specifications : string = "";
    public requestDate : Date|undefined =  undefined ;
    public AssignedAdmminName : string = "" ;
    public assignDate : Date|undefined =  undefined ;
    public assignDays : number = 0;
    public returnDate : Date|undefined =  undefined ; 
    public adminName  : string = "";
}