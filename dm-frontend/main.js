var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var MyDevices = /** @class */ (function () {
    function MyDevices() {
        this.table1 = document.getElementById("tab1");
        this.table2 = document.getElementById("tab2");
        this.tab1 = document.getElementById("one");
        this.tab2 = document.getElementById("two");
    }
    MyDevices.prototype.search = function () {
        if (document.querySelector(".mdl-layout__tab.is-active") == this.tab1) {
            this.getCurrentDecice(document.getElementById("waterfall-exp").value);
        }
        else {
            this.getPreviousDecice(document.getElementById("waterfall-exp").value);
        }
    };
    MyDevices.prototype.getPreviousDecice = function (search) {
        if (search === void 0) { search = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var data, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.url = "http://localhost:50001/api/Device/previous_device/16?search=" + search;
                        return [4 /*yield*/, this.getApiCall(this.url)];
                    case 1:
                        data = _b.sent();
                        _a = this;
                        return [4 /*yield*/, data];
                    case 2:
                        _a.data = _b.sent();
                        console.log(data);
                        this.size = data.length;
                        this.dynamicGenerate(this.table2);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    MyDevices.prototype.getCurrentDecice = function (search) {
        if (search === void 0) { search = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var data, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.url = "http://localhost:50001/api/Device/current_device/16?search=" + search;
                        return [4 /*yield*/, this.getApiCall(this.url)];
                    case 1:
                        data = _b.sent();
                        _a = this;
                        return [4 /*yield*/, data];
                    case 2:
                        _a.data = _b.sent();
                        console.log(data);
                        this.size = data.length;
                        this.dynamicGenerate(this.table1);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    MyDevices.prototype.getApiCall = function (URL) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(URL)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, (response.json())];
                    case 2:
                        data = _a.sent();
                        console.log(data);
                        return [4 /*yield*/, data];
                    case 3: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    MyDevices.prototype.dynamicGenerate = function (table) {
        var loop = 0;
        this.DeleteRows(table);
        for (loop = 0; loop < this.data.length; loop++) {
            var row = table.insertRow(loop + 1);
            var cell = row.insertCell(0);
            var cell1 = row.insertCell(1);
            var cell2 = row.insertCell(2);
            var cell3 = row.insertCell(3);
            var cell4 = row.insertCell(4);
            cell.innerHTML = this.data[loop]["type"];
            cell1.innerHTML = this.data[loop]["brand"];
            cell2.innerHTML = this.data[loop]["model"];
            cell3.innerHTML = this.data[loop]["assign_date"];
            cell4.innerHTML = this.data[loop]["return_date"];
        }
    };
    MyDevices.prototype.DeleteRows = function (table) {
        var rowCount = table.rows.length;
        for (var i = rowCount - 1; i > 0; i--) {
            table.deleteRow(i);
        }
    };
    MyDevices.prototype.sortTable = function (n, table) {
        var rows, i, x, y, count = 0;
        var switching = true;
        var direction = "ascending";
        while (switching) {
            switching = false;
            rows = table.rows;
            for (i = 1; i < (rows.length - 1); i++) {
                var Switch = false;
                x = rows[i].getElementsByTagName("TD")[n];
                y = rows[i + 1].getElementsByTagName("TD")[n];
                if (direction == "ascending") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        Switch = true;
                        break;
                    }
                }
                else if (direction == "descending") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        Switch = true;
                        break;
                    }
                }
            }
            if (Switch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                count++;
            }
            else {
                if (count == 0 && direction == "ascending") {
                    direction = "descending";
                    switching = true;
                }
            }
        }
    };
    return MyDevices;
}());
var mydevices = new MyDevices();
