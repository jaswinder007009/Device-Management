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
        const data = await this.loadDataFromCacheIfPresent("country");
        populateDropdown(selectElement, data);
     
    }
    async getState(selectElement:HTMLSelectElement,dependentElement:HTMLSelectElement) {
        this.url = BASEURL + "/api/Dropdown/state?id="+dependentElement.options[dependentElement.selectedIndex].dataset.id;
        const data = await this.dropdownApiCall(this.url);
        populateDropdown(selectElement, data);
      
    }
    async getCity(selectElement:HTMLSelectElement,dependentElement:HTMLSelectElement) {
        this.url = BASEURL + "/api/Dropdown/city?id="+dependentElement.options[dependentElement.selectedIndex].dataset.id;
        const data = await this.dropdownApiCall(this.url);
        populateDropdown(selectElement,data);
     
    }
   
    async getSalutation(selectElement: HTMLSelectElement) {
        this.url = BASEURL + "/api/Dropdown/salutation";
      const data = await this.dropdownApiCall(this.url);
        populateDropdown(selectElement, data);    
    }

    async dropdownApiCall(URL: any) {
        let response = await fetch(URL,{
            headers: new Headers({"Authorization": `Bearer ${this.token}`})
        });
        
        if(response){
        const data = await (response.json());  
        return data;   
        }
   return [];
        
    } 

    async departdesgcall(selectElement:HTMLSelectElement,dependentElement:HTMLSelectElement){
        this.url = BASEURL + "/api/Dropdown/designation?id="+dependentElement.value;
        const data = await this.dropdownApiCall(this.url);
        populateDropdown(selectElement,data);
    }
       
    async departmentcall(selectElement:HTMLSelectElement){
        this.url = BASEURL + "/api/Dropdown/department";
        const data = await this.dropdownApiCall(this.url);
        populateDropdown(selectElement,data);
    }

    async getCountryCode(selectElement:HTMLSelectElement){
        const data = await this.loadDataFromCacheIfPresent("country_code");
        populateCountryCodeDropdown(selectElement, data)
    }

    async loadDataFromCacheIfPresent(name: string){
        let data;
        if(!localStorage.getItem(name)){
            this.url = BASEURL + "/api/Dropdown/" + name;
             data = await this.dropdownApiCall(this.url);
            localStorage.setItem(name, JSON.stringify(data));
        }
        else{
            data = JSON.parse(localStorage.getItem(name));
        }
        return data;
    }
}

export function populateDropdown(selectElement: HTMLSelectElement, data) {
    let htmlString = '<option data-id="" value=""></option>';
    if(data)
      { 
      for (let dataPair of data) {
      htmlString += '<option data-id="' + dataPair.id + '" value="' + dataPair.name + '">' + dataPair.name + '</option>';
         }
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