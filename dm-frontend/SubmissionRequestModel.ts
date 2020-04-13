export class RequestSubmitModel
{
    returnRequestId : number 
    userId : number | undefined 
    deviceId : number
    userName : string
    deviceType : string | undefined
    deviceName : string | undefined 
    specification : String =""
    ReturnDate : Date

    bindData(value : any )
    {
      var data =   new RequestSubmitModel();
            data.returnRequestId = value.returnRequestId;
            data.userId = value.userId;
            data.deviceId =  value.deviceId;
            data.userName = this.concatName(value);
            data.deviceType = value.deviceType
            data.deviceName = value.deviceBrand +" "+ value.deviceModel;
            data.specification= this.concatSpecs(value.specs);
            data.ReturnDate = value.returnDate ;
            return data;
        }

    concatName(value : any )
    {
        let name = "";
        name += value.salutation + " " + value.firstName ;
        if(value.middle_name != "")
        name+= " " + value.middleName ;
        name +=  " " + value.lastName;
        return name;
    }    
    concatSpecs(data : any)
    {
        console.log("asdfghjklqwertyuiopzxcvbnm");
        var specifications = "";
        for(let [key , value] of Object.entries(data) )
        {   
            if(( value != ""))     // typeof(value) == string 
            {
             specifications += key +"=" + value +" ";   
            } 
        }
        return specifications;

    }
}