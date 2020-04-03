(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./getApi"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var getApi_1 = require("./getApi");
    var findResult = /** @class */ (function () {
        function findResult() {
        }
        findResult.prototype.find = function (find) {
            if (find === void 0) { find = ""; }
            var elements = new HtmlElementsData();
            document.getElementById(elements.thead).setAttribute(elements.sortAttributr, "");
            document.getElementById(elements.thead).setAttribute(elements.sortType, "");
            var uri = new localHostUrl().uri + "?find=" + encodeURI(find) + "";
            new getApi_1.GetUserApi().HitGetApi(uri);
        };
        return findResult;
    }());
    exports.findResult = findResult;
});
