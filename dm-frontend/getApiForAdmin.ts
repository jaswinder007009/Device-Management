import { BASEURL } from './globals';
import { DeviceListForAdmin } from "./deviceListForAdmin";

class GetApiForAdmin {
    getApi(URL:string) {
        fetch(
            URL
        )
            .then(Response => Response.json())
            .then(data => {
                console.log(data);
                document.getElementById("Request_data").innerHTML = "";
                for (let i = 0; i < data.length; i++) {
                    let res = new DeviceListForAdmin(data[i]);
                    res.getDeviceList();
                }
            })
            .catch(err => console.log(err));


    }
    getData() {
        const URL = BASEURL + "/dm/Device/page?limit1=15&offset1=0";
        this.getApi(URL);
    }
    searchByName() {
        var search = (document.getElementById("fixed-header-drawer-exp") as HTMLInputElement).value;
        const URL = BASEURL + "/dm/Device/" + search;
        this.getApi(URL);

    }
    sort(SortColumn, SortDirection: any) {

        const URL = BASEURL + "/dm/Device/sort?SortColumn=" + SortColumn + "&SortDirection=" + SortDirection;
        this.getApi(URL);
    }
    checkSortType(value: string): string {
        const type = (document.getElementById(value) as HTMLTableRowElement).getAttribute("class");
        // (document.getElementById(this.elements.thead) as HTMLTableRowElement).setAttribute("sort", value);
        if (type === "mdl-data-table__header--sorted-descending") {
            document.getElementById(value).setAttribute("class", "mdl-data-table__header--sorted-ascending");
            return "a";
        }
        else {
            document.getElementById(value).setAttribute("class", "mdl-data-table__header--sorted-descending");
            return "d";
        }
    }

    deleteDevice(device_id) {


        fetch(BASEURL + "/dm/Device/del/" + device_id, {
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

document.addEventListener("click", function (e) {
    const col = (e.target as HTMLElement).getAttribute('name');
    const temp = new GetApiForAdmin();
    var pos = temp.checkSortType(col);
    console.log(pos);
    temp.sort(col, pos);
});
document.querySelector('#fixed-header-drawer-exp').addEventListener('change', function (e) {

    console.log("test");
    const temp = new GetApiForAdmin();
    temp.searchByName();

});
const temp = new GetApiForAdmin();
temp.getData();

