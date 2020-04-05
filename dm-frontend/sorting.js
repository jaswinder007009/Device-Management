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
    var Sort = /** @class */ (function () {
        function Sort() {
        }
        Sort.prototype.sortBy = function (attributeId) {
            var sortType = this.checkSortType(attributeId);
            var find = document.getElementById("fixed-header-drawer-exp").value;
            return this.setSortingApiCall(attributeId, find, sortType);
        };
        Sort.prototype.checkSortType = function (value) {
            var type = document.getElementById(value).getAttribute("class");
            if (type === "mdl-data-table__header--sorted-descending") {
                document.getElementById(value).setAttribute("class", "mdl-data-table__header--sorted-ascending");
                return "-1";
            }
            else {
                document.getElementById(value).setAttribute("class", "mdl-data-table__header--sorted-descending");
                return "1";
            }
        };
        Sort.prototype.setSortingApiCall = function (sortAttribute, find, sortType) {
            var uri = "http://localhost:5000/api/user?searchby=" + encodeURI(find) + "&sortby=" + sortAttribute + "&direction=" + sortType;
            return new getApi_1.GetUserApi().getSort(uri);
        };
        return Sort;
    }());
    exports.Sort = Sort;
});
