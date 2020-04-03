export class RequestModel {
    requestId: number;
    userId: number;
    deviceModel: string;
    deviceBrand: string;
    deviceType: string;
    specs: SpecificationModel;
    requestedBy: PartialUserModel;
    requestDate: string;
    noOfDays: number
    comment: string;
    availability: boolean;


}

export class SpecificationModel {
    RAM: string
    Storage: string
    ScreenSize: string
    Connectivity: string;
}

export class PartialUserModel {
    salutation: string;
    firstName: string;
    middleName: string;
    lastName: string;
    departmentName: string;
    designationName: string;
    email: string;
    dob: string;
    gender: string;
    doj: string;
}