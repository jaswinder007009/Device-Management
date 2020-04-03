(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./HtmlElementsId", "./HitApi", "./LocalHost"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var HtmlElementsId_1 = require("./HtmlElementsId");
    var HitApi_1 = require("./HitApi");
    var LocalHost_1 = require("./LocalHost");
    var GeneratePaging = /** @class */ (function () {
        function GeneratePaging() {
            this.elements = new HtmlElementsId_1.HtmlElementsData();
        }
        GeneratePaging.prototype.generatePage = function (selectedPageNo, sortAttribute, sortType) {
            if (sortAttribute === void 0) { sortAttribute = ""; }
            if (sortType === void 0) { sortType = ""; }
            var find = document.getElementById(this.elements.search).value;
            var uri = new LocalHost_1.localHostUrl().uri + "?find=" + encodeURI(find) + "&sort=" + sortAttribute + "&sort-type=" + sortType + "page=" + selectedPageNo;
            new HitApi_1.HitApi().HitGetApi(uri);
        };
        GeneratePaging.prototype.selectPage = function (pageNumber) {
            var sort = document.getElementById(this.elements.thead).getAttribute(this.elements.sortAttributr);
            var sortType = document.getElementById(this.elements.thead).getAttribute(this.elements.sortType);
            this.generatePage(pageNumber, sort, sortType);
        };
        GeneratePaging.prototype.pagging = function (totalcount, page, pagesize) {
            if (page === void 0) { page = 1; }
            if (pagesize === void 0) { pagesize = 2; }
            this.clearData();
            var temp = Math.ceil(totalcount / 2);
            var maxSize = 5;
            var size;
            //  if (temp > maxSize )
            //  {
            //      size = maxSize ;
            this.navigateButton(this.elements.previous, size, "previous");
            //  }
            //  else{
            //  let size =page;
            //  }
            // this.clearPages();
            for (var loop = 0; loop < size; loop++)
                this.addPageElement(loop + 1);
            this.navigateButton(this.elements.next);
            if (temp > maxSize) {
                size = maxSize;
                this.addPageElement(">>");
            }
        };
        GeneratePaging.prototype.navigateButton = function (value, size, state) {
            document.getElementById("pages").innerHTML = "<input type=\"submit\" class=\"page\" id=\"" + state + "\" value=\"" + value + "\" > ";
            if (state == "previous" && )
                ;
        };
        GeneratePaging.prototype.addPageElement = function (value, data) {
            if (data === void 0) { data = value; }
            document.getElementById("pages").innerHTML += "<input type=\"submit\" class=\"page\" id=\"" + value + "\" value=\"" + value + "\" >";
        };
        GeneratePaging.prototype.clearData = function () {
            document.getElementById("pages").innerHTML = "";
        };
        return GeneratePaging;
    }());
    exports.GeneratePaging = GeneratePaging;
});
