var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./UserModel"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var models = __importStar(require("./UserModel"));
    function createObjectFromForm(formElement) {
        var modelObject = new models.UserModel();
        modelObject.salutation = formElement["salutation"].value;
        modelObject.firstName = formElement["firstName"].value;
        modelObject.middleName = formElement["middleName"].value || null;
        modelObject.lastName = formElement["lastName"].value;
        modelObject.departmentName = formElement["department"].value;
        modelObject.designationName = formElement["designation"].value;
        modelObject.email = formElement["email"].value;
        //modelObject.altEmail =(formElement["altEmail"] as HTMLInputElement).value || null;
        //modelObject.userName = (formElement["userName"] as HTMLInputElement).value;
        modelObject.password = formElement["password"].value;
        modelObject.dob = formElement["dob"].value;
        modelObject.gender = formElement["gender"].value;
        modelObject.status = formElement["status"].value;
        modelObject.roleName = formElement["roleName"].value;
        modelObject.doj = formElement["doj"].value;
        for (var i = 1; i <= 3; i++) {
            var container = formElement.querySelector("#phones" + i);
            var contactNumberType = container.querySelector(".contactNumberType").value;
            var number = container.querySelector(".number").value;
            var countryCode = container.querySelector(".countryCode").value;
            var areaCode = container.querySelector(".areaCode").value;
            if (number)
                modelObject.phones.push({ contactNumberType: contactNumberType, number: number, countryCode: countryCode, areaCode: areaCode });
        }
        for (var i = 1; i <= 2; i++) {
            var container = formElement.querySelector("#addresses" + i);
            var addressType = container.querySelector(".addressType").value;
            var addressLine1 = container.querySelector(".addressLine1").value;
            var addressLine2 = container.querySelector(".addressLine2").value;
            var city = container.querySelector(".city").value;
            var state = container.querySelector(".state").value;
            var country = container.querySelector(".country").value;
            var pin = container.querySelector(".pin").value;
            if (addressType)
                modelObject.addresses.push({ addressType: addressType, addressLine1: addressLine1, addressLine2: addressLine2, city: city, state: state, country: country, pin: pin });
        }
        return modelObject;
    }
    exports.createObjectFromForm = createObjectFromForm;
    function populateFormFromObject(data, form) {
        console.log(data, form);
        var key;
        for (var prop in data) {
            var value = data[prop];
            if (Array.isArray(value)) {
                var i = 0;
                value.forEach(function (element) {
                    ++i;
                    var className = prop + i;
                    var container = form.querySelector("#" + className);
                    console.log(container);
                    for (var keyname in element) {
                        key = keyname;
                        var val = element[key];
                        console.log(key);
                        container.querySelector("." + key).value = val;
                    }
                });
            }
            else if (typeof value == "object") {
                for (var keyname in value) {
                    key = keyname;
                    var val = value[key];
                    form[key].value = val;
                }
            }
            else {
                key = prop;
                form[key].value = value;
            }
        }
        form["password"].value = "";
    }
    exports.populateFormFromObject = populateFormFromObject;
});
