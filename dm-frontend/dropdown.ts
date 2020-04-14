import { BASEURL } from "./globals";

export class UserData {
    data: any;
    url: string;
    body: any;
    token: string;

    constructor(token: string){
        this.token = token;
    }
    
    async getCountry() {
        this.url = BASEURL + "/api/Dropdown/country";
        this.dropdownApiCall(this.url, document.querySelector("#addresses1 .country"));
        this.dropdownApiCall(this.url, document.querySelector("#addresses2 .country"));
        return null;
    }
    async getState() {
        this.url = BASEURL + "/api/Dropdown/state";
        this.dropdownApiCall(this.url, document.querySelector("#addresses1 .state"));
        this.dropdownApiCall(this.url, document.querySelector("#addresses2 .state"));
        return null;
    }
    async getCity() {
        this.url = BASEURL + "/api/Dropdown/city";
        this.dropdownApiCall(this.url, document.querySelector("#addresses1 .city"));
        this.dropdownApiCall(this.url, document.querySelector("#addresses2 .city"));

    }
    async getSalutation() {
        this.url = BASEURL + "/api/Dropdown/salutation";
        this.dropdownApiCall(this.url, document.querySelector("#form-group #salutation"));
        console.log(document.querySelector("#form-group .salutation"));
        
    }
    async dropdownApiCall(URL: any, selectElement: HTMLSelectElement) {
        let response = await fetch(URL,{
            headers: new Headers({"Authorization": `Bearer: ${this.token}`})
        });
        let data = await (response.json());       
        populateDropdown(selectElement, data);

    }
}

const token:string=JSON.parse(sessionStorage.getItem("user_info"))["token"];
var user = new UserData(token);

user.getCountry();
user.getState();
user.getCity();
user.getSalutation();

function populateDropdown(selectElement: HTMLSelectElement, data) {
    let htmlString = '';
    for (let dataPair of data) {
        htmlString += '<option data-id="' + dataPair.id + '" value="' + dataPair.name + '">' + dataPair.name + '</option>';
    }
    selectElement.innerHTML = htmlString;
}