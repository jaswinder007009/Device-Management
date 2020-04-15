export class DeviceListForAdmin {
token :string="";
    device_id: number;
        type: string;
        brand: string;
        model: string;
        color: string;
        price: string;
        serial_number: string;
        warranty_year: string;
        purchase_date: string;
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
        constructor(data: any,token:string) {
            this.token =token;
            this.device_id = data.device_id;
            this.type = data.type;
            this.brand = data.brand;
            this.model = data.model;
            this.color = data.color;
            this.price = data.price;
            this.serial_number = data.serial_number;
            this.warranty_year = data.warranty_year;
            this.purchase_date = data.purchase_date;
            this.status = data.status;
            this.ram = data.specifications.ram;
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
        getDeviceList(token: number) {
            const value = `
            
            <tr>
                <td class = "cards">${this.type} ${this.brand} ${this.model}
                    <div class="mdl-card">
                        <div class="mdl-card__title">
                            <h2 class="mdl-card__title-text">Device Details</h2>
                        </div>

                        <div class="mdl-card__supporting-text">
                            Device color: ${this.color} <br>
                            Price:${this.price} <br>
                            Warranty Year: ${this.warranty_year}<br>
                            Purchase Date: ${this.purchase_date}
                        </div> 
                    </div> 
                </td>
                <td>${this.serial_number} </td>
                <td>RAM:${this.ram} Storage:${this.storage}
                    <br>
                    Screen Size:${this.screen_size} Connectivity: ${this.connectivity}
                </td>
                <td>${this.assign_date.substring(0,10)} </td>
                <td>${this.return_date.substring(0,10)} </td>
                <td>${this.assign_to_first_name} ${this.assign_to_middle_name} ${this.assign_to_last_name}</td>
                <td>${this.assign_by_first_name} ${this.assign_by_middle_name} ${this.assign_by_last_name}</td>
                `;

                if(token==1){


                const buttons =  `<button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" id="">
                        <a href = "./AddDevice.html" style="color: black;">
                            Add Device</a>
                        </button>`;
                        (document.getElementById("buttons") as HTMLStyleElement).innerHTML = buttons;    
                    const editbutton = `<td>
                            <button class="edit-button" value=${this.device_id}>Edit </button>
                            <button class="delete-button" value=${this.device_id}>Delete </button>
                            </td>`;
                        if(this.status=="Allocated")
                        var val = `<td>  <button class="notify-button" data-devicemodel=${this.model} 
                                    data-devicetype= ${this.type} data-devicebrand= ${this.brand} 
                                    data-ram= ${this.ram}
                                    data-connectivity= ${this.connectivity}
                                    data-screensize= ${this.screen_size}
                                    data-storage= ${this.storage}
                                    >Notify</button></td> </tr>`;
                        else 
                            val = `<td>  <button class="assign-button" data-id=${this.device_id}>Assign Device</button></td> </tr> `;
                            (document.getElementById("Request_data") as HTMLStyleElement).innerHTML += value +editbutton+ val;
                    }
            else
            {
                    (document.getElementById("Request_data") as HTMLStyleElement).innerHTML += value;
            }

        }
        
    }
