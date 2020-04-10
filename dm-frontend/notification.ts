export class Notifications {
    device_id: number;
    type: string;
    brand: string;
    model: string;
    ram: string;
    storage: string;
    screen_size: string;
    connectivity: string;
    notificationDate:string;
    status:string;
    message:string;
    constructor(data: any) {
        this.device_id = data.device_id;
        this.type = data.deviceType;
        this.brand = data.deviceBrand;
        this.model = data.deviceModel;
        this.ram = data.specs.ram;
        this.storage = data.specs.storage;
        this.screen_size = data.specs.screenSize;
        this.connectivity = data.specs.connectivity;
        this.notificationDate = data.notificationDate;
        this.status = data.status;
        this.message = data.message;

    }
    getNotificationTable() {
        const value = `
           
        <tr>
            <td>${this.type} ${this.brand} ${this.model}</td>
            <td>RAM:${this.ram} Storage:${this.storage}
                 <br>
                 Screen Size:${this.screen_size} Connectivity: ${this.connectivity}
            </td>
            <td>${this.notificationDate}</td>
            <td>${this.status}</td>
              <td>${this.message}</td>
             <td>
               <button class="accept-button" value=${this.device_id}>Accept </button>
                <button class="reject-button" value=${this.device_id}>Reject </button>
            </td>
        </tr>`;
        (document.getElementById("notification_data") as HTMLStyleElement).innerHTML += value;

    }

}