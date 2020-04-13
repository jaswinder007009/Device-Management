import { UserModel } from './UserModel';
import { createObjectFromForm, populateFormFromObject } from './databinding';
import * as util from "./utility";
import { dynamicGenerate } from "./dynamic";
import { validate } from "./validate"
import { BASEURL } from '../globals';

export class UserData {
    data: any;
    url: string;
    body: any;

    async getOneUser() {
        this.url = BASEURL + "/api/user/30";
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
  
    async updateData(data) {
        return fetch(BASEURL + "/api/user/30/update", {
            method: 'PUT',
            headers: new Headers({ 'content-type': 'application/json' }),
            body: JSON.stringify(data)
        });
    }

    async getApiCall(URL: any) {
        let response = await fetch(URL);
        let data = await (response.json());
        console.log(data);
        return (await new UserModel(data));
    }
    async dropdownApiCall(URL: any, selectElement: HTMLSelectElement) {
        let response = await fetch(URL);
        let data = await (response.json());       
        populateDropdown(selectElement, data);
        return null;

    }
}

var user = new UserData()

user.getCountry();
user.getState();
user.getCity();
user.getOneUser();


document.querySelector('form').addEventListener('click', function (ev) {
    ev.preventDefault();
    if (ev.target.classList.contains("edit")) {
        util.openForm();
        var userObject: UserModel;

        user.getOneUser().then(function (data) {
            userObject = data;
            const form = document.querySelector('form') as HTMLFormElement;
            populateFormFromObject(userObject, form);
            
        });

    }
    else if (ev.target.id == "savemydata") {
        if (validate() == false) {
            return;

        }
        user.updateData(createObjectFromForm(this)).then(function () { user.getOneUser(); })

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
