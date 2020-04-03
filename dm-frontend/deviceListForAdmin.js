(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var DeviceListForAdmin = /** @class */ (function () {
        function DeviceListForAdmin(data) {
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
        DeviceListForAdmin.prototype.getDeviceList = function () {
            var value = "<tr>\n        <td class = \"cards\">" + this.type + " " + this.brand + " " + this.model + "\n                         <div class=\"mdl-card\">\n                                <div class=\"mdl-card__title\">\n                                   <h2 class=\"mdl-card__title-text\">Device Details</h2>\n                                </div>\n\n                                <div class=\"mdl-card__supporting-text\">\n                               Device color: " + this.color + " <br>\n                               Price:" + this.price + " <br>\n                               Warranty Year: " + this.warranty_year + "<br>\n                               Purchase Date: " + this.purchase_date + "\n                                </div> \n                               \n                         </div> \n                              </td>\n        <td>" + this.serial_number + " </td>\n        <td>" + this.status + " </td>\n        <td>RAM:" + this.ram + " Storage:" + this.storage + " <br>\n        Screen Size:" + this.screen_size + "Connectivity: " + this.connectivity + "</td>\n        <td>" + (this.assign_date).substring(0, 10) + " </td>\n        <td>" + (this.return_date).substring(0, 10) + " </td>\n        <td>" + this.assign_to_first_name + " " + this.assign_to_middle_name + " " + this.assign_to_last_name + "  </td>\n        <td>" + this.assign_by_first_name + " " + this.assign_by_middle_name + " " + this.assign_by_last_name + "  </td>\n        <td> <button class=\"edit-button\" value=" + this.device_id + ">Edit </button>\n        <button class=\"delete-button\" value=" + this.device_id + ">Delete </button>\n        </td>\n        </tr>";
            document.getElementById("Request_data").innerHTML += value;
        };
        return DeviceListForAdmin;
    }());
    exports.DeviceListForAdmin = DeviceListForAdmin;
});
