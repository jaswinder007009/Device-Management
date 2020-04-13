import { HitApi } from "./HitRequestApi";
import {populateDropDown } from "./populateDropDown";
import { RequestDeviceModel } from "./deviceRequestModel";

var device = [].map.call(document.querySelectorAll(".device") , e =>
{
    return e;

});
let uri = "http://localhost:5000";



 device.map(function(e : any)
    {
        const path = uri +'/api/dropdown/' + e.id;
        let data = GetData(path , e.id);
    });
    specificationDropdown();

    function  specificationDropdown() {
        fetch(
            uri + "/api/Dropdown/"
        )
            .then(Response => Response.json())
            .then(data => {

                (document.getElementById("Specification")as HTMLSelectElement).innerHTML = "";
                for (let i = 0; i < data.length; i++) {

                    (document.getElementById("Specification")as HTMLSelectElement).innerHTML += '<option value="' + data[i].specification_id + '">'
                        + "RAM: " + data[i].ram + " Storage: " + data[i].storage + " Screen Size: " + data[i].screen_size + " Connectivity: " + data[i].connectivity +
                        '</option>';

                }
            })
            .catch(err => console.log(err));

    }

async function GetData(uri : string ,column : string)
{
 let data = await new HitApi().HitGetApi(uri); 
        
 console.log(data);
 new populateDropDown().populateDevice(data , column);
 return data ;
}

document.querySelector("#request")?.addEventListener('click' , e =>
{
  console.log((document.getElementById("specification") as HTMLSelectElement).value);
});


function bindData()
{
    var body = new RequestDeviceModel();
    body.userId = 61;
    body.deviceType = device[0].value
    body.deviceBrand = device[1].value;
    body.deviceModel = device[2].value;
  //body.specs = document.getElementById()

}