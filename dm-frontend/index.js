(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./search", "./Sorting", "./HtmlElementsId"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var search_1 = require("./search");
    var Sorting_1 = require("./Sorting");
    var HtmlElementsId_1 = require("./HtmlElementsId");
    new search_1.findResult().find();
    document.addEventListener("keypress", function (e) {
        var elements = new HtmlElementsId_1.HtmlElementsData();
        if (e.key == "Enter") {
            var id = e.target.id;
            new search_1.findResult().find(document.getElementById(id).value);
            document.getElementById(elements.thead).setAttribute(elements.sortAttributr, "");
            document.getElementById(elements.thead).setAttribute(elements.sortType, "");
        }
    });
    document.querySelector("#getdata").addEventListener("click", function (e) {
        var elements = new HtmlElementsId_1.HtmlElementsData();
        document.getElementById("waterfall-exp").value = "";
        document.getElementById(elements.thead).setAttribute(elements.sortAttributr, "");
        document.getElementById(elements.thead).setAttribute(elements.sortType, "");
        new search_1.findResult().find();
    });
    document.addEventListener("click", function (e) {
        var id = e.target.id;
        if (id === "user" || id === "returndate" || id === "admin" || id === "assigndate" || id === "status"
            || id === "type" || id === "serialNumber" || id === "device") {
            new Sorting_1.Sort().sortBy(id);
        }
    });
});
