export class UserModel {
	salutation: string = "";
	firstName: string = "";
	middleName: string | null = null;
	lastName: string = "";
	departmentName: string = "";
	designationName: string = "";
	email: string = "";
	password: string = "";
	dob: string = "";
	gender: string = "";
	roleName: string = "";
	status: string = "";
	doj: string = "";

	phones: phones[];
	addresses: addresses[];


	constructor(data: any | null = null) {
		this.addresses = new Array<addresses>();
		this.phones = new Array<phones>();
		if (data) {

			for (const phoneObject of data.phones) {
				this.phones.push(new phones(phoneObject));
			}
			for (const addressObject of data.addresses) {
				this.addresses.push(new addresses(addressObject));
			}

			this.salutation = data.salutation;
			this.firstName = data.firstName;
			this.middleName = data.middleName;
			this.lastName = data.lastName;
			this.departmentName = data.departmentName;
			this.designationName = data.designationName;
			this.dob = data.dob;
			this.doj = data.doj;
			this.email = data.email;
			this.roleName = data.role_Name;
			this.gender = data.gender;
			this.status = data.status;
		}
	}

}
export class phones {
	contactNumberType: string;
	number: string;
	countryCode: string;
	areaCode: string;
	constructor(phoneObject: any) {
		this.contactNumberType = phoneObject.contactNumberType;
		this.number = phoneObject.number;
		this.countryCode = phoneObject.countryCode;
		this.areaCode = phoneObject.areaCode;
	}
}
export class addresses {
	addressType: string;
	addressLine1: string;
	addressLine2: string;
	city: string;
	state: string;
	country: string;
	pin: string;
	constructor(addressObject: any) {
		this.addressType = addressObject.addressType;
		this.addressLine1 = addressObject.addressLine1;
		this.addressLine2 = addressObject.addressLine2;
		this.city = addressObject.city;
		this.state = addressObject.state;
		this.country = addressObject.country;
		this.pin = addressObject.pin;
	}
}