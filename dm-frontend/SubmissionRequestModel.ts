import * as util from "./utilities";
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
            data.userName = util.concatName(value);
            data.deviceType = value.deviceType
            data.deviceName = value.deviceBrand +" "+ value.deviceModel;
            data.specification= util.concatSpecs(value.specs);
            data.ReturnDate = value.returnDate ;
            return data;
    }

}