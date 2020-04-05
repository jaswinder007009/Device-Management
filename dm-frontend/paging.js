(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./HtmlElementsId", "./LocalHost", "./HitApi"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var HtmlElementsId_1 = require("./HtmlElementsId");
    var LocalHost_1 = require("./LocalHost");
    var HitApi_1 = require("./HitApi");
    var page = /** @class */ (function () {
        function page() {
            this.totalRowsInTable = 10;
        }
        page.prototype.slectedPage = function (value) {
            var offset = parseInt(value);
            this.domElements = new HtmlElementsId_1.HtmlElementsData();
            var userName = document.getElementById(new HtmlElementsId_1.HtmlElementsData().search).getAttribute(this.domElements.userName);
            var sortAttribute = document.getElementById(this.domElements.thead).getAttribute(this.domElements.sortAttributr);
            var sortType = document.getElementById(this.domElements.thead).getAttribute(this.domElements.sortType);
            var uri = new LocalHost_1.localHostUrl().uri + "?user-name=" + encodeURI(userName) + "&sort=" + sortAttribute + "&sort-type=" + sortType + "&page=" + offset + "&page-size=" + this.totalRowsInTable;
            console.log(uri);
            new HitApi_1.HitApi().HitGetApi(uri);
        };
        page.prototype.addPageElement = function (start, end) {
            if (start === void 0) { start = 1; }
            if (end === void 0) { end = this.totalRowsInTable; }
            // this.clearData();
            document.getElementById("pagination").innerHTML += "<input type=\"submit\" class=\"page\" id=\"\" value=\"<<\" >";
            for (var loop = start; loop <= end; loop++)
                document.getElementById("pagination").innerHTML += "<input type=\"submit\" class=\"page\" id=\"" + loop + "\" value=\"" + loop + "\" >";
            document.getElementById("pagination").innerHTML += "<input type=\"submit\" class=\"page\" id=\"\" value=\">>\" >";
        };
        return page;
    }());
    exports.page = page;
});
