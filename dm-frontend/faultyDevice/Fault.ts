
import { BASEURL, Token } from "../globals";
import { HitApi } from "../Device-Request/HitRequestApi";
import { FaultyDeviceModel } from "./FaultyDeviceModel";

export class FalultyDevice
{
    uri : string = BASEURL
    tokenkey : string
    
    constructor()
    {
        var obj =  Token.getInstance();
        this.tokenkey = obj.tokenKey;
        
    }
    getAllData(params :string = "")
    {
        (document.getElementById("loading") as HTMLDivElement).style.display = "flex";
         let url = this.uri + "/api/FaultyDevice" + params; 
        new HitApi(this.tokenkey).HitGetApi(url).then(data=>
            {
                this.clear();
                data.map(value =>
                    {
                        this.populateData(new FaultyDeviceModel(value));
                    })
            });
           (document.getElementById("loading") as HTMLDivElement).style.display = "none";
    }

    getSearchData(id:any)
    {
       
      var find = (document.getElementById(id) as HTMLInputElement).value
      if (find == "")
      {
        return ""
      }
      document.getElementById(id).setAttribute("data-find" , find)
      return find; 
    }

    populateData(data : any )
    {
        var field =`
        <tr data-user-id=${data.userId} data-device-id =${data.deviceId} data-complaint-id=${data.complaintId}>
        <td>${data.userName}</td>
        <td>${data.deviceType}</td>
        <td>${data.deviceName}</td>
        <td>${data.serialNumber}</td>
        <td>${data.status}</td>
        <td>${data.complaint}</td>
        <td>${data.complaitDate}</td>
        `;
        var buttons
          // if(data.status=="Unresolved" )
          {         
             buttons= ` <td>
           <button class="faulty-device" data-userid = ${data.userId} data-value=${data.deviceId}>Faulty </button>
            <button class="fault_resolve" data-userid = ${data.userId} data-value=${data.deviceId}>Reject </button>
        </td>
    </tr> `;
     
          }
    document.getElementById("Request_data").innerHTML +=  field + ""+ buttons;
    }
    clear()
    {
        document.getElementById("Request_data").innerHTML = "";
    }

}