(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./deviceListForAdmin"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var deviceListForAdmin_1 = require("./deviceListForAdmin");
    var GetApiForAdmin = /** @class */ (function () {
        function GetApiForAdmin() {
        }
        GetApiForAdmin.prototype.getApi = function (URL) {
            fetch(URL)
                .then(function (Response) { return Response.json(); })
                .then(function (data) {
                console.log(data);
                document.getElementById("Request_data").innerHTML = "";
                for (var i = 0; i < data.length; i++) {
                    var res = new deviceListForAdmin_1.DeviceListForAdmin(data[i]);
                    res.getDeviceList();
                }
            })["catch"](function (err) { return console.log(err); });
        };
        GetApiForAdmin.prototype.getData = function () {
            var URL = "https://localhost:5001/dm/Device/page?limit1=15&offset1=0";
            this.getApi(URL);
        };
        GetApiForAdmin.prototype.searchByName = function () {
            var search = document.getElementById("fixed-header-drawer-exp").value;
            var URL = "https://localhost:5001/dm/Device/" + search;
            this.getApi(URL);
        };
        GetApiForAdmin.prototype.sort = function (SortColumn, SortDirection) {
            var URL = "https://localhost:5001/dm/Device/sort?SortColumn=" + SortColumn + "&SortDirection=" + SortDirection;
            this.getApi(URL);
        };
        GetApiForAdmin.prototype.checkSortType = function (value) {
            var type = document.getElementById(value).getAttribute("class");
            // (document.getElementById(this.elements.thead) as HTMLTableRowElement).setAttribute("sort", value);
            if (type === "mdl-data-table__header--sorted-descending") {
                document.getElementById(value).setAttribute("class", "mdl-data-table__header--sorted-ascending");
                return "a";
            }
            else {
                document.getElementById(value).setAttribute("class", "mdl-data-table__header--sorted-descending");
                return "d";
            }
        };
        GetApiForAdmin.prototype.deleteDevice = function (device_id) {
            fetch("https://localhost:5001/dm/Device/del/" + device_id, {
                method: "DELETE"
            });
        };
        return GetApiForAdmin;
    }());
    document.addEventListener("click", function (e) {
        if (e.target.className == "delete-button") {
            if (confirm("Are you sure you want to delete this device?")) {
                var temp_1 = new GetApiForAdmin();
                var device_id = e.target.getAttribute('value');
                console.log("device_id" + device_id);
                temp_1.deleteDevice(device_id);
                console.log("device deleted");
                window.location.reload();
                // temp.getData();
            }
            else {
                console.log("fail deleted");
            }
        }
    });
    document.addEventListener("click", function (e) {
        if (e.target.className == "edit-button") {
            var device_id = e.target.getAttribute('value');
            console.log(device_id);
            console.log("edit button");
            window.location.href = "AddDevice.html?device_id=" + device_id;
        }
    });
    document.addEventListener("click", function (e) {
        var col = e.target.getAttribute('name');
        var temp = new GetApiForAdmin();
        var pos = temp.checkSortType(col);
        console.log(pos);
        temp.sort(col, pos);
    });
    document.querySelector('#fixed-header-drawer-exp').addEventListener('change', function (e) {
        console.log("test");
        var temp = new GetApiForAdmin();
        temp.searchByName();
    });
    var temp = new GetApiForAdmin();
    temp.getData();
});
