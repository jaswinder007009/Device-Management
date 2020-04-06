import { BASEURL } from "../globals";
class abc {
	id: Number = 0;
	firstName: string = "";
	lastName: string = "";
	url: string = "";

	bodyData: any;

	data: any;
	size: any;

	headerTag = document.getElementById("output") as HTMLInputElement;
	headerTag1 = document.getElementById("perm") as HTMLInputElement;

	async getAllPermission() {
		this.url = BASEURL + "/api/device/permission";
		let data = await this.getApiCall(this.url);
		this.data = await data;
		console.log(data);
		this.size = data.length;
		this.dynamicGenerate();
		return data;
	}

	async getApiCall(URL: any) {
		let response = await fetch(URL);
		let data = await response.json();
		//  console.log(data);
		return await data;
	}

	get_delete_alert(id: number) {
		alert("permissionId" + id + "deleted");
	}

	async DeletePermissionById(id1: number) {
		let x = id1;
		let uri = BASEURL + "/api/device/permission/" + x;
		console.log(uri);
		let response = await fetch(uri, {
			method: "DELETE"
		});
		console.log(this.data);
		this.get_delete_alert(x);
		this.getAllPermission();
	}

	dynamicGenerate() {
		let loop = 0;
		this.headerTag.innerHTML = "";
		this.headerTag1.innerHTML = "";
		for (loop = 0; loop < this.data.length; loop++) {
			this.headerTag1.innerHTML += `


            <tr style="background-color:#FADA5E;">
            <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:30%;">
            <strong id="id${loop}">Permission ID := ${this.data[loop]["id"]}</strong>
            </td>

            <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:30%;">
            <strong id="permissionName${loop}">Permission Name := ${this.data[loop]["permissionName"]}</strong>
            </td>
           
            <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:30%;">
            <button id="id${loop}"  onclick="ab.DeletePermissionById(${this.data[loop]["id"]})">DELETE</button>
            </td>        
            </tr>
           `;
		}
	}
}
var ab = new abc();

class AddPermission {
	PermissionName: String;
	data: any;
	bindData() {
		this.PermissionName = (document.getElementById(
			"PermissionName"
		) as HTMLInputElement).value;
		console.log(this.PermissionName);
		this.data = {
			PermissionName: this.PermissionName
		};
		console.log(this.data);
	}
	updatePermission() {
		console.log("hhh");
		this.bindData();
		this.postData();
	}
	postData() {
		console.log("lll");
		let url = BASEURL + "/api/device/permission/insert";
		fetch(url, {
			method: "POST",
			headers: {
				"content-Type": "application/json"
			},
			body: JSON.stringify(this.data)
		}).then(response => {
			console.log(response.status);
			if (!response.ok) {
				throw new Error(response.statusText);
			}
		});
	}
}
var permission = new AddPermission();
