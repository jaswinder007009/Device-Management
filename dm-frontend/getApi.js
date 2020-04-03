(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./deviceListForUsers"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var deviceListForUsers_1 = require("./deviceListForUsers");
    var GetApi = /** @class */ (function () {
        function GetApi() {
        }
        GetApi.prototype.getApi = function (URL) {
            fetch(URL)
                .then(function (Response) { return Response.json(); })
                .then(function (data) {
                console.log(data);
                document.getElementById("Request_data").innerHTML = "";
                for (var i = 0; i < data.length; i++) {
                    var res = new deviceListForUsers_1.DeviceListForUsers(data[i]);
                    res.getDeviceList();
                }
            })["catch"](function (err) { return console.log(err); });
        };
        GetApi.prototype.getData = function () {
            var URL = "https://localhost:5001/dm/Device/page?limit1=6&offset1=0";
            this.getApi(URL);
        };
        GetApi.prototype.searchByName = function () {
            var search = document.getElementById("fixed-header-drawer-exp").value;
            var URL = "https://localhost:5001/dm/Device/" + search;
            this.getApi(URL);
        };
        GetApi.prototype.sort = function (SortColumn, SortDirection) {
            var URL = "https://localhost:5001/dm/Device/sort?SortColumn=" + SortColumn + "&SortDirection=" + SortDirection;
            this.getApi(URL);
        };
        GetApi.prototype.checkSortType = function (value) {
            var type = document.getElementById(value).getAttribute("class");
            if (type === "mdl-data-table__header--sorted-descending") {
                document.getElementById(value).setAttribute("class", "mdl-data-table__header--sorted-ascending");
                return "a";
            }
            else {
                document.getElementById(value).setAttribute("class", "mdl-data-table__header--sorted-descending");
                return "d";
            }
        };
        return GetApi;
    }());
    document.addEventListener("click", function (e) {
        var col = e.target.getAttribute('name');
        var temp = new GetApi();
        var pos = temp.checkSortType(col);
        temp.sort(col, pos);
    });
    document.querySelector('#fixed-header-drawer-exp').addEventListener('change', function (e) {
        console.log("test");
        var temp = new GetApi();
        temp.searchByName();
    });
    window.addEventListener("load", function () {
        var temp = new GetApi();
        temp.getData();
    });
});
