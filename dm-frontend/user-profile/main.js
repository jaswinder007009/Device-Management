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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./UserModel", "./databinding", "./utility", "./dynamic", "./validate"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var UserModel_1 = require("./UserModel");
    var databinding_1 = require("./databinding");
    var util = require("./utility");
    var dynamic_1 = require("./dynamic");
    var validate_1 = require("./validate");
    var globalURL = "https://localhost:5002";
    var UserData = /** @class */ (function () {
        function UserData() {
        }
        UserData.prototype.getOneUser = function () {
            return __awaiter(this, void 0, void 0, function () {
                var data, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this.url = globalURL + "/api/user/30";
                            return [4 /*yield*/, this.getApiCall(this.url)];
                        case 1:
                            data = _b.sent();
                            _a = this;
                            return [4 /*yield*/, data];
                        case 2:
                            _a.data = _b.sent();
                            dynamic_1.dynamicGenerate(this.data);
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        UserData.prototype.getCountry = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.url = globalURL + "/api/Dropdown/country";
                    this.dropdownApiCall(this.url, document.querySelector("#addresses1 .country"));
                    this.dropdownApiCall(this.url, document.querySelector("#addresses2 .country"));
                    return [2 /*return*/];
                });
            });
        };
        UserData.prototype.getState = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.url = globalURL + "/api/Dropdown/state";
                    this.dropdownApiCall(this.url, document.querySelector("#addresses1 .state"));
                    this.dropdownApiCall(this.url, document.querySelector("#addresses2 .state"));
                    return [2 /*return*/];
                });
            });
        };
        UserData.prototype.getCity = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.url = globalURL + "/api/Dropdown/city";
                    this.dropdownApiCall(this.url, document.querySelector("#addresses1 .city"));
                    this.dropdownApiCall(this.url, document.querySelector("#addresses2 .city"));
                    return [2 /*return*/];
                });
            });
        };
        UserData.prototype.updateData = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, fetch(globalURL + "/api/user/30/update", {
                            method: 'PUT',
                            headers: new Headers({ 'content-type': 'application/json' }),
                            body: JSON.stringify(data)
                        })];
                });
            });
        };
        UserData.prototype.getApiCall = function (URL) {
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
                            return [4 /*yield*/, new UserModel_1.UserModel(data)];
                        case 3: return [2 /*return*/, (_a.sent())];
                    }
                });
            });
        };
        UserData.prototype.dropdownApiCall = function (URL, selectElement) {
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
                            populateDropdown(selectElement, data);
                            return [2 /*return*/];
                    }
                });
            });
        };
        return UserData;
    }());
    exports.UserData = UserData;
    var user = new UserData();
    user.getCountry();
    user.getState();
    user.getCity();
    user.getOneUser();
    document.querySelector('form').addEventListener('click', function (ev) {
        ev.preventDefault();
        if (ev.target.classList.contains("edit")) {
            util.openForm();
            var userObject;
            user.getOneUser().then(function (data) {
                userObject = data;
                var form = document.querySelector('form');
                databinding_1.populateFormFromObject(userObject, form);
            });
        }
        else if (ev.target.id == "savemydata") {
            if (validate_1.validate() == false) {
                return;
            }
            user.updateData(databinding_1.createObjectFromForm(this)).then(function () { user.getOneUser(); });
            util.closeForm();
        }
        return false;
    });
    function populateDropdown(selectElement, data) {
        var htmlString = '';
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var dataPair = data_1[_i];
            htmlString += '<option data-id="' + dataPair.id + '" value="' + dataPair.name + '">' + dataPair.name + '</option>';
        }
        selectElement.innerHTML = htmlString;
    }
});
