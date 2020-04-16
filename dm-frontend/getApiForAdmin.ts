import { BASEURL, navigationBarsss } from "./globals";
import { DeviceListForAdmin } from "./deviceListForAdmin";
import { Sort } from "./user-profile/SortingUser";
import { amIUser } from "./globals";
import { Requests } from "./RequestModel";
import { openForm } from "./utilities";

(async function() {
	const token = JSON.parse(sessionStorage.getItem("user_info"))["token"];
	const role = (await amIUser(token)) == true ? 0 : 1;
	class Assign_device {
		device_id: number = 0;
		return_date: string = "";
		first_name: string = "";
		middle_name: string = "";
		last_name: string = "";
		
	}

	class GetApiForAdmin {
		token: string="";
		constructor(token:string){
			this.token=token;
		}
		getApi(URL: string) {
			fetch(URL,{
                headers: new Headers({"Authorization": `Bearer ${token}`})
            })
				.then(Response => Response.json())
				.then(data => {
					console.log(data);
					(document.getElementById(
						"Request_data"
					) as HTMLTableElement).innerHTML = "";
					for (let element in data) {
						let res = new DeviceListForAdmin(data[element],token);
						res.getDeviceList(role);
					}
				})
				.catch(err => console.log(err));
		}
		getData() {
			const URL = BASEURL + "/api/Device/page?limit1=15&offset1=0";
			this.getApi(URL);
		}
		searchByName() {
			var serial_number = (document.getElementById(
				"search_serial_number"
			) as HTMLInputElement).value;
			var device_name = (document.getElementById(
				"fixed-header-drawer-exp"
			) as HTMLInputElement).value;
			var status = (document.getElementById("status") as HTMLInputElement)
				.value;
			const URL1 = BASEURL + "/api/Device/search?device_name=" + device_name;
			if (serial_number) {
				const URL = URL1 + "&serial_number=" + serial_number;
				this.getApi(URL);
			} else if (status) {
				const URL = URL1 + "&status_name=" + status;
				this.getApi(URL);
			} else if (serial_number && status) {
				const URL =
					URL1 + "&serial_number=" + serial_number + "&status_name=" + status;
				this.getApi(URL);
			} else {
				this.getApi(URL1);
			}
			//(document.getElementById("fixed-header-drawer-exp") as HTMLInputElement).value="";
			//(document.getElementById("search_serial_number") as HTMLInputElement).value="";
		}
		sort(SortColumn: string, SortDirection: any) {
			const URL =
				BASEURL +
				"/api/Device/sort?SortColumn=" +
				SortColumn +
				"&SortDirection=" +
				SortDirection;
			this.getApi(URL);
		}

		deleteDevice(device_id: number) {
			fetch(BASEURL + "/api/Device/del/" + device_id, {
                method: "DELETE",
                headers: new Headers({"Authorization": `Bearer ${token}`})
			});
		}

		postNotification(data: Requests) {
			let data1 = JSON.stringify(data);
			fetch(BASEURL + "/api/Notification", {
				method: "POST",
                headers:new Headers([["Content-Type","application/json"],["Authorization", `Bearer ${this.token}`]]),
				body: data1
			}).catch(Error => console.log(Error));
			alert("Notification sent");
		}
		assign_device(data: Assign_device) {
			let data1 = JSON.stringify(data);
			console.log(data1);
			fetch(BASEURL + "/api/device/assign", {
				method: "POST",
				headers:new Headers([["Content-Type","application/json"],["Authorization", `Bearer ${this.token}`]]),
				body: data1
			}).catch(Error => console.log(Error));
		}
		openForm1(popup) {
			document.getElementById(popup).style.display = "block";
		}
		closeForm1(popup) {
			document.getElementById(popup).style.display = "none";
		}
	}

	document.addEventListener("click", function(e) {
		if ((e.target as HTMLButtonElement).className == "edit-button") {
			const device_id: any = (e.target as HTMLButtonElement).getAttribute(
				"value"
			);
			console.log(device_id);
			console.log("edit button");

			window.location.href = "AddDevice.html?device_id=" + device_id;
		}
		if ((e.target as HTMLButtonElement).className == "delete-button") {
			console.log("delete");
			if (confirm("Are you sure you want to delete this device?")) {
				const temp = new GetApiForAdmin(token);
				const device_id: any = (e.target as HTMLButtonElement).getAttribute(
					"value"
				);
				console.log("device_id" + device_id);
				temp.deleteDevice(device_id);
				console.log("device deleted");
	           window.location.reload();
				temp.getData();
			} else {
				console.log("fail deleted");
			}
		}
		if ((e.target as HTMLButtonElement).className == "notify-button") {
			console.log("notify");
			let request = new Requests();

			request.deviceModel = (e.target as HTMLButtonElement).dataset.devicemodel;
			request.deviceBrand = (e.target as HTMLButtonElement).dataset.devicebrand;
			request.deviceType = (e.target as HTMLButtonElement).dataset.devicetype;
			request.specs.ram = (e.target as HTMLButtonElement).dataset.ram + " GB";
			request.specs.connectivity = (e.target as HTMLButtonElement).dataset.connectivity;
			request.specs.screenSize = (e.target as HTMLButtonElement).dataset.screensize;
			request.specs.storage =
				(e.target as HTMLButtonElement).dataset.storage + " GB";
			console.log(request);
			temp.postNotification(request);
		}
		if ((e.target as HTMLButtonElement).className == "assign-button") {
			console.log("notify");
			temp.openForm1("popupForm2");
			(document.getElementById(
				"device_id"
			) as HTMLInputElement).value = (e.target as HTMLButtonElement).dataset.id;
			document.getElementById(
				"device_id"
			).innerHTML = (e.target as HTMLButtonElement).dataset.id;
		}
		if ((e.target as HTMLButtonElement).className == "cancel-button") {
			temp.closeForm1("popupForm2");
		}
		if ((e.target as HTMLButtonElement).className == "assigndevice-btn") {
			e.preventDefault();
			console.log("test");
			let assign = new Assign_device();
			assign.device_id = +(document.getElementById(
				"device_id"
			) as HTMLInputElement).value;
			assign.return_date = (document.getElementById(
				"return_date"
			) as HTMLInputElement).value;
			assign.first_name = (document.getElementById(
				"first_name"
			) as HTMLInputElement).value;
			assign.middle_name = (document.getElementById(
				"middle_name"
			) as HTMLInputElement).value;
			assign.last_name = (document.getElementById(
				"last_name"
			) as HTMLInputElement).value;
			temp.assign_device(assign);
			console.log("assign");
			temp.closeForm1("popupForm2");
		}
	});
	(document.querySelector("#tablecol") as HTMLTableElement).addEventListener(
		"click",
		function(e) {
			const col = (e.target as HTMLElement).getAttribute("name");
			let id = e.target as HTMLTableHeaderCellElement;
			let sorts = new Sort(token);
			let direction = sorts.checkSortType(id);
			temp.sort(col, direction);
		}
	);
	(document.querySelector(
		"#fixed-header-drawer-exp"
	) as HTMLInputElement).addEventListener("change", function(e) {
		temp.searchByName();
	});
	(document.querySelector(
		"#search_serial_number"
	) as HTMLInputElement).addEventListener("change", function(e) {
		temp.searchByName();
	});
	(document.querySelector("#status") as HTMLInputElement).addEventListener(
		"click",
		function(e) {
			if (
				(document.getElementById("status") as HTMLInputElement).value == "all"
			) {
				temp.getData();
			} else {
				temp.searchByName();
			}
		}
	);

	(document.querySelector(".devices") as HTMLDivElement).addEventListener(
		"click",
		function(e) {
			temp.getData();
		}
	);
	const temp = new GetApiForAdmin(token);
	temp.getData();
	if(role ==0)
	{
		var roles ="User";
	}
	else 
	roles = "Admin";
	navigationBarsss(roles,"navigations");
})();
