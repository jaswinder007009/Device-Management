import { UserData }  from "../dropdown";
export async function dropDownListen(form:HTMLFormElement,token:string){
    const dropDown= new UserData(token);
    for(let i =0;i<2;i++){
		let container=form.querySelector("#addresses"+(i+1));
        let city=(container.querySelector(".city")as HTMLSelectElement);
		let state=(container.querySelector(".state")as HTMLSelectElement);
        let country=(container.querySelector(".country")as HTMLSelectElement);
        
        country.addEventListener("change" , async function (e){
            dropDown.getState(state,this);
            return null;
        });
        
        state.addEventListener("change",async function (f){
            dropDown.getCity(city,this);
            return null;
        });
     }
    
    deptdesgListen(form);
    return null;
}
export async function deptdesgListen(form:HTMLFormElement){
    form["department"].addEventListener("change",function(e){
        
        let dept=(form["designation"]as HTMLSelectElement);
    
        new UserData().departdesgcall(dept,this);
       
    
    });
}