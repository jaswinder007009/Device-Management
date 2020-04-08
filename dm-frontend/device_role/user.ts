// class populateData1
// {
//     getheaderData(value,data)
// {
//     document.getElementById(value).innerHTML += data;
// }
// clearData(value:string )
// {
//     document.getElementById(value).innerHTML  = "";
// }
// }



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
        

        this.url = "https://localhost:5001/api/device/user";
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
            <button id="id${loop}" onclick="u_role.getAllUserRole(${this.data[loop]["userId"]})" >SEE ROLES</button>
            </td>

            <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:5%;">
            <button id="id${loop}" onclick="ass_role.assignRole(${this.data[loop]["userId"]})" >ASSIGN ROLES</button>
            </td>
            
            
            
        
        
            </tr>
           `
        }
        
               
    }











}
var u=new user();




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
        

        this.url = "https://localhost:5001/api/device/get_role_with_user/"+x;
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
            <button id="roleName${loop}" class="btn btn-danger" onclick="u_role.DeleteRoleByUser(${x},${this.data[loop]["id"]})"><span class="glyphicon glyphicon-trash">DELETE</span></button>
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
        let uri = "https://localhost:5001/api/device/get_role_with_user/" + x+"/"+y;
        console.log(uri);
        let response = await fetch(uri,
            {
                method: 'DELETE',
            })
        console.log(this.data);
        this.del_role_by_user(id1);
       u_role.getAllUserRole(id);
        
    }










}
var u_role=new user_role();

/////////////////////////////////////////////////////////////////////////////////////











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
        

        this.url = "https://localhost:5001/api/device/assign_role_to_user/"+x;
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
            <input type="checkbox"  onclick="check1.updateRolePermission(${x},${this.data[loop]["id"]})" value="${this.data[loop]["id"]}">${this.data[loop]["roleName"]}
            </td>
            
            <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:30%;">
           <button class="btn btn-info" id="id${loop}" onclick="check1.updateRolePermission(${x},${this.data[loop]["id"]})"  ><span class="glyphicon glyphicon-plus">ADD</span></button>
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



////////////////////////////////////////////////////////////////////////////
/////////checkbox



class checkbox1{
   userId:number;
   roleId:number;
    data:any

   

    bindData(id:number,id1:number)
 {
     console.log(id1);
     console.log(id);

         this.userId=  id;
    this.roleId=id1;
        console.log(this.userId);
        console.log(this.roleId);
        this.data={
            "userId":this.userId,
            "roleId":this.roleId
        };
         console.log(this.data);
     }
    
 updateRolePermission(x:number,y:number){
        let x1=x;
        let y1=y;
            console.log("hhh");
        this.bindData(x1,y1);
        this.postData(x1);
    }
    postData(id:number)
        {
            console.log("lll");
        let url="https://localhost:5001/api/device/role_user/insert";
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





const  temp2=new user();
   temp2.getAllUser();