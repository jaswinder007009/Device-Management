import { BASEURL } from "../globals";
class role_permission{
     
    id:Number
   
    url:any

    bodyData: any

    data: any;
    size: any;
  
    headerTag = (document.getElementById("output") as HTMLInputElement);
    headerTag1 = (document.getElementById("get_role_info") as HTMLInputElement);
    
 
  

  


    async getAllRoles() {
        

        this.url = BASEURL + "/api/device/role";
        let data = await this.getApiRoleCall(this.url);
        this.data = await data;
        console.log(data);
        this.size = data.length;
        this.RoleGenerate();
        return data;

    }

    async getApiRoleCall(URL: any) {


        let response = await fetch(URL,
            {
                headers: new Headers({"Authorization": `Bearer ${this.token}`})
            });
        let data = await (response.json());
      //  console.log(data);
        return (await data);
    }
    alert_delete(id:number){
        alert("role Id"+id+"deleted")
    }

    async DeleteRoleById(id1:number) {
    let x=id1;
        let uri = BASEURL + "/api/device/role/" + x;
        console.log(uri);
        let response = await fetch(uri,
            {
                method: 'DELETE',
                headers: new Headers({"Authorization": `Bearer ${this.token}`})
            })
        console.log(this.data);
        this.alert_delete(x);
        this.getAllRoles();
        
    }
   




    RoleGenerate() {
        let loop = 0;
       // let populate11=new populateData1();
      
        //let tempo : any;
       this.headerTag.innerHTML = "";
       this.headerTag1.innerHTML= "";
        for (loop = 0; loop < this.data.length; loop++) {
            this.headerTag1.innerHTML += `
           

            <tr style="background-color: #74B72E;">
            <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:10%;">
            <strong id="id${loop}">${this.data[loop]["id"]}</strong>
            </td>

            <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:10%;">
            <strong id="roleName${loop}"> ${this.data[loop]["roleName"]}</strong>
            </td>


            <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:5%;">
            <button   class="role_up_date" value="${this.data[loop]["id"]}">UPDATE</button>
            </td>


             <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:20%;">
            <button class="btn btn-danger" data-id="del_permission1"  value="${this.data[loop]["id"]}">DELETE</button>
            </td>

           

           
            
            <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:10%;">
            <button data-id="view_permission" value="${this.data[loop]["id"]}">VIEW PERMISSION</button>
            </td>

            <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:10%;">
            <button data-id="assign_permission" value="${this.data[loop]["id"]}" >ASSIGN PERMISSION</button>
            </td>
           
           
            
            
            
            
        
        
            </tr>

          
          `
        }
        
               
    }

 
}


    var get_role=new role_permission();

    //-------------------------------------------------------------------------------
document.body.addEventListener('click',function(event)
    {
        //e.preventDefault();
     
        if(event.target.dataset.id == "del_permission1"){
            console.log("iiiiiiiii");
      
            get_role.DeleteRoleById(event.target.value);
           
        }
    }
    )


//-----------------------------------------------------------------------------------------
document.addEventListener('click' ,e=>{

        if( (e.target as HTMLButtonElement).className ==="role_up_date")
        {
            console.log("sdfghjkl");
            up.update_data(event.target.value);
           // 
           
        }
       
    }
    );
    
    
//////////////////////////////////////////////////////////////////



class update1{
    headerTag3=(document.getElementById("insert_data") as HTMLInputElement);


    update11(id:number){
        console.log(id);
        this.update_data(id);

    }
    update_data(x:number){

    get_role.headerTag1.innerHTML="";
        console.log(x);
        this.headerTag3.innerHTML+=`
      
        <input type="text" id="RoleName11"  name="RoleName11" value=""  style="margin-top:300px; style="margin-left:100px; ">
        <button     class="role_update_1"  value="${x}">SUBMIT</button>
       
        `
       
    }
       
}
var up =new update1();

//------------------------------------------------------------------------------------



 document.body.addEventListener('click',function(event)
    {
        //e.preventDefault();
        if(event.target.dataset.id == "role_update_1"){
            console.log("lllllll");
        console.log(event.log.value);
            role_update.updateRole(event.target.value);
      
            
           
        }
    }
    )




//////////////////////////////assign permission////////////////////////////////////////


class assign_permission{
     
    id:Number
   
    url:any

    bodyData: any

    data: any;
    size: any;
  

    getuserdata= (document.getElementById("assign_perm") as HTMLInputElement);

  
  


    async assignPermission(id:number) {
        let x=id;
        
        console.log(x);
        

        this.url = BASEURL + "/api/device/get_permission_without_role/"+x;
        let data = await this.getApiPermissionAssign(this.url);
        this.data = await data;
        console.log(data);
        this.size = data.length;
        this.assignPermissionRole(x);
        return data;

    }

    async getApiPermissionAssign(URL: any) {


        let response = await fetch(URL,{headers: new Headers({"Authorization": `Bearer ${this.token}`})});
        let data = await (response.json());
      //  console.log(data);
        return (await data);
    }

    add_permiss(id:number){
        alert(id+"inserted");
    }
   




    assignPermissionRole(id:number) {
        let loop = 0;
       // let populate11=new populateData1();
      let x=id;
    
      console.log(x);
      
        //let tempo : any;
       this.getuserdata.innerHTML = "";
        for (loop = 0; loop < this.data.length; loop++) {
            this.getuserdata.innerHTML += `


              <tr style="background-color: #52B2BF;">
            <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:30%;">
            <strong id="id${loop}">Role ID := ${x}</strong>
            </td>
            <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:30%;">
            <strong id="id${loop}">Permission ID := ${this.data[loop]["permissionId"]}</strong>
            </td>

            <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:30%;">
            <strong id="roleName${loop}">Permisssion Name := ${this.data[loop]["permissionName"]}</strong>
            </td>
            
           
            
            <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:30%;">
           <button  class="xyz" data-role-id=${x} value="${this.data[loop]['permissionId']}">
         ADD</button>
            </td>
           
            
            
          
            
        
        
            </tr>
         `
        }
        
               
    }











}
var permission_role=new assign_permission();
// //----------------------------------------------------------------------------------------------

// document.body.addEventListener('click',function(event)
//     {
//         console.log("lllkkkk"+event.target.dataset.id);
       
//        if(event.target.dataset.id == "add2"){
            
//             console.log("data1");

           
//              check.updateRolePermission(event.target.dataset.roleId,event.target.value);
           
//         }















////////////////////////////////////////////////////////////////////////////////
//get all the permission

class role_permission1{
     
    id:Number
  
    url:any

    bodyData: any

    data: any;
    size: any;
  

    getdata = (document.getElementById("getperm") as HTMLInputElement);
  
  


    async getAllRolePermission(id:number) {
        
        var x=id;
        

        this.url = BASEURL + "/api/device/get_permission_with_role/"+x;
        let data = await this.getApiPermissionCall(this.url);
        this.data = await data;
        console.log(data);
        this.size = data.length;
        this.RolePermInfo(x);
        return data;

    }

    del_permis(id:number){
        alert("permission"+id+"deleted");
    }

    async getApiPermissionCall(URL: any) {


        let response = await fetch(URL);
        let data = await (response.json());
      //  console.log(data);
        return (await data);
    }

    
   




    RolePermInfo(id:number) {
        let x=id;
        
       
        let loop = 0;
       // let populate11=new populateData1();
      
        //let tempo : any;
       this.getdata.innerHTML = "";
     
        for (loop = 0; loop < this.data.length; loop++) {
            this.getdata.innerHTML += `
<table class=" table table-bordered" >

<tbody style="background-color:green;">

            <tr style="background-color: #FADA5E;">

            <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:20%;">
            <strong id="permissionId${loop}">Role ID := ${x}</strong>
            </td>

            <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:20%;">
            <strong id="permissionId${loop}">Permission ID := ${this.data[loop]["permissionId"]}</strong>
            </td>

            <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:20%;">
            <strong id="permissionName${loop}">Permission Name := ${this.data[loop]["permissionName"]}</strong>
            </td>
           
  <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:20%;">
            <button class="btn btn-danger" data-id="del_permission" data-role-id="${x}" value="${this.data[loop]["permissionId"]}">DELETE</button>
            </td>
            
            
            
            
        
        
            </tr>
            </tbody>
            </table>`
        }
        
               
    }

    async DeleteRoleByPermission(id1:number,id:number) {
        let x = id1;
        let y=id;
        console.log(id1);
        let uri = BASEURL + "/api/device/get_permission_with_role/" + x+"/"+y;
        console.log(uri);
        let response = await fetch(uri,
            {
                method: 'DELETE',
            })
        console.log(this.data);
        this.del_permis(id1);
        r_permission.getAllRolePermission(id1);
        
    }
   









}
var r_permission=new role_permission1();

document.body.addEventListener('click',function(event)
    {
        //e.preventDefault();
        if(event.target.dataset.id == "del_permission"){
            console.log("data111111111111");
            console.log(event.target.value.id);
            r_permission.DeleteRoleByPermission(event.target.dataset.roleId,event.target.value);
           
        }
    }
    )
//////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////
/////////////////add checkbox



class checkbox1{
    role_Id:number;
    permission_id:number;
    data:any

    // addRoleToPermission(roleId:number,permissionId:number){
    //     let r1=roleId;
    //     let r2=permissionId;
    //     this.updateRolePermission(r1,r2);

    // }

    bindData(id:number,id1:number)
 {
     console.log(id1);
     console.log(id);

         this.role_Id=  id;
    this.permission_id=id1;
        console.log(this.role_Id);
        console.log(this.permission_id);
        this.data={
            "role_Id":Number(this.role_Id),
            "permission_id":Number(this.permission_id)
        };
         console.log(this.data);
     }
    
 updateRolePermission(x:number,y:number){
        let x1=x;
        let y1=y;
            console.log("hhh");
        this.bindData(x1,y1);
        this.postData(x,y);
    }
    postData(id:number,id1:number)
        {
            console.log("lll");
        let url=BASEURL + "/api/device/role_permission/insert";
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
                permission_role.add_permiss(id1);                
                permission_role.assignPermission(id);
              });
    
        }
    }





var check1=new checkbox1();


/////////////////////////////////////////////////////////////////









document.addEventListener('click' ,e=>{

        if( (e.target as HTMLButtonElement).className ==="xyz")
        {
            console.log("sdfghjkl");
           check1.updateRolePermission(event.target.dataset.roleId,event.target.value);
           // 
           
        }
       
    }
    );
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///insert new role 


class insert_Role{
    roleName:String
    data:any

    
    clear_data()
    {
        this.roleName="";
    }

    bindData()
    {
        this.roleName=  (document.getElementById("roleName") as HTMLInputElement).value;
        console.log(this.roleName);
        this.data={
            "roleName":this.roleName
        };
        console.log(this.data);
    }
    updateRole(){
            console.log("hhh");
        this.bindData();
        this.postData();
        this.clear_data();
    }
    postData()
        {
            console.log("lll");
        let url=BASEURL + "/api/device/role/insert";
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
              });
             
    
        }
    }
var role_insert=new insert_Role();

document.querySelector("#btn_insert").addEventListener('click',function(e){
    role_insert.updateRole();
})



////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////update Data//////////////////////////////////////////////////////////

class update_Role{
    RoleName:String
    data:any

    
    clear_data()
    {
        this.RoleName="";
    }

    bindData()
    {
        this.RoleName= (document.getElementById("RoleName11") as HTMLInputElement).value;
        console.log(this.RoleName);
        this.data={
            "RoleName":this.RoleName
        };
        console.log(this.data);
    }
    updateRole(x:number){
            console.log(x);
            
        this.bindData();
        this.postData(x);
        this.clear_data();
    }
    postData(x:number)
        {
            console.log(x);
        let url=BASEURL + "/api/device/role/"+x;
              fetch( url , {
                method : "PUT" , 
               
                headers : {
                    "content-Type" : "application/json" , 
                },
                body : JSON.stringify(this.data),
            
            }).then(response => {
                console.log(response.status);
                if (!response.ok) {
                  throw new Error(response.statusText)
                  
                }
              });

     up.headerTag3.innerHTML="";
    get_role.getAllRoles();
        }
    }
var role_update=new update_Role();

///////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener('click' ,e=>{

        if( (e.target as HTMLButtonElement).className ==="role_update_1")
        {
            console.log("sdfghjkl");
            
           console.log(event.target.value)
            role_update.updateRole(event.target.value);
           
           
        }
       
    }
    );

// window.addEventListener(
//     "load",
//     function () {
      
//     const temp = new role_permission();
//     temp.getAllRoles();
//     });


document.body.addEventListener('click',function(event)
{
    if(event.target.dataset.id=="view_permission"){
        console.log("jjjjjjj");
        var e1=event.target.value;
        console.log(e1);
        r_permission.getAllRolePermission(e1);
    }

    if(event.target.dataset.id=="assign_permission"){
        console.log("jjjjjjj");
        var e2=event.target.value;
        console.log(e2);
        permission_role.assignPermission(e2);
        // this.divs =document.querySelectorAll('.add_data');
    }

    if(event.target.dataset.id== "del_permission1"){
        console.log("jjjjjjj");
        var e3=event.target.value;
        console.log(e3);
        get_role.DeleteRoleById(e3);
        
        // this.divs =document.querySelectorAll('.add_data');
    }

 
  
    
})



const  temp=new role_permission();
   temp.getAllRoles();