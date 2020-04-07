(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./HitApi", "./HtmlElementsId", "./search"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var HitApi_1 = require("./HitApi");
    var HtmlElementsId_1 = require("./HtmlElementsId");
    var search_1 = require("./search");
    var Sort = /** @class */ (function () {
        function Sort() {
            this.elements = new HtmlElementsId_1.HtmlElementsData();
        }
        Sort.prototype.sortBy = function (attributeId) {
            var sortType = this.checkSortType(attributeId);
            var find = document.getElementById(this.elements.search).value;
            this.setSortingApiCall(attributeId, find, sortType);
        };
        Sort.prototype.checkSortType = function (value) {
            var type = document.getElementById(value).getAttribute("class");
            document.getElementById(this.elements.thead).setAttribute("sort", value);
            if (type === this.elements.upArrow) {
                document.getElementById(value).setAttribute("class", this.elements.downArrow);
                document.getElementById(this.elements.thead).setAttribute("sortby", "DESC");
                return "DESC";
            }
            else {
                document.getElementById(value).setAttribute("class", this.elements.upArrow);
                document.getElementById(this.elements.thead).setAttribute("sortby", "ASC");
                return "ASC";
            }
        };
        Sort.prototype.setSortingApiCall = function (sortAttribute, find, sortType) {
            var uri = new search_1.findResult().searchUser() + "&sort=" + sortAttribute + "&sort-type=" + sortType;
            var populateSorting = new HitApi_1.HitApi();
            populateSorting.HitGetApi(uri);
        };
        return Sort;
    }());
    exports.Sort = Sort;
});
