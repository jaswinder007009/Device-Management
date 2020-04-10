import { BASEURL } from './globals';
import { DeviceListForAdmin } from "./deviceListForAdmin";
import { Sort } from './user-profile/SortingUser';

class GetApiForAdmin {
    getApi(URL:string) {
        fetch(
            URL
        )
            .then(Response => Response.json())
            .then(data => {
                console.log(data);
                (document.getElementById("Request_data") as HTMLTableElement).innerHTML = "";
                for (let element in data) {
                    let res = new DeviceListForAdmin(data[element]);
                    res.getDeviceList();
                }
            })
            .catch(err => console.log(err));


    }
    getData() {
        const URL = BASEURL + "/api/Device/page?limit1=15&offset1=0";
        this.getApi(URL);
    }
    searchByName() {
        var serial_number = (document.getElementById("search_serial_number") as HTMLInputElement).value;
        var device_name = (document.getElementById("fixed-header-drawer-exp") as HTMLInputElement).value;
        var status = (document.getElementById("status") as HTMLInputElement).value;
        const URL1 = BASEURL + "/api/Device/search?device_name=" + device_name ;
        if(serial_number){
            const URL= URL1+"&serial_number=" + serial_number;
            this.getApi(URL);
        }
        else if(status)
        {
            const URL= URL1+"&status_name=" + status;
            this.getApi(URL);
        }
        else if(serial_number && status)
        {
            const URL= URL1+"&serial_number=" + serial_number + "&status_name=" + status;
            this.getApi(URL);

        }
        else{
        this.getApi(URL1);
        }
        //(document.getElementById("fixed-header-drawer-exp") as HTMLInputElement).value="";
        //(document.getElementById("search_serial_number") as HTMLInputElement).value="";
    }
    sort(SortColumn:string, SortDirection: any) {

        const URL = BASEURL + "/api/Device/sort?SortColumn=" + SortColumn + "&SortDirection=" + SortDirection;
        this.getApi(URL);
    }
    
    deleteDevice(device_id:number) {


        fetch(BASEURL + "/api/Device/del/" + device_id, {
            method: "DELETE"
        });

    }
    
}

document.addEventListener("click", function (e) {
    if ((e.target as HTMLButtonElement).className == "delete-button") {
        if (confirm("Are you sure you want to delete this device?")) {
            const temp = new GetApiForAdmin();
            const device_id: any = (e.target as HTMLButtonElement).getAttribute('value');
            console.log("device_id" + device_id);
            temp.deleteDevice(device_id);
            console.log("device deleted");
            window.location.reload();
            // temp.getData();

        } else {
            console.log("fail deleted");
        }
    }
});
document.addEventListener("click", function (e) {
    if ((e.target as HTMLButtonElement).className == "edit-button") {
        const device_id: any = (e.target as HTMLButtonElement).getAttribute('value');
        console.log(device_id);
        console.log("edit button");
        
        window.location.href = "AddDevice.html?device_id=" + device_id;

    }
});
(document.querySelector('#Request_data1') as HTMLTableElement).addEventListener("click", function (e) {
    const col = (e.target as HTMLElement).getAttribute('name');
    let id = (e.target as HTMLTableHeaderCellElement);
    let sorts = new Sort();
    let direction =sorts.checkSortType(id);
    temp.sort(col, direction);
});
(document.querySelector('#fixed-header-drawer-exp')as HTMLInputElement).addEventListener('change', function (e) {

    temp.searchByName();

});
(document.querySelector('#search_serial_number')as HTMLInputElement).addEventListener('change', function (e) {

    temp.searchByName();

});
(document.querySelector('#status')as HTMLInputElement).addEventListener('click', function (e) {
    if((document.getElementById("status")as HTMLInputElement).value=='all')
    {
        temp.getData();
    }
    else{
    temp.searchByName();
    }
});

(document.querySelector('.devices')as HTMLDivElement).addEventListener('click', function (e) {

    temp.getData();

});
const temp = new GetApiForAdmin();
temp.getData();

