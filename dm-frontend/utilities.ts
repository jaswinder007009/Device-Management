import { Specification } from "./RequestModel";

export function openForm() {
	// document.getElementsByClassName("RegisterForm")[0].classList.add("active");
	(document.querySelector("#myForm") as HTMLFormElement).style.display="block";
}
​
export function closeForm() {
	// document.getElementsByClassName("RegisterForm")[0].classList.remove("active");
    (document.querySelector("#myForm") as HTMLFormElement).style.display="none";
    (document.querySelector("#myForm") as HTMLFormElement).reset();
}
export function formatDate1(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

export function concatName(value : any )
{
    let name = "";
    name += value.salutation + " " + value.firstName ;
    if(value.middleName != "")
    name+= " " + value.middleName ;
    name +=  " " + value.lastName;
    return name;
}    
export function concatSpecs(data : any)
{
    var specifications = "";
    for(let [key , value] of Object.entries(data) ) 
        
        if( value != ""){     
            specifications += key +":" + value +" ";
            if(key=="storage")
                specifications+="<br>";
        }   
             
    return specifications;

}
export function openModal(modalElement: HTMLElement){
    document.body.classList.add("modal-open");
	modalElement.classList.add("show");
}
export function closeModal(modalElement: HTMLElement){
    document.body.classList.remove("modal-open");
	modalElement.classList.remove("show");
}