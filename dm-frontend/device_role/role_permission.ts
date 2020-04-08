class role_permission{
     
    id:Number
   
    url:any

    bodyData: any

    data: any;
    size: any;
  
    headerTag = (document.getElementById("output") as HTMLInputElement);
    headerTag1 = (document.getElementById("get_role_info") as HTMLInputElement);
    
 
  

  


    async getAllRoles() {
        

        this.url = "https://localhost:5001/api/device/role";
        let data = await this.getApiRoleCall(this.url);
        this.data = await data;
        console.log(data);
        this.size = data.length;
        this.RoleGenerate();
        return data;

    }

    async getApiRoleCall(URL: any) {


        let response = await fetch(URL);
        let data = await (response.json());
      //  console.log(data);
        return (await data);
    }
    alert_delete(id:number){
        alert("role Id"+id+"deleted")
    }

    async DeleteRoleById(id1:number) {
    let x=id1;
        let uri = "https://localhost:5001/api/device/role/" + x;
        console.log(uri);
        let response = await fetch(uri,
            {
                method: 'DELETE',
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
            <button class="btn btn-info"  onclick="up. update_data(${this.data[loop]["id"]})"><span class="glyphicon glyphicon-pencil">UPDATE</span></button>
            </td>


            <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:5%;">
            <button class="btn btn-danger" id="roleName${loop}" onclick="get_role.DeleteRoleById(${this.data[loop]["id"]})"><span class="glyphicon glyphicon-trash">DELETE</span></button>
            </td>

           

           
            
            <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:10%;">
            <button id="roleName${loop}" onclick="r_permission.getAllRolePermission(${this.data[loop]["id"]})">VIEW PERMISSION</button>
            </td>

            <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:10%;">
            <button id="roleName${loop}" onclick="permission_role.assignPermission(${this.data[loop]["id"]})" >ASSIGN PERMISSION</button>
            </td>
           
           
            
            
            
            
        
        
            </tr>

          
          `
        }
        
               
    }

 

  

}


    var get_role=new role_permission();
//////////////////////////////////////////////////////////////////



class update1{
    headerTag3=(document.getElementById("insert_data") as HTMLInputElement);


    update11(id:number){
        console.log(id);
        this.update_data(id);

    }
    update_data(x:number){
    get_role.headerTag1.innerHTML="";
        console.log("hello");
        this.headerTag3.innerHTML+=`
      
        <input type="text" id="RoleName11"  name="RoleName11" value=""  style="margin-top:300px; style="margin-left:100px; ">
        <button   class="btn btn-danger"  onclick="role_update.updateRole(${x})">SUBMIT</button>
       
        `
       
    }
       
}
var up =new update1();





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
        

        this.url = "https://localhost:5001/api/device/get_permission_without_role/"+x;
        let data = await this.getApiPermissionAssign(this.url);
        this.data = await data;
        console.log(data);
        this.size = data.length;
        this.assignPermissionRole(x);
        return data;

    }

    async getApiPermissionAssign(URL: any) {


        let response = await fetch(URL);
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
            <input type="checkbox" value="${this.data[loop]["permissionid"]}">${this.data[loop]["permissionName"]}
            </td>
            
            <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:30%;">
           <button  id="id${loop}" onclick="check.updateRolePermission(${x},${this.data[loop]["permissionId"]})"><span class="glyphicon glyphicon-plus">ADD</span></button>
            </td>
           
            
            
            
            
        
        
            </tr>
         `
        }
        
               
    }











}
var permission_role=new assign_permission();













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
        

        this.url = "https://localhost:5001/api/device/get_permission_with_role/"+x;
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
            <button class="btn btn-danger" id="permissionName${loop}" onclick="r_permission.DeleteRoleByPermission(${x},${this.data[loop]["permissionId"]})"><span class="glyphicon glyphicon-trash">DELETE</span></button>
            </td>
           
            
            
            
            
        
        
            </tr>
            </tbody>
            </table>`
        }
        
               
    }

    async DeleteRoleByPermission(id1:number,id:number) {
        let x = id1;
        let y=id;
        let uri = "https://localhost:5001/api/device/get_permission_with_role/" + x+"/"+y;
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
//////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////
/////////////////add checkbox



class checkbox{
    role_Id:number;
    permission_Id:number;
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
    this.permission_Id=id1;
        console.log(this.role_Id);
        console.log(this.permission_Id);
        this.data={
            "role_Id":this.role_Id,
            "permission_Id":this.permission_Id
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
        let url="https://localhost:5001/api/device/role_permission/insert";
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
var check=new checkbox();
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
        let url="https://localhost:5001/api/device/role/insert";
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
            console.log("lll");
        let url="https://localhost:5001/api/device/role/"+x;
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



 


 const  temp=new role_permission();
    temp.getAllRoles();