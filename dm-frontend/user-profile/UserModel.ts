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

			this.salutation = data.Salutation;
			this.firstName = data.FirstName;
			this.middleName = data.MiddleName;
			this.lastName = data.LastName;
			this.departmentName = data.DepartmentName;
			this.designationName = data.DesignationName;
			this.dob = data.DOB;
			this.doj = data.DOJ;
			this.email = data.Email;
			this.roleName = data.Role_Name;
			this.gender = data.Gender;
			this.status = data.Status;
		}
	}

}
export class phones {
	contactNumberType: string;
	number: string;
	countryCode: string;
	areaCode: string;
	constructor(phoneObject: any) {
		this.contactNumberType = phoneObject.ContactNumberType;
		this.number = phoneObject.Number;
		this.countryCode = phoneObject.CountryCode;
		this.areaCode = phoneObject.AreaCode;
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
		this.addressType = addressObject.AddressType;
		this.addressLine1 = addressObject.AddressLine1;
		this.addressLine2 = addressObject.AddressLine2;
		this.city = addressObject.City;
		this.state = addressObject.State;
		this.country = addressObject.Country;
		this.pin = addressObject.PIN;
	}
}
