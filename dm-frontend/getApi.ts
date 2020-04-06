import { BASEURL } from './globals';
import { UserModel } from "./UserModel";
import { DeviceListForUsers } from "./deviceListForUsers";

export class GetApi {
	getApi(URL:string) {
		fetch(
			URL
		)
			.then(Response => Response.json())
			.then(data => {
				console.log(data);
				document.getElementById("Request_data").innerHTML = "";
				for (let i = 0; i < data.length; i++) {
					let res = new DeviceListForUsers(data[i]);
					res.getDeviceList();
				}
			})
			.catch(err => console.log(err));


	}
	getData() {
		const URL = BASEURL + "/api/Device/page?limit1=6&offset1=0";
		this.getApi(URL);
	}
	searchByName() {
		var search = (document.getElementById("fixed-header-drawer-exp") as HTMLInputElement).value;
		const URL = BASEURL + "/api/Device/" + search;
		this.getApi(URL);
	}
	sort(SortColumn,SortDirection: any) {
		const URL = BASEURL + "/api/Device/sort?SortColumn="+SortColumn + "&SortDirection=" + SortDirection;
		this.getApi(URL);
	}
	checkSortType(value: string): string {
        const type = (document.getElementById(value) as HTMLTableRowElement).getAttribute("class");
        if (type === "mdl-data-table__header--sorted-descending") {
            document.getElementById(value).setAttribute("class", "mdl-data-table__header--sorted-ascending");
            return "a";
        }
        else {
            document.getElementById(value).setAttribute("class", "mdl-data-table__header--sorted-descending");
            return "d";
        }
    }

}
document.addEventListener("click", function (e) {

		const col = (e.target as HTMLElement).getAttribute('name');
		const temp = new GetApi();
		var pos = temp.checkSortType(col);
		temp.sort(col,pos);

});
document.querySelector('#fixed-header-drawer-exp').addEventListener('change', function (e) {

	console.log("test");
	const temp = new GetApi();
	temp.searchByName();
});

window.addEventListener(
	"load",
	function () {

		const temp = new GetApi();
		temp.getData();

	});