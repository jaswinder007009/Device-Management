(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./HtmlElementsId", "./HitApi", "./search"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var HtmlElementsId_1 = require("./HtmlElementsId");
    var HitApi_1 = require("./HitApi");
    var search_1 = require("./search");
    var UserRequestStatus = /** @class */ (function () {
        function UserRequestStatus() {
        }
        UserRequestStatus.prototype.generateRequestData = function (requestStatus) {
            if (requestStatus === void 0) { requestStatus = "ALL"; }
            this.domElements = new HtmlElementsId_1.HtmlElementsData();
            var userName = document.getElementById(new HtmlElementsId_1.HtmlElementsData().search).getAttribute(this.domElements.userName);
            var sortAttribute = document.getElementById(this.domElements.thead).getAttribute(this.domElements.sortAttributr);
            var sortType = document.getElementById(this.domElements.thead).getAttribute(this.domElements.sortType);
            var uri = new search_1.findResult().searchUser() + "&sort=" + sortAttribute + "&sort-type=" + sortType + "&status=" + requestStatus;
            return uri;
        };
        UserRequestStatus.prototype.requestStatusResult = function (status) {
            status = status.toLowerCase();
            var uri = this.generateRequestData(status);
            new HitApi_1.HitApi().HitGetApi(uri);
        };
        return UserRequestStatus;
    }());
    exports.UserRequestStatus = UserRequestStatus;
});
