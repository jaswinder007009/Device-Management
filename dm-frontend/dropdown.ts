import { BASEURL } from "./globals";

export class UserData {
    data: any;
    url: string;
    body: any;
    token: string;

    constructor(token: string){
        this.token = token;
    }
    
    async getCountry(selectElement:HTMLSelectElement) {
        this.url = BASEURL + "/api/Dropdown/country";
        return  this.dropdownApiCall(this.url,selectElement);
      //  this.dropdownApiCall(this.url, document.querySelector("#addresses2 .country"));
        //return null;
    }
    async getState(selectElement:HTMLSelectElement,dependentElement:HTMLSelectElement) {
        this.url = BASEURL + "/api/Dropdown/state?id="+dependentElement.options[dependentElement.selectedIndex].dataset.id;
        return this.dropdownApiCall(this.url, selectElement);
       // this.dropdownApiCall(this.url, document.querySelector("#addresses2 .state"));
       // return null;
    }
    async getCity(selectElement:HTMLSelectElement,dependentElement:HTMLSelectElement) {
        this.url = BASEURL + "/api/Dropdown/city?id="+dependentElement.options[dependentElement.selectedIndex].dataset.id;
        return   this.dropdownApiCall(this.url,selectElement);
       // this.dropdownApiCall(this.url, document.querySelector("#addresses2 .city"));
     //  return null;
    }
    async getSalutation() {
        this.url = BASEURL + "/api/Dropdown/salutation";
        this.dropdownApiCall(this.url, document.querySelector("#form-group #salutation"));
        console.log(document.querySelector("#form-group .salutation"));
        
    }
    async dropdownApiCall(URL: any, selectElement: HTMLSelectElement) {
        let response = await fetch(URL,{
            headers: new Headers({"Authorization": `Bearer ${this.token}`})
        });
        let data = await (response.json());       
        populateDropdown(selectElement, data);

    }    
    async departdesgcall(){
        this.url = BASEURL + "/api/Dropdown/designation?id=" + (document.getElementById("department")as HTMLSelectElement).value;
        this.dropdownApiCall(this.url, document.querySelector("#designationName.form-control"));
        }
        async departmentcall(){
            this.url = BASEURL + "/api/Dropdown/department";
            this.dropdownApiCall(this.url, document.querySelector("#department.form-control"));
            }
}

//const token:string=JSON.parse(sessionStorage.getItem("user_info"))["token"];


export function populateDropdown(selectElement: HTMLSelectElement, data) {
    let htmlString = '';
    for (let dataPair of data) {
        htmlString += '<option data-id="' + dataPair.id + '" value="' + dataPair.name + '">' + dataPair.name + '</option>';
    }
    selectElement.innerHTML = htmlString;
}