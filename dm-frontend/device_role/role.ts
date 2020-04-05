// import {update} from "./update";
import { BASEURL } from "../globals";
class populateData {
	getheaderData(value, data) {
		document.getElementById(value).innerHTML += data;
	}
	clearData(value: string) {
		document.getElementById(value).innerHTML = "";
	}
}

class abc {
	id: Number;
	roleName: string;
	url: any;

	bodyData: any;

	data: any;
	size: any;

	headerTag = document.getElementById("output") as HTMLInputElement;
	getdata1 = document.getElementById("getdata") as HTMLInputElement;
	getperm = document.getElementById("getpermission") as HTMLInputElement;

	//api call to get all the roles

	async getAllRoles() {
		this.url = BASEURL + "/api/device/role";
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

	//deletion by the role id
	async DeleteUserById(id1: number) {
		let x = id1;
		let uri = BASEURL + "/api/device/role/" + x;
		console.log(uri);
		let response = await fetch(uri, {
			method: "DELETE"
		});
		console.log(this.data);
		this.getAllRoles();
	}

	//generate the page content for the roles

	dynamicGenerate() {
		let loop = 0;

		let populate = new populateData();
		populate.clearData("populateData");
		let tempo: any;

		//this.headerTag.innerHTML = "";
		for (loop = 0; loop < this.data.length; loop++) {
			tempo = `
         <tr style="background-color: darksalmon;">
            <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:20%;">
            <strong id="id${loop}">Role ID := ${this.data[loop]["id"]}</strong>
            </td>
            <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:20%;">
            <p ><strong id="roleName${loop}">Role := ${this.data[loop]["roleName"]}</strong></p>
            
            </td>
            <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:20%;">
            <button id="id${loop}"  onclick="ab.DeleteUserById(${this.data[loop]["id"]})">DELETE</button>
            </td>
            <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:20%;">
            <button id="roleName${loop}"  onclick="ab.getDetails(${this.data[loop]["id"]})">UPDATE</button>
            </td>
            <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:20%;">
            <button  id="id${loop}" onclick="ab.getAllPermission1(${this.data[loop]["id"]})" >view permission</button>
            </td>


            <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:20%;">
            <button  id="id${loop}" onclick="ab.getAllPermission11(${this.data[loop]["id"]})" >assign new permission</button>
            </td>
           
            
            </tr>
           
          `;
			populate.getheaderData("populateData", tempo);
		}
	}

	getRoleValue(id: Number) {
		console.log("id");
	}

	//get all the assigned permission to the role
	async getAllPermission1(id: number) {
		var x = id;
		this.url =
			BASEURL + "/api/device/get_permission_with_role/" + x;
		let data = await this.getApiPermission(this.url);
		this.data = await data;
		//let populate1=new populateData();
		//populate1.clearData("populatedata");
		console.log(data);
		this.size = data.length;

		this.dynamicGenerate1(x);
		return data;
	}
	//delete the permission assigned to the role
	async DeletePermissionById(id: number, id1: number) {
		let x = id;
		let y = id1;

		console.log(id, id1);
		let uri =
			BASEURL + "/api/device/get_permission_with_role/" +
			x +
			"/" +
			y;
		console.log(uri);

		let response = await fetch(uri, {
			method: "DELETE"
		});
	}

	async getApiPermission(URL: any) {
		let response = await fetch(URL);
		let data = await response.json();
		//  console.log(data);
		return await data;
	}
	// html page to show the data of the assigned permission to role
	dynamicGenerate1(x: number) {
		let loop = 0;
		let x1 = x;
		this.headerTag.innerHTML = "";
		for (loop = 0; loop < this.data.length; loop++) {
			this.headerTag.innerHTML += `
<table class=" table table-bordered" >

<tbody style="background-color:green;">

            <tr style="background-color: darksalmon;">
            <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:30%;">
            <strong >Role ID := ${x}</strong>
            </td>
            <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:30%;">
            <strong >Permission ID := ${this.data[loop]["permissionId"]}</strong>
            </td>
            <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:30%;">
            <p ><strong id="permissionName${loop}">Permission Name := ${this.data[loop]["permissionName"]}</strong></p>
            
            </td>
            
            


            
           

        
            </tr>
            </tbody>
            </table>`;
		}
	}

	//get all the unassigned permission

	async getAllPermission11(id: Number) {
		let x = id;
		this.url =
			BASEURL + "/api/device/get_permission_without_role/" + x;
		let data = await this.getApiCall11(this.url);
		this.data = await data;
		console.log(data);
		this.size = data.length;
		this.dynamicGenerate11(id);
		console.log(id);
		return data;
	}

	async getApiCall11(URL: any) {
		let response = await fetch(URL);
		let data = await response.json();
		//  console.log(data);
		return await data;
	}

	async DeletePermissionById1(id1: number) {
		let x = id1;
		let uri = BASEURL + "/api/device/permission/" + x;
		console.log(uri);
		let response = await fetch(uri, {
			method: "DELETE"
		});
		console.log(this.data);
	}

	//html page to get all the unassigned permission and assign it to the role

	dynamicGenerate11(id: Number) {
		let x = id;
		let populate = new populateData();
		let temp: string;
		console.log(x);
		let loop = 0;
		this.getdata1.innerHTML = "";
		for (loop = 0; loop < this.data.length; loop++) {
			temp = `


    
        <tr style="background-color: darksalmon;">
        <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:30%;">
        <strong id="id${loop}">Permission ID := ${this.data[loop]["permissionId"]}</strong>
        </td>
       
        <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:30%;">
        <strong id="permissionName${loop}">Permission Name := ${this.data[loop]["permissionName"]}</strong>
        </td>
           <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:20%;">
           <input type="checkbox" class="checks" value="${this.data[loop]["permissionId"]}">${this.data[loop]["permissionName"]}
            </td>
     
       
        <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:30%;">
        <button id="id${loop}"  onclick="ab.DeletePermissionById(${this.data[loop]["id"]})">${this.data[loop]["id"]}</button>
        </td>
<button id="id${loop}" onclick="check.updateRolePermission(${x},${this.data[loop]["permissionId"]})" value="${this.data[loop]["permissionId"]}" >ADD</button>
        </tr>
        
        

       
        
        `;
			//<button type="submit" onclick="getValue(${x})">ADD</button>
			populate.getheaderData("populateData", temp);
		}
	}

	// getValue(x:number){
	//     var checks=document.getElementsByClassName('checks');
	//     var str='';
	//     let i:number;
	//     for(i=0;i<3;i++){
	//         if(checks[i].checked===true){

	//             let v=checks[i];
	//             console.log(v);
	//             check.addRoleToPermission(x,v);

	//         }
	//     }

	// }
}
var ab = new abc();

//---------------------------------------

class AddRole {
	roleName: String;
	data: any;
	bindData() {
		this.roleName = (document.getElementById(
			"roleName"
		) as HTMLInputElement).value;
		console.log(this.roleName);
		this.data = {
			roleName: this.roleName
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
		let url = BASEURL + "/api/device/role/insert";
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
var role = new AddRole();

/*---------------------------------------------------*/

class checkbox {
	role_Id: number;
	permission_Id: number;
	data: any;

	// addRoleToPermission(roleId:number,permissionId:number){
	//     let r1=roleId;
	//     let r2=permissionId;
	//     this.updateRolePermission(r1,r2);

	// }

	bindData(id: number, id1: number) {
		console.log(id1);
		console.log(id);

		this.role_Id = id;
		this.permission_Id = id1;
		console.log(this.role_Id);
		console.log(this.permission_Id);
		this.data = {
			role_Id: this.role_Id,
			permission_Id: this.permission_Id
		};
		console.log(this.data);
	}

	updateRolePermission(x: number, y: number) {
		let x1 = x;
		let y1 = y;
		console.log("hhh");
		this.bindData(x1, y1);
		this.postData();
	}
	postData() {
		console.log("lll");
		let url = BASEURL + "/api/device/role_permission/insert";
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
var check = new checkbox();

/////////////////////////////////////////////////////////////////////////////////////////////////////////
