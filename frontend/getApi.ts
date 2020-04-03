
import { UserModel } from "./UserModel";



export class GetUserApi 
{
	array: any = [];
/////API TO SORT
	getSort(uri : string) {
		return fetch(uri)
			.then(Response => {
				return Response.json();
			})
			.then(data => {
				return data.map(obj => new UserModel(obj));
			});
			}
/////API GET		
	getRequest() {
		return fetch("https://localhost:5002/api/user")
			.then(Response => {
				return Response.json();
			})
			.then(data => {
				console.log(data);
				data.forEach((userObject: any) => {
					this.array.push(new UserModel(userObject));  
				});
				console.log('Array', this.array);
				
			})
			.catch(err => console.log(err));
	}
	////API TO MAKE ACTIVE INACTIVE
	userInactive(userId: number,jass : string) {
		return fetch("https://localhost:5002/api/user/" + userId + "/" + jass + "")
			.then(res =>
				console.log(res.status))
			
			.catch(err => console.error(err));
	}
/////API TO DELETE
	deleteData(userId: number) {
		fetch("https://localhost:5002/api/user/" + userId + "/remove", {
			method: "DELETE"
		});
	}
}
