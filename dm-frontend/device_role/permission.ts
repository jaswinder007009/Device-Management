class abc{
     
    id:Number
    firstName:string
    lastName:string
    url:any

    bodyData: any

    data: any;
    size: any;
  
    headerTag = (document.getElementById("output") as HTMLInputElement);
    headerTag1 = (document.getElementById("perm") as HTMLInputElement);

  


    async getAllPermission() {

        this.url = "https://localhost:5001/api/device/permission";
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

    get_delete_alert(id:number){
        alert("permissionId" +id+"deleted")
    }

    async DeletePermissionById(id1:number) {
        let x = id1;
        let uri = "https://localhost:5001/api/device/permission/" + x;
        console.log(uri);
        let response = await fetch(uri,
            {
                method: 'DELETE',
            })
        console.log(this.data);
        this.get_delete_alert(x);
        this.getAllPermission();
        
    }

   




    dynamicGenerate() {
        let loop = 0;
        this.headerTag.innerHTML = "";
        this.headerTag1.innerHTML="";
        for (loop = 0; loop < this.data.length; loop++) {
            this.headerTag1.innerHTML += `


            <tr style="background-color:#FADA5E;">
            <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:10%;">
            <strong id="id${loop}"> ${this.data[loop]["id"]}</strong>
            </td>

            <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:10%;">
            <strong id="permissionName${loop}">${this.data[loop]["permissionName"]}</strong>
            </td>
           
           
             <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:5%;">
            <button id="id${loop}"  onclick="ab.DeletePermissionById(${this.data[loop]["id"]})">DELETE</button>
            </td>


            <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:5%;">
            <button class="btn btn-info" ><span class="glyphicon glyphicon-pencil" onclick="upp.update11(${this.data[loop]["id"]})">UPDATE</span></button>
            </td>
            
           

        
            </tr>
           `
        }


    }











}
var ab=new abc();
//-----------------------------------------------------------------------------------

class  updatePerm1{
    headerTag3=(document.getElementById("insert_perm") as HTMLInputElement);


    update11(id:number){
        console.log(id);
        this.update_perm(id);

    }
    update_perm(x:number){
        let y=x;
    ab.headerTag1.innerHTML="";
        console.log("hello");
        this.headerTag3.innerHTML+=`
    
        <input type="text" id="PermissionName11"  name="PermissionName11" value=""  style="margin-top:300px; style="margin-left:100px; ">
        <button   class="btn btn-danger" onclick="perm_update.updatePermission1(${y})" >SUBMIT</button>
        
        `
       
    }
       
}
var upp =new updatePerm1();





//--------------------------------------------------------------------------




class AddPermission{
    PermissionName:String
    data:any
    bindData()
    {
        this.PermissionName=  (document.getElementById("PermissionName") as HTMLInputElement).value;
        console.log(this.PermissionName);
        this.data={
            "PermissionName":this.PermissionName
        };
        console.log(this.data);
    }
    updatePermission(){
            console.log("hhh");
        this.bindData();
        this.postData();
    }
    postData()
        {
            console.log("lll");
        let url="https://localhost:5001/api/device/permission/insert";
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
var permission=new AddPermission();


//------------------------------------------------------------------------------------------------------
//-----------update permission--------------------------------------------------------------------------


class update_Permission{
    PermissionName1:String
    data:any

    
   

    bindData()
    {
        this.PermissionName1= (document.getElementById("PermissionName11") as HTMLInputElement).value;
        console.log(this.PermissionName1);
        this.data={
            "permission_name":this.PermissionName1
        };
        console.log(this.data);
    }
    updatePermission1(x:number){
            console.log(x);
            
        this.bindData();
        this.postData(x);
       
    }
    postData(x:number)
        {
            console.log("lll");
        let url="https://localhost:5001/api/device/permission/"+x;
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
             
    
        }
    }
var perm_update=new update_Permission();



const  temp1=new abc();
   temp1.getAllPermission();