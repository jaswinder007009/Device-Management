(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./UserModel"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UserModel_1 = require("./UserModel");
    var GetUserApi = /** @class */ (function () {
        function GetUserApi() {
            this.array = [];
        }
        /////API TO SORT
        GetUserApi.prototype.getSort = function (uri) {
            return fetch(uri)
                .then(function (Response) {
                return Response.json();
            })
                .then(function (data) {
                return data.map(function (obj) { return new UserModel_1.UserModel(obj); });
            });
        };
        /////API GET		
        GetUserApi.prototype.getRequest = function () {
            var _this = this;
            return fetch("http://localhost:5000/api/user")
                .then(function (Response) {
                return Response.json();
            })
                .then(function (data) {
                console.log(data);
                data.forEach(function (userObject) {
                    _this.array.push(new UserModel_1.UserModel(userObject));
                });
                console.log('Array', _this.array);
            })
                .catch(function (err) { return console.log(err); });
        };
        ////API TO MAKE ACTIVE INACTIVE
        GetUserApi.prototype.userInactive = function (userId, jass) {
            return fetch("http://localhost:5000/api/user/" + userId + "/" + jass + "")
                .then(function (res) {
                return console.log(res.status);
            })
                .catch(function (err) { return console.error(err); });
        };
        /////API TO DELETE
        GetUserApi.prototype.deleteData = function (userId) {
            fetch("http://localhost:5000/api/user/" + userId + "/remove", {
                method: "DELETE"
            });
        };
        return GetUserApi;
    }());
    exports.GetUserApi = GetUserApi;
});
