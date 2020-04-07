import { BASEURL } from '../globals';
import { UserModel } from "../UserModel";
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
		return fetch(BASEURL + "/api/user")
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
		return fetch(BASEURL + "/api/user/" + userId + "/" + jass + "")
			.then(res =>
				console.log(res.status))
			
			.catch(err => console.error(err));
	}
/////API TO DELETE
	deleteData(userId: number) {
		fetch(BASEURL + "/api/user/" + userId + "/remove", {
			method: "DELETE"
		});
	}
}
