export class update {
	headerTag = document.getElementById("output") as HTMLInputElement;

	dynamicGenerate() {
		let loop = 0;
		this.headerTag.innerHTML = "";
		{   
			this.headerTag.innerHTML += `
            <form>
                <input type='text' id="role" name="role" value="">
            </form>
            `;
		}
	}
}
var u = new update();

/*
class UpdateRole{
    roleName:String
    data:any
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
var role=new UpdateRole();
*/
