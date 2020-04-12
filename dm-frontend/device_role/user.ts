import { BASEURL } from "../globals";
class user{
     
    id:Number
    firstName:string
    lastName:string
    url:any

    bodyData: any

    data: any;
    size: any;
  
    headerTag = (document.getElementById("output") as HTMLInputElement);
    headerTag1 = (document.getElementById("get_user_role") as HTMLInputElement);

    getdata = (document.getElementById("getUserinfo") as HTMLInputElement);
  
  


    async getAllUser() {
        

        this.url =  BASEURL + "/api/device/user";
        let data = await this.getApiCall(this.url);
        this.data = await data;
        console.log(data);
        this.size = data.length;
        this.dynamicGenerate();
        return data;

    }

    async getApiCall(URL: any) {


        let response = await fetch(URL);
        let data = await (response.json());
      //  console.log(data);
        return (await data);
    }

    
   




    dynamicGenerate() {
        let loop = 0;
       // let populate11=new populateData1();
      
        //let tempo : any;
       this.headerTag.innerHTML = "";
        for (loop = 0; loop < this.data.length; loop++) {
            this.headerTag1.innerHTML += `


            <tr style="background-color: #CFB53B;">
            <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:10%;">
            <strong id="id${loop}"> ${this.data[loop]["userId"]}</strong>
            </td>

            <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:10%;">
            <strong id="firstName${loop}"> ${this.data[loop]["firstName"]}</strong>
            </td>
           
            <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:10%;">
            <strong id="lastname${loop}"  >${this.data[loop]["lastName"]}</strong>
            </td>

             <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:5%;">
            <button data-id="see_roles" value=" ${this.data[loop]["userId"]}" >SEE ROLES</button>
            </td>

            <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:5%;">
            <button data-id="assign_role" value="${this.data[loop]["userId"]}" >ASSIGN ROLES</button>
            </td>
            
            
            
        
        
            </tr>
           `
        }
        
               
    }











}
var u=new user();

document.body.addEventListener('click',function(event)
    {
        //e.preventDefault();
        if(event.target.dataset.id == "see_roles"){
            console.log("jjjjjj");
            var e4=event.target.value;
            console.log(e4);
            u_role.getAllUserRole(e4);
        }
    }
    )



    document.body.addEventListener('click',function(event)
    {
        //e.preventDefault();
        if(event.target.dataset.id == "assign_role"){
            console.log("jjjjjj");
            var e5=event.target.value;
            console.log(e5);
            ass_role.assignRole(e5);
        }
    }
    )



//--------------------------------------------------------

class user_role{
     
    id:Number
    firstName:string
    lastName:string
    url:any

    bodyData: any

    data: any;
    size: any;
  

    getdata = (document.getElementById("getUserinfo") as HTMLInputElement);
  
  


    async getAllUserRole(id:number) {
        let x=id
        

        this.url =  BASEURL + "/api/device/get_role_with_user/"+x;
        let data = await this.getApiRoleCall(this.url);
        this.data = await data;
        console.log(data);
        this.size = data.length;
        this.UserRoleInfo(x);
        return data;

    }

    async getApiRoleCall(URL: any) {


        let response = await fetch(URL);
        let data = await (response.json());
      //  console.log(data);
        return (await data);
    }

    
   




    UserRoleInfo(id:number) {
        let x=id;
        let loop = 0;
       // let populate11=new populateData1();
      
        //let tempo : any;
       this.getdata.innerHTML = "";
        for (loop = 0; loop < this.data.length; loop++) {
            this.getdata.innerHTML += `


            <tr style="background-color: #FADA5E;">
            <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:30%;">
            <strong id="id${loop}">User ID := ${x}</strong>
            </td>

            <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:30%;">
            <strong id="id${loop}">Role ID := ${this.data[loop]["id"]}</strong>
            </td>

            <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:30%;">
            <strong id="roleName${loop}">Role Name := ${this.data[loop]["roleName"]}</strong>
            </td>
            <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:30%;">
            <button class="del_user_role1"  data-user-id="${x}" value="${this.data[loop]["id"]}" >DELETE</button>
            </td>
            
            
            
            
        
        
            </tr>
        `
        }
        
               
    }

    del_role_by_user(id:number){
        alert("With respect to user RoleId"+id+"deleted");

    }
    async DeleteRoleByUser(id:number,id1:number) {
        let x = id;
        let y=id1;
        let uri =  BASEURL + "/api/device/get_role_with_user/" + x+"/"+y;
        console.log(uri);
        let response = await fetch(uri,
            {
                method: 'DELETE',
            })
        console.log(this.data);
        this.del_role_by_user(id1);
    //    u_role.getAllUserRole(id);
        
    }










}
var u_role=new user_role();

/////////////////////////////////////////////////////////////////////////////////////



document.addEventListener('click' ,e=>{

        if( (e.target as HTMLButtonElement).className ==="del_user_role1")
        {
            console.log("sdfghjkl");
            console.log(event.target.dataset.userId);
            u_role.DeleteRoleByUser(event.target.dataset.userId,event.target.value);
        //    check1.updateRolePermission(event.target.dataset.roleId,event.target.value);
           // 
           
        }
       
    }
    );
// document.body.addEventListener('click',function(event)
//     {
//         //e.preventDefault();
//         console.log("hhhh");
//         if(event.target.dataset.id == "del_user_role1"){
           
//            console.log("gotittt");
//            console.log(event.target.value);
      
//           u_role.DeleteRoleByUser(event.target.dataset.id,event.target.value);
//          //  event.target.dataset.userId,event.target.value
//         }
//     }
//     )










class assign_role{
     
    id:Number
    firstName:string
    lastName:string
    url:any

    bodyData: any

    data: any;
    size: any;
  

    getuserdata= (document.getElementById("assignrole") as HTMLInputElement);

  
  


    async assignRole(id:number) {
        let x=id;
        console.log(x);
        

        this.url =  BASEURL + "/api/device/assign_role_to_user/"+x;
        let data = await this.getApiRoleAssign(this.url);
        this.data = await data;
        console.log(data);
        this.size = data.length;
        this.assignRoleUser(x);
        return data;

    }

    async getApiRoleAssign(URL: any) {


        let response = await fetch(URL);
        let data = await (response.json());
      //  console.log(data);
        return (await data);
    }

    
   




    assignRoleUser(id:number) {
        let x=id;
        console.log(x);

        let loop = 0;
       // let populate11=new populateData1();
      
        //let tempo : any;
       this.getuserdata.innerHTML = "";
        for (loop = 0; loop < this.data.length; loop++) {
            this.getuserdata.innerHTML += `


            

            <tr style="background-color: #4C9A2A;">
            <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:30%;">
            <strong id="id${loop}">User ID := ${x}</strong>
            </td>
            
            <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:30%;">
            <strong id="id${loop}">Role ID := ${this.data[loop]["id"]}</strong>
            </td>

            <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:30%;">
            <strong id="roleName${loop}">Role Name := ${this.data[loop]["roleName"]}</strong>
            </td>
            
            
            
            <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:30%;">
           <button class="add_r" data-id="assign_role"  data-user-id="${x}" value=" ${this.data[loop]["id"]}"  >ADD</button>
            </td>
           
            
            
            
            
        
        
            </tr>
            `
        }
        
               
    }
    add_role(id:number){
        alert("With respect to user roleId"+id+"added");
    }
    
}
var ass_role=new assign_role();


//------------------------------------------------------------------------------------------




class checkbox1{
   userId:number;
   roleId:number;
    data:any

   

    bindData(id:number,id1:number)
 {
     console.log(id);
     console.log(id1);

         this.useId=id;
    this.roleId=id1;
    
        // console.log(this.userId);
        // console.log(this.roleId);
        this.data={
            "userId":Number(id),
            "roleId":Number(this.roleId)
        };
         console.log(this.data);
     }
    
 updateRolePermission(x:number,y:number){
        // let x1=x,
        // let y1=y;
        console.log("kkkkkkkkkk");
            console.log(x);
        this.bindData(x,y);
        this.postData(x);
    }
    postData(id:number)
        {
            console.log("lll");
        let url= BASEURL + "/api/device/role_user/insert";
        console.log(url);
              fetch( url , {
                method : "POST" , 
               
                headers : {
                    "content-Type" : "application/json" , 
                },
                body : JSON.stringify(this.data),
            
            }).then(response => {
                console.log(response.status);
                if (!response.ok) {
                  throw new Error(response.statusText)
                  
                    }
                    ass_role.add_role(id);
                ass_role.assignRole(id);
            
              });
    
        }
    }
var check1=new checkbox1();

//----------------------------------------------------------------------------------------------

document.addEventListener('click' ,e=>{

        if( (e.target as HTMLButtonElement).className ==="add_r")
        {
            console.log("sdfghjkl");
            
           check1.updateRolePermission(event.target.dataset.userId,event.target.value);
           // 
           
        }
       
    }
    );
// document.body.addEventListener('click',function(event)
//     {
//         //e.preventDefault();
//         if(event.target.dataset.id == "assign_role"){
//             console.log("iiiiiiiii");
         
//         check1.updateRolePermission(event.target.dataset.userId,event.target.value);
           
//         }
//     }
//     )
////////////////////////////////////////////////////////////////////////////







/////////checkbox









const  temp2=new user();
   temp2.getAllUser();