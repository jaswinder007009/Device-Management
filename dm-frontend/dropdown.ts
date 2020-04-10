import { BASEURL } from "./globals";

export class UserData {
    data: any;
    url: string;
    body: any;

    
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
    // async getCountryCode() {
    //     this.url = BASEURL + "/api/Dropdown/country_code";
    //     this.dropdownApiCall(this.url, document.querySelector("#phones1 .countryCode"));
    //     this.dropdownApiCall(this.url, document.querySelector("#phones2 .countryCode"));
    //     this.dropdownApiCall(this.url, document.querySelector("#phones3 .countryCode"));
    // }       
    // async getContactType() {
    //     this.url = BASEURL + "/api/Dropdown/contactType";
    //     this.dropdownApiCall(this.url, document.querySelector("#phones1 .contactNumberType"));
    //     this.dropdownApiCall(this.url, document.querySelector("#phones2 .contactNumberType"));
    //     this.dropdownApiCall(this.url, document.querySelector("#phones3 .contactNumberType"));     
    // }
    // async getAddressType() {
    //     this.url = BASEURL + "/api/Dropdown/addressType";
    //     this.dropdownApiCall(this.url, document.querySelector("#addresses1 .addressType"));
    //     this.dropdownApiCall(this.url, document.querySelector("#addresses2 .addressType"));
    // }
    async dropdownApiCall(URL: any, selectElement: HTMLSelectElement) {
        let response = await fetch(URL);
        let data = await (response.json());       
        populateDropdown(selectElement, data);

    }
}
var user = new UserData()

user.getCountry();
user.getState();
user.getCity();
user.getSalutation();
// user.getCountryCode();
// user.getContactType();
// user.getAddressType();

function populateDropdown(selectElement: HTMLSelectElement, data) {
    let htmlString = '';
    for (let dataPair of data) {
        htmlString += '<option data-id="' + dataPair.id + '" value="' + dataPair.name + '">' + dataPair.name + '</option>';
    }
    selectElement.innerHTML = htmlString;
}