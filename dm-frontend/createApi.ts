import { UserModel } from "./UserModel";
import { BASEURL } from "./globals";

export class CreateUserApi {
	createUserData(data: UserModel) {
		console.log(data);
		return fetch(BASEURL + "/api/user/add", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data)
		}).catch(Error => console.log(Error));
	}
}
