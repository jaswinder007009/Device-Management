import { BASEURL } from "../globals";
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

        this.url = BASEURL + "/api/device/permission";
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
        let uri = BASEURL + "/api/device/permission/" + x;
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
            <button data-id="del_perm"  value="${this.data[loop]["id"]}">DELETE</button>
            </td>

            <td style="color: darkslategray; font-style: italic;font-family: cursive; font-weight: bolder;width:5%;">
            <button  class="perm_up_date" value="${this.data[loop]["id"]}"  >UPDATE</button>
            </td>
            
           

        
            </tr>
           `
        }


    }











}
var ab=new abc();

document.body.addEventListener('click',function(event)
    {
        //e.preventDefault();
        if(event.target.dataset.id == "del_perm"){
            console.log("iiiiiiiii");
            ab.DeletePermissionById(event.target.value)
           
        }
    }
    )



    //-----------------------------------------------------------------


   
//-----------------------------------------------------------------------------------

class  updatePerm1{
    headerTag3=(document.getElementById("insert_perm") as HTMLInputElement);


    update11(id:number){
        console.log(id);
        this.update_perm(id);

    }
    update_perm(x:number){
        let y=x;
        console.log(x);
    ab.headerTag1.innerHTML="";
    this.headerTag3.innerHTML="";
        console.log("hello");
        this.headerTag3.innerHTML+=`
    
        <input type="text" id="PermissionName11"  name="PermissionName11" value=""  style="margin-top:300px; style="margin-left:100px; ">
        <button    class="add_ppp"  value="${y}" >SUBMIT</button>
        
        `
       
    }
       
}
var upp =new updatePerm1();
////////////////////////////////////////////////////////


document.addEventListener('click' ,e=>{

        if( (e.target as HTMLButtonElement).className ==="perm_up_date")
        {
            console.log("sdfghjkl");
            console.log(event.target.value);
            upp.update_perm(event.target.value);
           // 
           
        }
       
    }
    );


////////////////////////////////////////////////////
// document.body.addEventListener('click',function(e){
// if(event.target.dataset.id=="add_ppp"){
//     console.log("jj");
//     perm_update.updatePermission1(event.target.value);
// }
// });



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
        let url=BASEURL + "/api/device/permission/insert";
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
document.querySelector("#btn_insert1").addEventListener('click',function(e){
    permission.updatePermission();
})

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
        let url=BASEURL + "/api/device/permission/"+x;
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

//------------------------------------------------------------------------------------------
document.addEventListener('click' ,e=>{

        if( (e.target as HTMLButtonElement).className ==="add_ppp")
        {
            console.log("sdfghjkl");
            
           console.log(event.target.value)
            perm_update.updatePermission1(event.target.value);
           
           
        }
       
    }
    );

    //----------------------------------------------------------------------

const  temp1=new abc();
   temp1.getAllPermission();