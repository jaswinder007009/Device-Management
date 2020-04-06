(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./HitApi", "./LocalHost", "./HtmlElementsId"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var HitApi_1 = require("./HitApi");
    var LocalHost_1 = require("./LocalHost");
    var HtmlElementsId_1 = require("./HtmlElementsId");
    var findResult = /** @class */ (function () {
        function findResult() {
            this.elements = new HtmlElementsId_1.HtmlElementsData();
        }
        findResult.prototype.findByUser = function () {
            var uri = this.searchUser();
            new HitApi_1.HitApi().HitGetApi(uri);
        };
        findResult.prototype.searchUser = function () {
            var userName = document.getElementById(this.elements.search).getAttribute(this.elements.userName);
            var serialNumber = document.getElementById(this.elements.devicesearch).getAttribute(this.elements.deviceSerial);
            document.getElementById(this.elements.thead).setAttribute(this.elements.sortAttributr, "");
            document.getElementById(this.elements.thead).setAttribute(this.elements.sortType, "");
            var uri = new LocalHost_1.localHostUrl().uri + "?user-name=" + encodeURI(userName) + "&serial-number=" + encodeURI(serialNumber) + "";
            ;
            return uri;
        };
        return findResult;
    }());
    exports.findResult = findResult;
});
