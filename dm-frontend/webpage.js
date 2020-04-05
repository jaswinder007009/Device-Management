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
        define(["require", "exports", "./getApi", "./utilities", "./sorting"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var getApi_1 = require("./getApi");
    var util = __importStar(require("./utilities"));
    var sorting_1 = require("./sorting");
    var form_mode;
    var table = document.getElementById("Request_data_body");
    console.log(table);
    function populateTable(array) {
        var htmlString = '';
        for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
            var element = array_1[_i];
            htmlString += element.GenerateTableRow();
        }
        ;
        table.innerHTML = htmlString;
    }
    function jass() {
        console.log("rgeehehe");
        var temp = new getApi_1.GetUserApi();
        temp.getRequest().then(function () {
            console.log(temp.array, "asdfghjkloiuytrewqazxcvbnmlpoiuytrewqazxcvbnm,klpoiuytrewqasdfghj");
            populateTable(temp.array);
        });
        // temp.searchByName();
    }
    jass();
    //AllListeners();
    document.addEventListener('click', function (e) {
        if (e.target.id == "popup") {
            util.openForm();
        }
        if (e.target.id == "closeFormButton") {
            util.closeForm();
        }
    });
    document.querySelectorAll(".form-close-button").forEach(function (button) {
        return button.addEventListener("click", function (ev) {
            util.closeForm();
        });
    });
    document.getElementsByClassName("userCheckStatus");
    document.addEventListener("click", function (e) {
        if ((e.target).className == "userCheckStatus") {
            var userId_1 = parseInt((e.target).id);
            if (document.getElementById(userId_1.toString()).checked) {
                console.log("---------------1-----------------");
                new getApi_1.GetUserApi().userInactive(userId_1, "inactive");
            }
            else {
                console.log("----------------2----------------");
                new getApi_1.GetUserApi().userInactive(userId_1, "active");
            }
            jass();
        }
    });
    document.addEventListener("click", function (ea) {
        if (ea.target.className == "userDeleteData") {
            var id = parseInt(ea.target.dataset["id"]);
            new getApi_1.GetUserApi().deleteData(id);
            jass();
        }
        else if (ea.target.tagName == 'TH') {
            var id = ea.target.id;
            console.log("----------------5-------");
            var returned = new sorting_1.Sort().sortBy(id);
            // console.log(returned);
            returned.then(function (data) {
                console.log(data);
                populateTable(data);
            });
            //jass();
        }
    });
});
