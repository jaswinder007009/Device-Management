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
    // import { UserData } from "./userData";
    //import { Display1 } from "./Display";
    ///import { Compare } from "./Compare";
    //import { UserData } from "./userData";
    var UserModel_1 = require("./UserModel");
    var GetUserApi = /** @class */ (function () {
        function GetUserApi() {
            this.array = [];
        }
        GetUserApi.prototype.getSort = function (uri) {
            return fetch(uri)
                .then(function (Response) {
                return Response.json();
            })
                .then(function (data) {
                return data.map(function (obj) { return new UserModel_1.UserModel(obj); });
                //return data;
                // {
                // console.log(data);
                // data.forEach((userObject: any) => 
                // 	this.array.push(new UserModel(userObject)));  
                // }
            });
        };
        GetUserApi.prototype.getRequest = function () {
            var _this = this;
            return fetch("https://localhost:5002/api/user")
                .then(function (Response) {
                return Response.json();
            })
                .then(function (data) {
                console.log(data);
                data.forEach(function (userObject) {
                    _this.array.push(new UserModel_1.UserModel(userObject));
                });
                console.log('Array', _this.array);
                // switch (compare) {
                // 	case "sort_by_name":
                // 		this.array.sort((FirstPerson: any, SecondPerson: any) =>
                // 			FirstPerson.FirstName > SecondPerson.FirstName ? 1 : -1
                // 		);
                // 		console.log(this.array.sort(new Compare().SortByName));
                // 		console.log("aggfdgf" + data[0].DOB);
                // 		break;
                // 	case "sort_by_age":
                // 		console.log(this.array.sort(new Compare().SortByAge));
                // 		this.array.sort(new Compare().SortByAge);
                // 		break;
                // 	case "sort_by_exp":
                // 		this.array.sort(new Compare().SortByExperience);
                // 		break;
                // 	default:
                // 		break;
                // }
                // (document.getElementById("out") as HTMLFormElement).innerHTML = "";
                // for (let i = 0; i < this.array.length; i++) {
                // 	//let res = new UserData(this.array[i]);
                // 	console.log(this.array);
                // 	let obj = new Display1();
                // 	obj.showUserData(this.array[i]);
                // }
            })
                .catch(function (err) { return console.log(err); });
        };
        GetUserApi.prototype.getUserByName = function (userName) {
            return fetch("http://localhost:5003/api/user/" + userName)
                .then(function (res) { return res.json(); })
                .then(function (data) {
                return data;
            })
                .catch(function (err) { return console.error(err); });
        };
        //////////////////////
        GetUserApi.prototype.userInactive = function (userId, jass) {
            return fetch("https://localhost:5002/api/user/" + userId + "/" + jass + "")
                .then(function (res) {
                return console.log(res.status);
            })
                .catch(function (err) { return console.error(err); });
        };
        //////////////
        GetUserApi.prototype.enteredName = function () {
            fetch("http://localhost:5003/api/user?search=" +
                document.getElementById("fixed-header-drawer-exp").value)
                .then(function (Response) { return Response.json(); })
                .then(function (data) {
                console.log(data);
                document.getElementById("out").innerHTML = "";
                for (var i = 0; i < data.length; i++) {
                    var res = new UserData(data[i]);
                    // let obj = new Display1();
                    // obj.showUserData(res);
                }
            })
                .catch(function (err) { return console.log(err); });
        };
        GetUserApi.prototype.deleteData = function (userId) {
            fetch("https://localhost:5002/api/user/" + userId + "/remove", {
                method: "DELETE"
            });
        };
        return GetUserApi;
    }());
    exports.GetUserApi = GetUserApi;
});
