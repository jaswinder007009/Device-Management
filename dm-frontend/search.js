(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./HitApi", "./LocalHost"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var HitApi_1 = require("./HitApi");
    var LocalHost_1 = require("./LocalHost");
    var findResult = /** @class */ (function () {
        function findResult() {
        }
        findResult.prototype.find = function (find) {
            if (find === void 0) { find = ""; }
            var uri = new LocalHost_1.localHostUrl().uri + "?find=" + encodeURI(find) + "";
            new HitApi_1.HitApi().HitGetApi(uri);
        };
        return findResult;
    }());
    exports.findResult = findResult;
});
