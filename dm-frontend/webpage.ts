import { GetUserApi } from "./user-profile/getUserApi";
import * as util from "./utilities";
import { UserModel } from "./UserModel";
import { Sort } from "./user-profile/Sorting";

let form_mode: "create" | "edit";

const table = document.getElementById("Request_data_body") as HTMLTableElement;
console.log(table);
function populateTable(array: UserModel[]){
	let htmlString: string = '';
	for(let element of array){
		htmlString += element.GenerateTableRow();
		
	};
	
	table.innerHTML = htmlString;
}
	 function jass() {
		const temp = new GetUserApi();
		temp.getRequest().then(function(){
			populateTable(temp.array );
		});
		
        // temp.searchByName();
	}
	jass();
	//AllListeners();


	document.addEventListener('click' , e =>
{
    if((e.target as HTMLButtonElement).id == "popup")
    {
        
        util.openForm();
    }
    if((e.target as HTMLButtonElement).id == "closeFormButton")
    {
        util.closeForm();
    }
});

document.querySelectorAll(".form-close-button").forEach(button =>
	button.addEventListener("click", ev => {
		util.closeForm();
	})
);




document.getElementsByClassName("userCheckStatus")



document.addEventListener("click" , e =>
{
	if (((e.target) as HTMLInputElement).className == "userCheckStatus")
	{
		let userId:number = parseInt(((e.target) as HTMLInputElement).id);
		if((document.getElementById(userId.toString()) as HTMLInputElement).checked)
		{
			console.log("---------------1-----------------");
			new GetUserApi().userInactive(userId , "inactive");
		}
		else
		{	
			console.log("----------------2----------------");
			new GetUserApi().userInactive(userId , "active");
		}
		jass();
	}
});


document.addEventListener("click", function (ea) {
	if((ea.target as HTMLButtonElement).className == "userDeleteData"){
		const id = parseInt((ea.target as HTMLButtonElement).dataset["id"]);
		new GetUserApi().deleteData(id);
		jass();
	}
	else if(ea.target.tagName == 'TH'){
		let id = (ea.target as HTMLInputElement).id;
	
			console.log("----------------5-------");
			const returned = new Sort().sortBy(id);
			// console.log(returned);
			returned.then(data => {
				console.log(data);
				populateTable(data)
			});
			//jass();
			
		
	}
});
