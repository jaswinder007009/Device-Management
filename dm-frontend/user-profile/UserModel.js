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
            this.dob = "";
            this.gender = "";
            this.roleName = "";
            this.status = "";
            this.doj = "";
            this.addresses = new Array();
            this.phones = new Array();
            if (data) {
                for (var _i = 0, _a = data.phones; _i < _a.length; _i++) {
                    var phoneObject = _a[_i];
                    this.phones.push(new phones(phoneObject));
                }
                for (var _b = 0, _c = data.addresses; _b < _c.length; _b++) {
                    var addressObject = _c[_b];
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
        return UserModel;
    }());
    exports.UserModel = UserModel;
    var phones = /** @class */ (function () {
        function phones(phoneObject) {
            this.contactNumberType = phoneObject.ContactNumberType;
            this.number = phoneObject.Number;
            this.countryCode = phoneObject.CountryCode;
            this.areaCode = phoneObject.AreaCode;
        }
        return phones;
    }());
    exports.phones = phones;
    var addresses = /** @class */ (function () {
        function addresses(addressObject) {
            this.addressType = addressObject.AddressType;
            this.addressLine1 = addressObject.AddressLine1;
            this.addressLine2 = addressObject.AddressLine2;
            this.city = addressObject.City;
            this.state = addressObject.State;
            this.country = addressObject.Country;
            this.pin = addressObject.PIN;
        }
        return addresses;
    }());
    exports.addresses = addresses;
});
