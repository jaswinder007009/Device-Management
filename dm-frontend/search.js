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
        }
        findResult.prototype.findByUser = function (userName) {
            if (userName === void 0) { userName = ""; }
            var elements = new HtmlElementsId_1.HtmlElementsData();
            document.getElementById(elements.thead).setAttribute(elements.sortAttributr, "");
            document.getElementById(elements.thead).setAttribute(elements.sortType, "");
            var uri = new LocalHost_1.localHostUrl().uri + "?user-name=" + encodeURI(userName) + "";
            new HitApi_1.HitApi().HitGetApi(uri);
        };
        findResult.prototype.findBySerailNumber = function () {
        };
        return findResult;
    }());
    exports.findResult = findResult;
});
