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
        this.url = BASEURL + "/api/Dropdown/country";
          await this.dropdownApiCall(this.url,selectElement);
          populateDropdown(selectElement, this.data);
     
    }
    async getState(selectElement:HTMLSelectElement,dependentElement:HTMLSelectElement) {
        this.url = BASEURL + "/api/Dropdown/state?id="+dependentElement.options[dependentElement.selectedIndex].dataset.id;
        await this.dropdownApiCall(this.url, selectElement);
        populateDropdown(selectElement, this.data);
      
    }
    async getCity(selectElement:HTMLSelectElement,dependentElement:HTMLSelectElement) {
        this.url = BASEURL + "/api/Dropdown/city?id="+dependentElement.options[dependentElement.selectedIndex].dataset.id;
        await this.dropdownApiCall(this.url,selectElement);
         populateDropdown(selectElement, this.data);
     
    }
   
    async getSalutation() {
        this.url = BASEURL + "/api/Dropdown/salutation";
        this.selectElement=document.querySelector("#form-group #salutation");
        await this.dropdownApiCall(this.url,this.selectElement);
        populateDropdown(this.selectElement, this.data);    
    }

    async dropdownApiCall(URL: any, selectElement: HTMLSelectElement) {
        let response = await fetch(URL,{
            headers: new Headers({"Authorization": `Bearer ${this.token}`})
        });
         this.data = await (response.json());  
        return;     
           } 

    async departdesgcall(selectElement:HTMLSelectElement,dependentElement:HTMLSelectElement){
       this.url = BASEURL + "/api/Dropdown/designation?id="+dependentElement.value;
        await this.dropdownApiCall(this.url, selectElement);
        populateDropdown(selectElement, this.data);
        }
       
         async departmentcall(selectElement:HTMLSelectElement){
            this.url = BASEURL + "/api/Dropdown/department";
      //      this.selectElement=document.querySelector("#department.form-control");
            await this.dropdownApiCall(this.url,selectElement);
            populateDropdown(selectElement, this.data);
            }

            async getCountryCode(selectElement:HTMLSelectElement){
                this.url = BASEURL + "/api/Dropdown/country_code";
                await this.dropdownApiCall(this.url,selectElement);
                populateCountryCodeDropdown(selectElement,this.data)
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