class AddDevice {
    device_type_id: number;
    device_brand_id: number;
    status_id: number;
    model: string;
    color: string;
    price: string;
    serial_number: string;
    warranty_year: string;
    purchase_date: string;
    specification_id: number;
    entry_date: string;

    brandDropdown() {
        fetch(
            "http://localhost:5000/dm/Device/brand"
        )
            .then(Response => Response.json())
            .then(data => {
                console.log(data);
                document.getElementById("brand").innerHTML = "";
                for (let i = 0; i < data.length; i++) {

                    document.getElementById("brand").innerHTML += '<option value="' + data[i].device_brand_id + '">' + data[i].device_brand + '</option>';

                }
            })
            .catch(err => console.log(err));

    }
    typeDropdown() {
        fetch(
            "http://localhost:5000/dm/Device/type"
        )
            .then(Response => Response.json())
            .then(data => {

                document.getElementById("type").innerHTML = "";
                for (let i = 0; i < data.length; i++) {

                    document.getElementById("type").innerHTML += '<option value="' + data[i].device_type_id + '">' + data[i].device_type + '</option>';

                }
            })
            .catch(err => console.log(err));

    }
    specificationDropdown() {
        fetch(
            "http://localhost:5000/dm/Device/specification"
        )
            .then(Response => Response.json())
            .then(data => {

                document.getElementById("specification").innerHTML = "";
                for (let i = 0; i < data.length; i++) {

                    document.getElementById("specification").innerHTML += '<option value="' + data[i].specification_id + '">'
                        + "RAM: " + data[i].ram + " Storage: " + data[i].storage + " Screen Size: " + data[i].screen_size + " Connectivity: " + data[i].connectivity +
                        '</option>';

                }
            })
            .catch(err => console.log(err));

    }

    Create_device() {
        var data = this.addDataFromForm();

        fetch("http://localhost:5000/dm/Device/add", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: data,
        }).catch(Error => console.log(Error));

    }
    // async getDataToForm() {
    //     let data :any 
    //     const urlParams = new URLSearchParams(window.location.search);
    //     const myParam = urlParams.get("device_id");
    //     console.log("device_id" + myParam);
    //     const obj = new AddDevice();
        
    //    let res = await  fetch(
    //               "http://localhost:5000/dm/Device/device_id/" + myParam )
    //         data = await res.json();
    //         console.log(data);
            
    //         //       .then(Response => Response.json())
    //         // .then(data => {

    //         //     console.log("update" + data);
    //             this.populateDataToForm(data);
    //             // this.update_device(data.device_id);
    //         // })
    //         // .catch(err => console.log(err));
    //         // console.log("test");
    //         return null ;
    // }
    // populateDataToForm(data: any) {
    //     console.log(data.model);
    //     //   (document.getElementById("brand")as HTMLInputElement).innerHTML = data.device_brand_id; 
    //     //       (document.getElementById("type")as HTMLInputElement).innerHTML  = data.device_type_id ;
    //     this.status_id = data.status_id;
    //     (document.getElementById("model") as HTMLInputElement).innerHTML = data.model;
    //     (document.getElementById("color") as HTMLInputElement).innerHTML = data.color;
    //     (document.getElementById("price") as HTMLInputElement).innerHTML = data.price;
    //     (document.getElementById("serial_number") as HTMLInputElement).innerHTML = data.serial_number;
    //     (document.getElementById("warranty_year") as HTMLInputElement).innerHTML = data.warranty_year;
    //     (document.getElementById("purchase_date") as HTMLInputElement).innerHTML = data.purchase_date;
    //     //       (document.getElementById("specification")as HTMLInputElement).innerHTML = data.specification_id ;
    //     (document.getElementById("entry_date") as HTMLInputElement).innerHTML = data.entry_date;
    // }
    update_device(device_id: any) {
        var data = this.addDataFromForm();
        console.log(data);
        fetch("http://localhost:5000/dm/Device/update/" + device_id, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: data,
        }).catch(Error => console.log(Error));

    }
    addDataFromForm() {
        this.device_type_id = +((document.getElementById("type") as HTMLInputElement).value);
        this.device_brand_id = +((document.getElementById("brand") as HTMLInputElement).value);
        this.status_id = 4;
        this.model = (document.getElementById("model") as HTMLInputElement).value;
        this.color = (document.getElementById("color") as HTMLInputElement).value;
        this.price = (document.getElementById("price") as HTMLInputElement).value;
        this.serial_number = (document.getElementById("serial_number") as HTMLInputElement).value;
        this.warranty_year = (document.getElementById("warranty_year") as HTMLInputElement).value;
        this.purchase_date = (document.getElementById("purchase_date") as HTMLInputElement).value;
        this.specification_id = +((document.getElementById("specification") as HTMLInputElement).value);
        this.entry_date = (document.getElementById("entry_date") as HTMLInputElement).value;
        return JSON.stringify(this);
    }
    addnew(id:any) {
        var txtNewInputBox = document.createElement('div');
        txtNewInputBox.innerHTML = "<input type='text' id='newInputBox'>" + "  " +
            "<input type='button' id='newbutton' value = 'Submit' > ";
        document.getElementById(id).appendChild(txtNewInputBox);

    }
}

document.querySelector('#addtype').addEventListener('click', function (e) {
    const temp = new AddDevice();
    temp.addnew("newtype");
});

document.querySelector('#addbrand').addEventListener('click', function (e) {
    const temp = new AddDevice();
    temp.addnew("newbrand");
});

document.querySelector('#submit').addEventListener('click', function (e) {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get("device_id");
    console.log(myParam);
    e.preventDefault();
    const temp = new AddDevice();
    if (myParam) {
        temp.update_device(myParam);
        console.log("updated Successfully");
        alert("Device Updated");
        window.location.href = "./deviceListForadmin.html";
    }
    else {
        temp.Create_device();
        console.log("added Successfully");
        alert("Device Added");
        window.location.href = "./deviceListForadmin.html";
    }


});
const temp = new AddDevice();
temp.brandDropdown();
temp.typeDropdown();
temp.specificationDropdown();

// temp.getDataToForm();