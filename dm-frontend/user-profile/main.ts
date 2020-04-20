import { UserModel } from './UserModel';
import { createObjectFromForm, populateFormFromObject } from './databinding';
import * as util from "./utility";
import { dynamicGenerate } from "./dynamic";
import { validate } from "./validate"
import { BASEURL, navigationBarsss, amIUser } from '../globals';
(async function () {
    let token=JSON.parse(sessionStorage.getItem("user_info"))["token"];
    let role = await amIUser(token) == true ? "User" : "Admin";
class UserData {
    token : string ="";
	constructor(token:string){
		this.token=token;
	}
    data: any;
    url: string;
    body: any;
//TODO CLASSNAME AND GETUSERBYID REUSE
    async getOneUser(userId:string) {
        this.url = BASEURL + "/api/user/"+ userId;
        let data = await this.getApiCall(this.url);
        this.data = await data;
        dynamicGenerate(this.data);
        return data;

    }
     getCountry() {
        this.url = BASEURL + "/api/Dropdown/country";
        this.dropdownApiCall(this.url, document.querySelector("#addresses1 .country"));
        this.dropdownApiCall(this.url, document.querySelector("#addresses2 .country"));
        return null;
    }
     getState() {
        this.url = BASEURL + "/api/Dropdown/state";
        this.dropdownApiCall(this.url, document.querySelector("#addresses1 .state"));
        this.dropdownApiCall(this.url, document.querySelector("#addresses2 .state"));
        return null;
    }
     getCity() {
        this.url = BASEURL + "/api/Dropdown/city";
        this.dropdownApiCall(this.url, document.querySelector("#addresses1 .city"));
        this.dropdownApiCall(this.url, document.querySelector("#addresses2 .city"));

    }
  
    async updateData(data,userId:string) {
        return fetch(BASEURL + "/api/user/"+userId+"/update", {
            method: 'PUT',
            headers: new Headers([["Content-Type","application/json"],["Authorization", `Bearer ${this.token}`]]),
            body: JSON.stringify(data)
        });
    }

    async getApiCall(URL: any) {
        let response = await fetch(URL,
            {headers: new Headers({"Authorization": `Bearer ${token}`})});
        let data = await (response.json());
        console.log(data);
        return (await new UserModel(data));
    }
    async dropdownApiCall(URL: any, selectElement: HTMLSelectElement) {
        let response = await fetch(URL,{headers: new Headers({"Authorization": `Bearer ${token}`})});
        let data = await (response.json());       
        populateDropdown(selectElement, data);
        return null;

    }
}
const userId=JSON.parse(sessionStorage.getItem("user_info"))["id"];

var user = new UserData(token);

user.getCountry();
user.getState();
user.getCity();
user.getOneUser(userId);


document.querySelector('form').addEventListener('click', function (ev) {
    ev.preventDefault();
    if ((ev.target as HTMLButtonElement).classList.contains("edit")) {
        util.openForm();
        var userObject: UserModel;

        user.getOneUser(userId).then(function (data) {
            userObject = data;
            const form = document.querySelector('form') as HTMLFormElement;
            // @ts-ignore
            populateFormFromObject(userObject, form);
            
        });

    }
    else if ((ev.target as HTMLButtonElement).id == "savemydata") {
        if (validate() == false) {
            return;

        }
        user.updateData(createObjectFromForm(this),userId).then(function () { user.getOneUser(userId); })

        util.closeForm();

    }

    return false;

});

function populateDropdown(selectElement: HTMLSelectElement, data) {
    let htmlString = '';
    for (let dataPair of data) {
        htmlString += '<option data-id="' + dataPair.id + '" value="' + dataPair.name + '">' + dataPair.name + '</option>';
    }
    selectElement.innerHTML = htmlString;
}
navigationBarsss(role,"navigation");
})();