(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./RequetsDatamodel"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var RequetsDatamodel_1 = require("./RequetsDatamodel");
    var PopulateData = /** @class */ (function () {
        function PopulateData() {
        }
        PopulateData.prototype.fillData = function (data) {
            this.clearData();
            // var pages = new GeneratePaging();
            // pages.generatePage(data["resultCount"]);
            console.log(data["resultCount"]);
            var value;
            this.historyInformation = new RequetsDatamodel_1.RequestModel();
            for (var _i = 0, _a = data["results"]; _i < _a.length; _i++) {
                value = _a[_i];
                this.historyInformation.email = value["userMail"];
                console.log(this.historyInformation.email);
                this.historyInformation.deviceId = value["deviceId"];
                this.historyInformation.serialNumber = value["serial_number"];
                this.historyInformation.deviceName = value["deviceBrand"] + " " + value["deviceModel"];
                this.historyInformation.deviceType = value["deviceType"];
                this.historyInformation.requestStatus = value["requestStatus"];
                this.bindSpecs(value);
                this.historyInformation.userName = this.userName(value, "requestedUser");
                this.historyInformation.adminName = this.userName(value, "deviceSubmittedAdmin");
                this.historyInformation.requestDate = value["requestDate"];
                this.historyInformation.assignDate = value["assignedDate"];
                this.historyInformation.assignDays = value["assignDays"] == -1 ? 0 : value["assignDays"];
                this.historyInformation.returnDate = value["returnDate"];
                this.genearteFields(this.historyInformation);
            }
        };
        PopulateData.prototype.bindSpecs = function (value) {
            this.historyInformation.specifications = (value["specs"]["ram"] == "" ? "" : "RAM = " + value["specs"]["ram"] + ",") +
                (value["specs"]["storage"] == "" ? "" : "Storage =  " + value["specs"]["storage"] + ",") +
                (value["specs"]["screenSize"] == "" ? "" : " Screen-Size = " + value["specs"]["screenSize"] + ",") +
                (value["specs"]["connectivity"] == "" ? "" : " connectivity =  " + value["specs"]["connectivity"]);
        };
        PopulateData.prototype.userName = function (value, type) {
            return (value[type]["salutation"] + " " + value[type]["firstName"] + " "
                + value[type]["middleName"] + " " + value[type]["lastname"]);
        };
        PopulateData.prototype.genearteFields = function (historyInformation) {
            var value = "<tr>\n        <td class=\"requestedUserData\"> " + historyInformation.userName + "\n        <span class=\"tooltipData\">E-mail = " + historyInformation.email + "</spam>\n        </td>\n        \n        <td>" + historyInformation.serialNumber + " </td>\n        <td>" + historyInformation.deviceType + "</td>\n        <td class=\"requestedUserData\"> " + historyInformation.deviceName + "\n        <span class=\"tooltipData\">Device Specs " + historyInformation.specifications + " </spam>\n         </td>\n        \n        <td class=\"requestedUserData\">" + historyInformation.requestStatus + " \n        <span class=\"tooltipData\">Assigned for " + historyInformation.assignDays + " days</spam>\n        </td>\n        <td>" + historyInformation.assignDate + " </td>\n        <td>" + historyInformation.returnDate + " </td>\n        <td>" + historyInformation.adminName + " </td>\n        </tr>";
            this.newMethod(value);
        };
        PopulateData.prototype.newMethod = function (value) {
            document.getElementById("Request_data").innerHTML += value;
        };
        PopulateData.prototype.clearData = function () {
            document.getElementById("Request_data").innerHTML = "";
        };
        return PopulateData;
    }());
    exports.PopulateData = PopulateData;
});
