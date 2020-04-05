(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./HitApi", "./HtmlElementsId", "./LocalHost"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var HitApi_1 = require("./HitApi");
    var HtmlElementsId_1 = require("./HtmlElementsId");
    var LocalHost_1 = require("./LocalHost");
    var Sort = /** @class */ (function () {
        function Sort() {
            this.elements = new HtmlElementsId_1.HtmlElementsData();
        }
        Sort.prototype.sortBy = function (attributeId) {
            var sortType = this.checkSortType(attributeId);
            var userName = document.getElementById(new HtmlElementsId_1.HtmlElementsData().search).getAttribute(this.elements.userName);
            this.setSortingApiCall(attributeId, userName, sortType);
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
        Sort.prototype.setSortingApiCall = function (sortAttribute, userName, sortType) {
            var uri = new LocalHost_1.localHostUrl().uri + "?user-name=" + encodeURI(userName) + "&sort=" + sortAttribute + "&sort-type=" + sortType;
            var populateSorting = new HitApi_1.HitApi();
            populateSorting.HitGetApi(uri);
        };
        return Sort;
    }());
    exports.Sort = Sort;
});
