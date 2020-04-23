import { BASEURL } from "../globals";

export default class role {
	data: any;
	size: number;
	url: string;
	table1: HTMLTableElement = document.getElementById(
		"tab1"
	) as HTMLTableElement;
	table2: HTMLTableElement = document.getElementById(
		"tab2"
	) as HTMLTableElement;
	table3: HTMLTableElement = document.getElementById(
		"tab3"
	) as HTMLTableElement;
	roleName: string;
	PermissionName1: string;
	PermissionName: string;
	Role_up: string;
	permission_up: string;
	headerTag34 = document.getElementById("insert_role") as HTMLInputElement;
	headerTag35 = document.getElementById("insert_permission") as HTMLInputElement;
	token: string;
	//get roles
	constructor(token: string){
		this.token = token;
	}
	async getroles() {
		this.url = BASEURL + "/api/rolepermission";
		let data = await this.getApiCall(this.url);
		this.data = data["Roles"].map(roleObj => {
			return { RoleId: roleObj["RoleId"], RoleName: roleObj["RoleName"] };
		});
		console.log(this.data);
		this.size = data.length;
		this.dynamicGenerate(this.table2);
		return data;
	}
	//get permissions
	async getpermissions() {
		this.url = BASEURL + "/api/rolepermission";
		let data = await this.getApiCall(this.url);
		this.data = data["Permissions"].map(permObj => {
			return {
				PermissionId: permObj["PermissionId"],
				PermissionName: permObj["PermissionName"]
			};
		});
		console.log(this.data);
		this.size = data.length;
		this.dynamicGenerate1(this.table3);
		return data;
	}
	async getApiCall(URL: any) {
		let response = await fetch(URL,{
			headers: new Headers({"Authorization": `Bearer ${this.token}`})
		});
		let data = await response.json();
		console.log(data);
		return await data;
	}
	dynamicGenerate(table: any) {
		let loop = 0;
		this.DeleteRows(table);
		for (loop = 0; loop < this.data.length; loop++) {
			var row = table.insertRow(loop + 1);
			row.setAttribute("data-role-id", this.data[loop]["RoleId"]);
			var cell = row.insertCell(0);
			cell.innerHTML = this.data[loop]["RoleName"];
			if (table == this.table2) {
				var cell1 = row.insertCell(1);
				var cell2 = row.insertCell(1);
				cell1.innerHTML = `<button class="mdl-button mdl-js-button mdl-button--primary mdl-button--colored return" data-id="update_role"  value="${this.data[loop]["RoleId"]}">
    Edit
    </button>`;
				cell2.innerHTML = `<button class="mdl-button mdl-js-button mdl-button--primary mdl-button--colored return txt-danger" data-id="del_role"  value="${this.data[loop]["RoleId"]}">
    Delete
    </button>`;
			}
		}
	}
	dynamicGenerate1(table: any) {
		let loop = 0;
		this.DeleteRows(table);
		for (loop = 0; loop < this.data.length; loop++) {
			var row = table.insertRow(loop + 1);
			row.setAttribute("data-permission-id", this.data[loop]["PermissionId"]);
			var cell = row.insertCell(0);
			cell.innerHTML = this.data[loop]["PermissionName"];
			if (table == this.table3) {
				var cell1 = row.insertCell(1);
				var cell2 = row.insertCell(1);
				cell1.innerHTML = `<button class="mdl-button mdl-js-button mdl-button--primary mdl-button--colored return" data-id="update_permission"  value="${this.data[loop]["PermissionId"]}">Edit</button>`;
				cell2.innerHTML = `<button class="mdl-button mdl-js-button mdl-button--primary mdl-button--colored return txt-danger" data-id="del_permission"  value="${this.data[loop]["PermissionId"]}" >
    Delete
    </button>`;
			}
		}
	}
	DeleteRows(table: any) {
		var rowCount = table.rows.length;
		for (var i = rowCount - 1; i > 0; i--) {
			table.deleteRow(i);
		}
	} // delete role
	async DeleteRoleById(id1: number) {
		let x = id1;
		if (confirm("Are you sure you want to delete this role?")) {
			let uri = BASEURL + "/api/role/" + x + "/delete";
			await fetch(uri, {
				method: "DELETE",
				headers: new Headers({"Authorization": `Bearer ${this.token}`})
			});
			this.getroles();
		} else {
			console.log("delete failed");
		}
	} // delete permission
	async DeletePermissionById(id2: number) {
		let y = id2;
		if (confirm("Are you sure you want to delete this permission?")) {
			let uri = BASEURL + "/api/permission/" + y + "/delete";
			console.log(uri);
			await fetch(uri, {
				method: "DELETE",
				headers: new Headers({"Authorization": `Bearer ${this.token}`})
			});
			this.getpermissions();
		} else {
			console.log("delete failed");
		}
	} //insert new role
	bindData() {
		this.roleName = (document.getElementById(
			"roleName"
		) as HTMLInputElement).value;
		console.log(this.roleName);
		this.data = {
			RoleName: this.roleName
		};
		console.log(this.data);
	}
	updateRole() {
		console.log("hhh");
		this.bindData();
		this.postData();
	}
	postData() {
		console.log("lll");
		let url = BASEURL + "/api/role/add";
		fetch(url, {
			method: "POST",
			headers: {
				"content-Type": "application/json",
				"Authorization": `Bearer ${this.token}`
			},
			body: JSON.stringify(this.data)
		}).then(response => {
			console.log(response.status);
			if (!response.ok) {
				alert("duplicate role");
				throw new Error(response.statusText);
			}
			alert("role inserted");
			this.getroles();
		});
		(document.getElementById("roleName") as HTMLInputElement).value == "";
		document.getElementById("popup").style.display = "none";
		this.getroles();
		//navigationBarsss(role,"navigation");
	}
	//insert new permission
	bindData1() {
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
		this.bindData1();
		this.postData1();
	}
	postData1() {
		let url = BASEURL + "/api/permission/add";
		fetch(url, {
			method: "POST",
			headers: {
				"content-Type": "application/json",
				"Authorization": `Bearer ${this.token}`
			},
			body: JSON.stringify(this.data)
		}).then(response => {
			console.log(response.status);
			if (!response.ok) {
				alert("duplicate role");
				throw new Error(response.statusText);
			}
			alert("permission inserted");
			this.getpermissions();
		});
		(document.getElementById("permissionName") as HTMLInputElement).value == "";
		document.getElementById("popup1").style.display = "none";
		this.getpermissions();
	} //update role
	update_data1(x: number) {
		console.log(x);
		this.headerTag34.innerHTML == "";
		console.log("jjjjjjj");
		this.headerTag34.innerHTML = `
        <div style="border-radius: 10px;border:5px ; background-color:linen; padding:10px; margin: auto; width:500px;">
        <label> Enter The New Role Name </label>
        <input type="text" id="RoleName111"  name="RoleName111" value=""  >
        <button class="role_update_1" value="${x}">SUBMIT</button>
        </div>`;
	}
	bindData_1() {
		this.Role_up = (document.getElementById(
			"RoleName111"
		) as HTMLInputElement).value;
		console.log(this.Role_up);
		this.data = {
			RoleName: this.Role_up
		};
		console.log(this.data);
	}
	updateRole_1(x: number) {
		console.log(x);
		this.bindData_1();
		this.postData_1(x);
	}
	postData_1(x: number) {
		console.log(x);
		let url = BASEURL + "/api/role/" + x + "/update";
		fetch(url, {
			method: "PUT",
			headers: {
				"content-Type": "application/json",
				"Authorization": `Bearer ${this.token}`
			},
			body: JSON.stringify(this.data)
		}).then(response => {
			console.log(response.status);
			if (!response.ok) {
				alert("role is there");
				throw new Error(response.statusText);
			}
			alert("role updated");
			this.headerTag34.innerHTML = "";
			this.getroles();
		});
		this.getroles();
		console.log("kkkkkkkkk");
		// navigationBarsss(role,"navigation");
	} //update permission
	update_data2(y: number) {
		console.log(y);
		this.headerTag35.innerHTML == "";
		console.log("jjjjjjj");
		this.headerTag35.innerHTML = `
        <div style="border-radius: 10px;border:5px ; background-color:linen; padding:10px; margin: auto; width:500px;">
        <label> Enter The New Permission Name </label>
        <input type="text" id="PermissionName111"  name="PermissionName111" value=""  >
        <button class="permission_update_1" value="${y}">SUBMIT</button>
        </div> `;
	}
	bindData_2() {
		this.permission_up = (document.getElementById(
			"PermissionName111"
		) as HTMLInputElement).value;
		console.log(this.permission_up);
		this.data = {
			PermissionName: this.permission_up
		};
		console.log(this.data);
	}
	updatePermission_1(y: number) {
		console.log(y);
		this.bindData_2();
		this.postData_2(y);
	}
	postData_2(y: number) {
		console.log(y);
		let url = BASEURL + "/api/permission/" + y + "/update";
		fetch(url, {
			method: "PUT",
			headers: {
				"content-Type": "application/json",
				"Authorization": `Bearer ${this.token}`
			},
			body: JSON.stringify(this.data)
		}).then(response => {
			console.log(response.status);
			if (!response.ok) {
				alert("permission is there");
				throw new Error(response.statusText);
			}
			alert("permission updated");
			this.headerTag35.innerHTML = "";
			this.getpermissions();
		});
		this.getpermissions();
		console.log("kkkkkkkkk");
		// navigationBarsss(role,"navigation");
	}
}