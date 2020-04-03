var AddDevice = /** @class */ (function () {
    function AddDevice() {
    }
    AddDevice.prototype.brandDropdown = function () {
        fetch("https://localhost:5001/dm/Device/brand")
            .then(function (Response) { return Response.json(); })
            .then(function (data) {
            console.log(data);
            document.getElementById("brand").innerHTML = "";
            for (var i = 0; i < data.length; i++) {
                document.getElementById("brand").innerHTML += '<option value="' + data[i].device_brand_id + '">' + data[i].device_brand + '</option>';
            }
        })["catch"](function (err) { return console.log(err); });
    };
    AddDevice.prototype.typeDropdown = function () {
        fetch("https://localhost:5001/dm/Device/type")
            .then(function (Response) { return Response.json(); })
            .then(function (data) {
            document.getElementById("type").innerHTML = "";
            for (var i = 0; i < data.length; i++) {
                document.getElementById("type").innerHTML += '<option value="' + data[i].device_type_id + '">' + data[i].device_type + '</option>';
            }
        })["catch"](function (err) { return console.log(err); });
    };
    AddDevice.prototype.specificationDropdown = function () {
        fetch("https://localhost:5001/dm/Device/specification")
            .then(function (Response) { return Response.json(); })
            .then(function (data) {
            document.getElementById("specification").innerHTML = "";
            for (var i = 0; i < data.length; i++) {
                document.getElementById("specification").innerHTML += '<option value="' + data[i].specification_id + '">'
                    + "RAM: " + data[i].ram + " Storage: " + data[i].storage + " Screen Size: " + data[i].screen_size + " Connectivity: " + data[i].connectivity +
                    '</option>';
            }
        })["catch"](function (err) { return console.log(err); });
    };
    AddDevice.prototype.Create_device = function () {
        var data = this.addDataFromForm();
        fetch("https://localhost:5001/dm/Device/add", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: data
        })["catch"](function (Error) { return console.log(Error); });
    };
    // async getDataToForm() {
    //     let data :any 
    //     const urlParams = new URLSearchParams(window.location.search);
    //     const myParam = urlParams.get("device_id");
    //     console.log("device_id" + myParam);
    //     const obj = new AddDevice();
    //    let res = await  fetch(
    //               "https://localhost:5001/dm/Device/device_id/" + myParam )
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
    AddDevice.prototype.update_device = function (device_id) {
        var data = this.addDataFromForm();
        console.log(data);
        fetch("https://localhost:5001/dm/Device/update/" + device_id, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: data
        })["catch"](function (Error) { return console.log(Error); });
    };
    AddDevice.prototype.addDataFromForm = function () {
        this.device_type_id = +(document.getElementById("type").value);
        this.device_brand_id = +(document.getElementById("brand").value);
        this.status_id = 4;
        this.model = document.getElementById("model").value;
        this.color = document.getElementById("color").value;
        this.price = document.getElementById("price").value;
        this.serial_number = document.getElementById("serial_number").value;
        this.warranty_year = document.getElementById("warranty_year").value;
        this.purchase_date = document.getElementById("purchase_date").value;
        this.specification_id = +(document.getElementById("specification").value);
        this.entry_date = document.getElementById("entry_date").value;
        return JSON.stringify(this);
    };
    AddDevice.prototype.addnew = function (id) {
        var txtNewInputBox = document.createElement('div');
        txtNewInputBox.innerHTML = "<input type='text' id='newInputBox'>" + "  " +
            "<input type='button' id='newbutton' value = 'Submit' > ";
        document.getElementById(id).appendChild(txtNewInputBox);
    };
    return AddDevice;
}());
document.querySelector('#addtype').addEventListener('click', function (e) {
    var temp = new AddDevice();
    temp.addnew("newtype");
});
document.querySelector('#addbrand').addEventListener('click', function (e) {
    var temp = new AddDevice();
    temp.addnew("newbrand");
});
document.querySelector('#submit').addEventListener('click', function (e) {
    var urlParams = new URLSearchParams(window.location.search);
    var myParam = urlParams.get("device_id");
    console.log(myParam);
    e.preventDefault();
    var temp = new AddDevice();
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
var temp = new AddDevice();
temp.brandDropdown();
temp.typeDropdown();
temp.specificationDropdown();
// temp.getDataToForm();
