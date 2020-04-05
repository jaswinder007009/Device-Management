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
    Object.defineProperty(exports, "__esModule", { value: true });
    var UserModel = /** @class */ (function () {
        function UserModel(data) {
            if (data === void 0) { data = null; }
            this.salutation = "";
            this.firstName = "";
            this.middleName = null;
            this.lastName = "";
            this.departmentName = "";
            this.designationName = "";
            this.email = "";
            this.password = "";
            this.userId = 0;
            this.dob = "";
            this.gender = "";
            this.roleName = "";
            this.status = "";
            this.doj = "";
            this.salutation = data.salutation;
            this.firstName = data.firstName;
            this.middleName = data.middleName;
            this.lastName = data.lastName;
            this.departmentName = data.departmentName;
            this.designationName = data.designationName;
            this.email = data.email;
            this.roleName = data.roleName;
            this.userId = data.userId;
            this.password = data.password;
            this.dob = data.dob;
            this.gender = data.gender;
            this.doj = data.doj;
            this.status = data.status;
            this.addresses = new Array();
            this.phones = new Array();
            for (var _i = 0, _a = data.phones; _i < _a.length; _i++) {
                var phoneObject = _a[_i];
                this.phones.push(new phones(phoneObject));
            }
            for (var _b = 0, _c = data.addresses; _b < _c.length; _b++) {
                var addressObject = _c[_b];
                this.addresses.push(new addresses(addressObject));
            }
        }
        UserModel.prototype.getName = function () {
            return this.salutation + " " + this.firstName + " " + this.middleName + " " + this.lastName;
        };
        UserModel.prototype.getAddress = function () {
            return this.addresses[0].addressLine1 + " ," + this.addresses[0].addressLine1 + "," +
                this.addresses[0].city + " ," + this.addresses[0].state + " ," + this.addresses[0].country + " ," + this.addresses[0].pin;
        };
        UserModel.prototype.getDate = function (dateString) {
            var _a = this[dateString].split("-").map(Number), year = _a[0], month = _a[1], day = _a[2];
            return new Date(year, month - 1, day);
        };
        UserModel.prototype.GenerateTableRow = function () {
            var status = this.status == "Active" ? "checked" : "";
            return "<tr>\n\t\t\t\t\t<td>" + this.getName() + "</td>\n\t\t\t\t\t<td>" + this.email + " </td>\n\t\t\t\t\t<td>" + this.roleName + "</td>\n\t\t\t\t\t<td>" + this.status + " </td>\n\t\t\t\t\t<td>" + this.phones[0].number + " </td>\n\t\t\t\t\t<td>\n\t\t\t\t\t\t<label class=\"switch\">\n\t\t\t\t\t\t\t<input type=\"checkbox\" id=\"" + this.userId + "\" class=\"userCheckStatus\" " + status + ">\n\t\t\t\t\t\t\t<span class=\"slider round\"></span>\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</td>\n\t\t\t\t\t<td><input class=\"edit\" type=\"button\" id=\"" + this.userId + "\" class=\"userEditData\" value=\"Edit\" /></td>\n\t\t\t\t\t<td><input  type=\"button\" data-id=\"" + this.userId + "\" class=\"userDeleteData\" value=\"Delete\" /></td>\n\t\t        </tr>";
        };
        return UserModel;
    }());
    exports.UserModel = UserModel;
    var phones = /** @class */ (function () {
        function phones(phoneObject) {
            this.contactNumberType = phoneObject.contactNumberType;
            this.number = phoneObject.number;
            this.countryCode = phoneObject.countryCode;
            this.areaCode = phoneObject.areaCode;
        }
        return phones;
    }());
    exports.phones = phones;
    var addresses = /** @class */ (function () {
        function addresses(addressObject) {
            this.addressType = addressObject.addressType;
            this.addressLine1 = addressObject.addressLine1;
            this.addressLine2 = addressObject.addressLine2;
            this.city = addressObject.city;
            this.state = addressObject.state;
            this.country = addressObject.country;
            this.pin = addressObject.pin;
        }
        return addresses;
    }());
    exports.addresses = addresses;
});
