import { CreateUserApi } from "./createApi";
import { GetUserApi } from "./user-profile/getUserApi";
import * as util from "./utilities";
import { UpdateUserApi } from "./updateApi";
import { populateFormFromObject, createObjectFromForm } from "./user-profile/databinding";
import { UserModel } from "./UserModel";
import { remove} from "validation";
import { validateForm} from "validation";
import { Sort } from "./user-profile/SortingUser";
import { BASEURL } from "./globals";
import { UserData }  from "./dropdown";
(async function(){
	const token:string=JSON.parse(sessionStorage.getItem("user_info"))["token"];
	let form_mode: "create" | "edit";

	const table = document.getElementById("Request_data_body") as HTMLTableElement;
	console.log(table);
		function populateTable(array: UserModel[])
		{
			let htmlString: string = '';
			for(let element of array)
			{
				htmlString += element.GenerateTableRow();
			};

			table.innerHTML = htmlString;
		}
		function setData() 
		{
			const temp = new GetUserApi(token);
			temp.getRequest().then(function(){
				console.log(temp.array);
				populateTable(temp.array );
			});
		}
		
		setData();
		function changeheading1Text()
		{
		document.getElementById('headingText').innerHTML='Register User';
		}
		document.addEventListener('click' , e =>
			{
				if((e.target as HTMLButtonElement).id == "popup")
				{
					console.log("Button clicked")
					changeheading1Text();
					util.openForm();
					form_mode="create";
				}
			});

	const form = document.querySelector('.form-popup') as HTMLFormElement;
	form.addEventListener('submit', function (e) {
	console.log("inside function")
	e.preventDefault();
		if (form_mode=="create")
		{
			var userData=createObjectFromForm(this);
			if(validateForm(form_mode)==true){
			new CreateUserApi(token).createUserData(userData).then(function(){setData();});
			new UserData();
		}
			else 
			{
				return false;
			}
		}
		else if(form_mode=="edit")
		{
			var userData1=createObjectFromForm(this);
			console.log(userData1);
				if(validateForm(form_mode)==true){
						new UpdateUserApi(token).updateUserData(userData1).then(function(){
							setData();
						});
					}
					else
					{
						return false;
					}
		}
	util.closeForm();
	return false;

	});


	document.addEventListener("click", function (ea) {
		if((ea.target as HTMLButtonElement).className == "userDeleteData"){
			const id = parseInt((ea.target as HTMLButtonElement).dataset["id"]);
			new GetUserApi(token).deleteData(id).then(function(){setData();});
			
		}
		else if(ea.target.tagName == 'TH')
		{
		
			const returned = new Sort(token).sortBy(ea.target as HTMLTableHeaderCellElement);
					returned.then(data => {
					console.log(data);
					populateTable(data)
				});
		}
		else if (((ea.target) as HTMLInputElement).className == "userCheckStatus")
		{
			let userId:number = parseInt(((ea.target) as HTMLInputElement).id);
			if((document.getElementById(userId.toString()) as HTMLInputElement).checked)
			{
				new GetUserApi(token).userInactive(userId , "inactive");
			}
			else
			{	
				new GetUserApi(token).userInactive(userId , "active");
			}
			setData();
		}
		else if(((ea.target) as HTMLInputElement).id == "closeFormButton")
		{
			console.log("calling remobvve");
			remove();
		}
	});

	//document.querySelector("#addresses1.city").addEventListener("")
	function changeheadingText()
			{
			document.getElementById('headingText').innerHTML='Update User Details';
			}
	document.addEventListener('click' , ed =>
	{
		
		if((ed.target as HTMLButtonElement).id == "closeFormButton")
		{
			
			ed.preventDefault();
			util.closeForm();
			
		}
	});

	document.addEventListener("click", function(e) {
	if ((e.target as HTMLButtonElement).className == "userEditData") {
		changeheadingText();
				util.openForm();
				form_mode="edit";
				const userId: number = parseInt((e.target as HTMLButtonElement).id) ;
				var userObject: UserModel;
				new GetUserApi(token).getUserById(userId).then(res => {
					userObject = (res as unknown) as UserModel;
					const form = document.forms["myForm"] as HTMLFormElement;
					populateFormFromObject(userObject, form);
					form_mode = "edit";
					//util.disableEditing();
				});
			}
		});

		let checkbox = document.querySelector('.sameaddress');

			checkbox.addEventListener( 'change', function() {
			if(this.checked) {
						var container = document.getElementById("addresses1")
							var curradd1 =(container.querySelector(".addressLine1")as HTMLInputElement).value;
							var curradd2 =(container.querySelector(".addressLine2")as HTMLInputElement).value;
							var currcity =(container.querySelector(".city")as HTMLInputElement).value;
							var currstate =(container.querySelector(".state")as HTMLInputElement).value;
							var currcountry =(container.querySelector(".country")as HTMLInputElement).value;
							var currpincode =(container.querySelector(".pin")as HTMLInputElement).value;
							
						var peradd1 =curradd1 ;
						var peradd2 =curradd2 ;
						var percity =currcity ;
						var perstate =currstate ;
						var perpcountry =currcountry ;
						var perpincode =currpincode ;

						var container1 = document.getElementById("addresses2");

							(container1.querySelector(".addressLine1")as HTMLInputElement).value = peradd1;
							(container1.querySelector(".addressLine2")as HTMLInputElement).value = peradd2;
							(container1.querySelector(".city")as HTMLInputElement).value = percity;
							(container1.querySelector(".state")as HTMLInputElement).value = perstate;
							(container1.querySelector(".country")as HTMLInputElement).value= perpcountry;
							(container1.querySelector(".pin")as HTMLInputElement).value= perpincode;
		} else {
			var container1 = document.getElementById("addresses2");

			(container1.querySelector(".addressLine1")as HTMLInputElement).value = "";
			(container1.querySelector(".addressLine2")as HTMLInputElement).value = "";
			(container1.querySelector(".city")as HTMLInputElement).value = "";
			(container1.querySelector(".state")as HTMLInputElement).value = "";
			(container1.querySelector(".country")as HTMLInputElement).value=  "";
			(container1.querySelector(".pin")as HTMLInputElement).value= "";
		}
	});
	(document.querySelector('#fixed-header-drawer-exp')as HTMLInputElement).addEventListener('change', function (e) {
		console.log("test");
		const temp = new GetUserApi(token);
		temp.searchUser().then(function(data){
			populateTable(data);
		});
	});
})();