import { UserModel } from "./UserModel";
import { BASEURL } from "./globals";

export class UpdateUserApi 
{
	token : string ="";
	constructor(token:string){
		this.token=token;
	}
	updateUserData(data: UserModel) 
	{
		console.log(data.userId);
		return fetch(BASEURL + "/api/user/" + data["userId"] + "/update", {
			method: "PUT",
			headers: new Headers([["Content-Type","application/json"],["Authorization", `Bearer ${this.token}`]]),
			body: JSON.stringify(data)
		});
	}
}