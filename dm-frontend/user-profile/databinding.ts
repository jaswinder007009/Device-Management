import * as models from "../UserModel";
import { UserData } from "../dropdown";
//import {formatDate1} from "../utilities"

export function createObjectFromForm(formElement: HTMLFormElement) {
	let modelObject = new models.UserModel();
	modelObject.salutation = (formElement["salutation"] as HTMLInputElement).value;
	modelObject.firstName = (formElement["firstName"] as HTMLInputElement).value;
	modelObject.middleName =(formElement["middleName"] as HTMLInputElement).value || null;
	modelObject.lastName = (formElement["lastName"] as HTMLInputElement).value;
	modelObject.departmentName = (formElement["department"] as HTMLInputElement).value;
	modelObject.designationName = (formElement["designation"] as HTMLInputElement).value;
	modelObject.email = (formElement["email"] as HTMLInputElement).value;
	modelObject.userId = parseInt((formElement["userId"] as HTMLInputElement).value);
	//modelObject.altEmail =(formElement["altEmail"] as HTMLInputElement).value || null;
	//modelObject.userName = (formElement["userName"] as HTMLInputElement).value;
	modelObject.password = (formElement["password"] as HTMLInputElement).value;
	modelObject.dob = (formElement["dob"] as HTMLInputElement).value;
	modelObject.gender = (formElement["gender"] as HTMLInputElement).value;
	modelObject.status = (formElement["status"] as HTMLInputElement).value;
	modelObject.roleName = (formElement["roleName"] as HTMLInputElement).value;

	modelObject.doj = (formElement["doj"] as HTMLInputElement).value;

	for (let i = 1; i <= 3; i++) 
	{
		const container = formElement.querySelector("#phones" + i) as HTMLDivElement;
		let contactNumberType = (container.querySelector(".contactNumberType") as HTMLInputElement).value;
		let number = (container.querySelector(".number") as HTMLInputElement).value;
		let countryCode = (container.querySelector(".countryCode") as HTMLInputElement).value;
		let areaCode = (container.querySelector(".areaCode") as HTMLInputElement).value;
		if (number)modelObject.phones.push
		({contactNumberType,number,countryCode,areaCode});
	}

	for (let i = 1; i <= 2; i++) 
	{
		const container = formElement.querySelector("#addresses" + i) as HTMLDivElement;
		let addressType = (container.querySelector(".addressType") as HTMLInputElement).value;
        let addressLine1 = (container.querySelector(".addressLine1") as HTMLInputElement).value;
        let addressLine2 = (container.querySelector(".addressLine2") as HTMLInputElement).value;
		let city = (container.querySelector(".city") as HTMLInputElement).value;
		let state = (container.querySelector(".state") as HTMLInputElement).value;
		let country = (container.querySelector(".country") as HTMLInputElement).value;
		let pin = (container.querySelector(".pin") as HTMLInputElement).value;
		if (addressLine1)modelObject.addresses.push
		({addressType,addressLine1,addressLine2,city,state,country,pin});
	}

	return modelObject;
}

export async  function populateFormFromObject(
	data: models.UserModel,
	form: HTMLFormElement,token:string
) {
    console.log(data, form);

	form["salutation"].value   =data.salutation;
	form["firstName"].value    =data.firstName;
	form["middleName"].value   =data.middleName;
	form["lastName"].value     =data.lastName;
	form["department"].value   =data.departmentName;
	form["designation"].value  =data.designationName;
	form["email"].value        =data.email;
	form["userId"].value       =data.userId;
	form["password"].value     ="";
	form["dob"].value          =data.dob;
	form["gender"].value       =data.gender;
	form["status"].value       =data.status;
	form["roleName"].value     =data.roleName;
	form["doj"].value          =data.doj;zz
	//form["phones1"].value      =data.phones;
	for(let i =0;i<3;i++)
	{
	 let container=form.querySelector("#phones"+(i+1));
	 console.log(form);
	 (container.querySelector(".contactNumberType")as HTMLInputElement).value=data.phones[i].contactNumberType;
	 (container.querySelector(".number")as HTMLInputElement).value=data.phones[i].number;
	 (container.querySelector(".countryCode")as HTMLInputElement).value=data.phones[i].countryCode;
	 (container.querySelector(".areaCode")as HTMLInputElement).value=data.phones[i].areaCode;
	}
 
	const dropDown= new UserData(token);

	for(let i =0;i<2;i++)
	{
		let container=form.querySelector("#addresses"+(i+1));
		console.log(form);

		(container.querySelector(".addressType")as HTMLInputElement).value=data.addresses[i].addressType;
		(container.querySelector(".addressLine1")as HTMLInputElement).value=data.addresses[i].addressLine1;
		(container.querySelector(".addressLine2")as HTMLInputElement).value=data.addresses[i].addressLine2;
		(container.querySelector(".pin")as HTMLInputElement).value=data.addresses[i].pin;

		var city=(container.querySelector(".city")as HTMLSelectElement);
		var state=(container.querySelector(".state")as HTMLSelectElement);
		var country=(container.querySelector(".country")as HTMLSelectElement);

		await dropDown.getCountry(country);
		country.value=data.addresses[i].country;

		await dropDown.getState(state,country);
		state.value=data.addresses[i].state;

		await dropDown.getCity(city,state);
		city.value=data.addresses[i].city;
		
	}
   //form["addresses"].value        =data.addresses;
	// form["addressType"].value       =data.addressType;
	// form["addressLine1"].value      =data.addressLine1;
	// form["addressLine2"].value      =data.addressLine2;
	// form["city"].value              =data.city;
	// form["state"].value             =data.state;
	// form["country"].value           =data.country;
	// form["pin"].value               =data.pin;
}


 