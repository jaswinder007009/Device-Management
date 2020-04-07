import { BASEURL } from "../globals";
class abc1 {
	url: any;
	data: any;
	size: any;
	headerTag = document.getElementById("output") as HTMLInputElement;

	async getAllRoles1() {
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

	dynamicGenerate() {
		let loop = 0;
		this.headerTag.innerHTML = "";

		for (loop = 0; loop < this.data.length; loop++) {
			this.headerTag.innerHTML += `
   
  
            <option value="${this.data[loop]["id"]} style="width:>${this.data[loop]["roleName"]}</option>
            <br>
            

           `;
		}
	}
}
var a = new abc1();
