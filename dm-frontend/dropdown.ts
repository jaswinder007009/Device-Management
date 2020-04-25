import { BASEURL } from "./globals";

export class UserData {
    data: any;
    url: string;
    body: any;
    token: string;
    selectElement:HTMLSelectElement;

    constructor(token: string=""){
        this.token = token;
    }
    
    async getCountry(selectElement:HTMLSelectElement) {
        await this.loadDataFromCacheIfPresent("country");
        populateDropdown(selectElement, this.data);
     
    }
    async getState(selectElement:HTMLSelectElement,dependentElement:HTMLSelectElement) {
        this.url = BASEURL + "/api/Dropdown/state?id="+dependentElement.options[dependentElement.selectedIndex].dataset.id;
        await this.dropdownApiCall(this.url);
        populateDropdown(selectElement, this.data);
      
    }
    async getCity(selectElement:HTMLSelectElement,dependentElement:HTMLSelectElement) {
        this.url = BASEURL + "/api/Dropdown/city?id="+dependentElement.options[dependentElement.selectedIndex].dataset.id;
        await this.dropdownApiCall(this.url);
        populateDropdown(selectElement, this.data);
     
    }
   
    async getSalutation(selectElement: HTMLSelectElement) {
        this.url = BASEURL + "/api/Dropdown/salutation";
        await this.dropdownApiCall(this.url);
        populateDropdown(selectElement, this.data);    
    }

    async dropdownApiCall(URL: any) {
        let response = await fetch(URL,{
            headers: new Headers({"Authorization": `Bearer ${this.token}`})
        });
        this.data = await (response.json());  
        return;     
    } 

    async departdesgcall(selectElement:HTMLSelectElement,dependentElement:HTMLSelectElement){
        this.url = BASEURL + "/api/Dropdown/designation?id="+dependentElement.value;
        await this.dropdownApiCall(this.url);
        populateDropdown(selectElement, this.data);
    }
       
    async departmentcall(selectElement:HTMLSelectElement){
        this.url = BASEURL + "/api/Dropdown/department";
        await this.dropdownApiCall(this.url);
        populateDropdown(selectElement, this.data);
    }

    async getCountryCode(selectElement:HTMLSelectElement){
        await this.loadDataFromCacheIfPresent("country_code");
        populateCountryCodeDropdown(selectElement,this.data)
    }

    async loadDataFromCacheIfPresent(name: string){
        if(!localStorage.getItem(name)){
            this.url = BASEURL + "/api/Dropdown/" + name;
            await this.dropdownApiCall(this.url);
            localStorage.setItem(name, JSON.stringify(this.data));
        }
        else{
            this.data = JSON.parse(localStorage.getItem(name));
        }
    }
}

export function populateDropdown(selectElement: HTMLSelectElement, data) {
    let htmlString = '<option data-id="" value=""></option>';
    for (let dataPair of data) {
        htmlString += '<option data-id="' + dataPair.id + '" value="' + dataPair.name + '">' + dataPair.name + '</option>';
    }
    selectElement.innerHTML = htmlString;
}
export function populateCountryCodeDropdown(selectElement: HTMLSelectElement, data) {
    let htmlString = '<option data-id="" value=""></option>';
    for (let dataPair of data) {
        htmlString += '<option data-id="' + dataPair.id + '" value="' + dataPair.id + '">' + dataPair.name + '</option>';
    }
    selectElement.innerHTML = htmlString;
}