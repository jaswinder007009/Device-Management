import { UserModel } from "./UserModel";
import { BASEURL } from "./globals";

export class UpdateUserApi 
{
	updateUserData(data: UserModel) 
	{
		console.log(data.userId);
		fetch(BASEURL + "/api/user/" + data["userId"] + "/update", {
			method: "PUT",
			headers: new Headers({ "content-type": "application/json" }),
			body: JSON.stringify(data)
		});
	}
}