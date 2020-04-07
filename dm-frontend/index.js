(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./search", "./Sorting", "./HtmlElementsId", "./paging", "./RequestStatus"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var search_1 = require("./search");
    var Sorting_1 = require("./Sorting");
    var HtmlElementsId_1 = require("./HtmlElementsId");
    var paging_1 = require("./paging");
    var RequestStatus_1 = require("./RequestStatus");
    new search_1.findResult().findByUser(); // for get all data 
    var domElement = new HtmlElementsId_1.HtmlElementsData();
    document.querySelector("#waterfall-exp").addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            var id = e.target.id;
            document.getElementById("request-status").selectedIndex = 0; // assign , reject , all 
            var search = document.getElementById(id).value;
            document.getElementById(id).setAttribute("user", search);
            new search_1.findResult().findByUser();
        }
    });
    document.querySelector("#device").addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            var id = e.target.id;
            document.getElementById("request-status").selectedIndex = 0; // assign , reject , all 
            var search = document.getElementById(id).value;
            document.getElementById(id).setAttribute("serialNumber", search);
            new search_1.findResult().findByUser();
        }
    });
    document.querySelector("#waterfall-exp").addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            var id = e.target.id;
            document.getElementById("request-status").selectedIndex = 0; // assign , reject , all 
            var search = document.getElementById(id).value;
            document.getElementById(id).setAttribute("user", search);
            new search_1.findResult().findByUser();
        }
    });
    document.querySelector("#getdata").addEventListener("click", function (e) {
        document.getElementById("waterfall-exp").value = "";
        document.getElementById("request-status").selectedIndex = 0; // assign , reject , all 
        document.getElementById(domElement.search).setAttribute("user", "");
        document.getElementById(domElement.devicesearch).setAttribute(domElement.deviceSerial, "");
        new search_1.findResult().findByUser();
        document.getElementById("pagination").setAttribute("page", "1"); // set page to 1
    });
    document.querySelector("#tableHead").addEventListener("click", function (e) {
        var id = e.target.id;
        if (id === "user" || id === "admin" || id === "serialNumber" || id === "device") {
            new Sorting_1.Sort().sortBy(id);
            document.getElementById("pagination").setAttribute("page", "1"); // set page to 1
        }
    });
    document.querySelector("#pagination").addEventListener("click", function (e) {
        console.log("asdfghjklpoiuytrew");
        var x = e.target.id;
        console.log(x);
        //(document.getElementById("pagination") as HTMLDivElement).setAttribute("page" , x);
        new paging_1.page().slectedPage(x);
    });
    document.querySelector("#request-status").addEventListener("change", function (e) {
        var requestStatus = e.target.value;
        if (requestStatus == "Returned" || requestStatus == "returned")
            requestStatus = "ret";
        if (requestStatus == "Rejected" || requestStatus == "reject")
            requestStatus = "rej";
        console.log(requestStatus);
        new RequestStatus_1.UserRequestStatus().requestStatusResult(requestStatus);
    });
    console.log(document.getElementById("request-status").value);
});
