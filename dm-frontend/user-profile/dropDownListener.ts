import { UserData }  from "../dropdown";
export async function dropDownListen(form:HTMLFormElement,token:string){
    const dropDown= new UserData(token);
    for(let i =0;i<2;i++){
		let container=form.querySelector("#addresses"+(i+1));
		console.log(form);

		// (container.querySelector(".addressType")as HTMLInputElement).value=data.addresses[i].addressType;
		// (container.querySelector(".addressLine1")as HTMLInputElement).value=data.addresses[i].addressLine1;
		// (container.querySelector(".addressLine2")as HTMLInputElement).value=data.addresses[i].addressLine2;
		// (container.querySelector(".pin")as HTMLInputElement).value=data.addresses[i].pin;
        let city=(container.querySelector(".city")as HTMLSelectElement);
		let state=(container.querySelector(".state")as HTMLSelectElement);
        let country=(container.querySelector(".country")as HTMLSelectElement);
        dropDown.getCountry(country);
        country.addEventListener("change" , async function (e){
             dropDown.getState(state,this);
         return null;
        })
        state.addEventListener("change",async function (f){
         dropDown.getCity(city,this);
         return null;
        })

     }

    return null;
}
export async function deptdesgListen(form:HTMLFormElement){
    form.querySelector("#department").addEventListener("click",function(e){
        let dept=(form.querySelector("#designation")as HTMLSelectElement);
        new UserData().departdesgcall(dept,this);
    });
}