export class DeviceListForUsers {
    device_id: number;
    type: string;
    brand: string;
    model: string;
    status: string;

    
    ram: string;
    storage: string;
    screen_size: string;
    connectivity: string;

    assign_date: string;
    return_date: string;

    assign_to_first_name: string;
    assign_to_middle_name: string;
    assign_to_last_name: string;

    assign_by_first_name: string;
    assign_by_middle_name: string;
    assign_by_last_name: string;
    constructor(data: any) {
        this.device_id = data.device_id;
        this.type = data.type;
        this.brand = data.brand;
        this.model = data.model;
        this.status = data.status;
        this. ram= data.specifications.ram;
        this.storage = data.specifications.storage;
        this.screen_size = data.specifications.screen_size;
        this.connectivity = data.specifications.connectivity;
        this.assign_date = data.assign_date;
        this.return_date = data.return_date;
        this.assign_to_first_name = data.assign_to.first_name;
        this.assign_to_middle_name = data.assign_to.middle_name;
        this.assign_to_last_name = data.assign_to.last_name;
        this.assign_by_first_name = data.assign_by.first_name;
        this.assign_by_middle_name = data.assign_by.middle_name;
        this.assign_by_last_name = data.assign_by.last_name;
       





    }
    getDeviceList()
    {
        const value = `<tr>
        <td>${this.type} ${this.brand} ${this.model}</td>
        <td>${this.status} </td>
        <td>RAM:${this.ram} Storage:${this.storage} Screen Size:${this.screen_size}Connectivity: ${this.connectivity}</td>
        <td>${(this.assign_date).substring(0,10)} </td>
        <td>${ (this.return_date).substring(0,10)} </td>
        <td>${ this.assign_to_first_name} ${ this.assign_to_middle_name} ${ this.assign_to_last_name}  </td>
        <td>${ this.assign_by_first_name} ${ this.assign_by_middle_name} ${ this.assign_by_last_name}  </td>
        </tr>`;
        
        document.getElementById("Request_data").innerHTML += value

    }
}