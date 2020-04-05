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
    function dynamicGenerate(data) {
        this.headerTag = document.querySelector(".data-hideable");
        this.headerTag1 = document.querySelector(".data-hideable1");
        this.headerTag2 = document.querySelector(".data-hideable2");
        this.data = data;
        this.headerTag.innerHTML = "";
        {
            this.headerTag.innerHTML += " <span>NAME:" + (this.data["salutation"] + " " + this.data["firstName"] + " " + this.data["middleName"] + " " + this.data["lastName"]) + "</span><br>\n        <span>GENDER:" + this.data["gender"] + "</span><br>\n        <span>DESIGNATION:" + this.data["designationName"] + "</span><br>\n        <span>DEPARTMENT:" + this.data["departmentName"] + "</span><br>\n        <span>EMAIL:" + this.data["email"] + "</span><br>\n        <span>DATE OF BIRTH:" + this.data["dob"] + "</span><br>\n        <span>DATE OF JOINING:" + this.data["doj"] + "</span><br>\n        <button class=\"mdl-button mdl-js-button mdl-button--raised mdl-button--colored edit\">EDIT\n        </button>";
        }
        {
            var headerTag1HTML = '';
            for (var _i = 0, _a = this.data.addresses; _i < _a.length; _i++) {
                var address = _a[_i];
                headerTag1HTML +=
                    " <span>" + address.addressType.toUpperCase() + " ADDRESS :</span><br>\n            <span>ADDRESS   " + address.addressLine1 + ",\n             " + address.addressLine2 + "</span><br>\n            <span>CITY:    " + address.city + "</span><br>\n            <span>STATE:   " + address.state + "</span><br>\n            <span>COUNTRY:    " + address.country + "</span><br>\n            <span>PIN:    " + address.pin + "</span><br>";
            }
            headerTag1HTML += '<button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored edit">EDIT</button>';
            this.headerTag1.innerHTML = headerTag1HTML;
        }
        {
            var headerTag2HTML = '';
            for (var _b = 0, _c = this.data.phones; _b < _c.length; _b++) {
                var phone = _c[_b];
                headerTag2HTML +=
                    " <span>" + phone.contactNumberType.toUpperCase() + ":</span><br>\n            <span>NUMBER:    " + phone.number + "&nbsp;&nbsp;\n            COUNTRY CODE:    " + phone.countryCode + "&nbsp;&nbsp;\n           AREA CODE:     " + phone.areaCode + "</span><br>";
            }
            headerTag2HTML += '<button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored edit">EDIT</button>';
            this.headerTag2.innerHTML = headerTag2HTML;
        }
    }
    exports.dynamicGenerate = dynamicGenerate;
});
