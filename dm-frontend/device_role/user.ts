import { BASEURL } from "../globals";
(async function(){
    const token:string=JSON.parse(sessionStorage.getItem("user_info"))["token"];
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
            
            this.size = data.length;
            this.dynamicGenerate();
            return data;

        }

        async getApiCall(URL: any) {


            let response = await fetch(URL,{
                headers: new Headers({"Authorization": `Bearer ${token}`})
            });
            let data = await (response.json());
        //  
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
            if((event.target as HTMLButtonElement).dataset.id == "see_roles"){
                
                var e4=parseInt((event.target as HTMLButtonElement).value);
                
                u_role.getAllUserRole(e4);
            }
        }
        )



        document.body.addEventListener('click',function(event)
        {
            //e.preventDefault();
            if((event.target as HTMLButtonElement).dataset.id == "assign_role"){
                
                var e5=parseInt((event.target as HTMLButtonElement).value);
                
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
            
            this.size = data.length;
            this.UserRoleInfo(x);
            return data;

        }

        async getApiRoleCall(URL: any) {


            let response = await fetch(URL,{
                headers: new Headers({"Authorization": `Bearer ${token}`})
            });
            let data = await (response.json());
        //  
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
            
            let response = await fetch(uri,
                {
                    method: 'DELETE',
                    headers: new Headers({"Authorization": `Bearer ${token}`})
                })
            
            this.del_role_by_user(id1);
        //    u_role.getAllUserRole(id);
            
        }
    }
    var u_role=new user_role();

    document.addEventListener('click' ,e=>{

            if( (e.target as HTMLButtonElement).className ==="del_user_role1")
            {
                
                
                u_role.DeleteRoleByUser(parseInt((e.target as HTMLButtonElement).dataset.userId),parseInt((e.target as HTMLButtonElement).value));
            //    check1.updateRolePermission(event.target.dataset.roleId,event.target.value);
            // 
            
            }
        
        }
        );

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
            
            

            this.url =  BASEURL + "/api/device/assign_role_to_user/"+x;
            let data = await this.getApiRoleAssign(this.url);
            this.data = await data;
            
            this.size = data.length;
            this.assignRoleUser(x);
            return data;

        }

        async getApiRoleAssign(URL: any) {


            let response = await fetch(URL,{headers: new Headers({"Authorization": `Bearer ${token}`})});
            let data = await (response.json());
        //  
            return (await data);
        }

        
    




        assignRoleUser(id:number) {
            let x=id;
            

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

    class checkbox1{
    userId:number;
    roleId:number;
        data:any

    

        bindData(id:number,id1:number)
    {
                this.userId=id;
        this.roleId=id1;
        
            this.data={
                "userId":Number(id),
                "roleId":Number(this.roleId)
            };
        }
        
    updateRolePermission(x:number,y:number){

            this.bindData(x,y);
            this.postData(x);
        }
        postData(id:number)
            {
                
            let url= BASEURL + "/api/device/role_user/insert";
            
                fetch( url , {
                    method : "POST" , 
                
                    headers : {
                        "content-Type" : "application/json" , 
                        "Authorization": `Bearer ${token}`
                    },
                    body : JSON.stringify(this.data),
                
                }).then(response => {
                    
                    if (!response.ok) {
                    throw new Error(response.statusText)
                    
                        }
                        ass_role.add_role(id);
                    ass_role.assignRole(id);
                
                });
        
            }
        }
    var check1=new checkbox1();
    document.addEventListener('click' ,e=>{

            if( (e.target as HTMLButtonElement).className ==="add_r")
            {   
            check1.updateRolePermission(parseInt((e.target as HTMLButtonElement).dataset.userId), parseInt((e.target as HTMLButtonElement).value)); 
            }
        
        }
        );
    const  temp2=new user();
    temp2.getAllUser();
})();