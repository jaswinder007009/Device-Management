var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./getApi", "./utilities", "EventListeners", "./sorting"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var getApi_1 = require("./getApi");
    var util = __importStar(require("./utilities"));
    var EventListeners_1 = require("EventListeners");
    var sorting_1 = require("./sorting");
    var form_mode;
    // (document.querySelector("#byname") as HTMLFormElement).addEventListener
    //       ("click",function() {new GetUserApi().getRequest("sort_by_name");});
    // (document.querySelector("#byage") as HTMLFormElement).addEventListener
    //        ("click",function() {new GetUserApi().getRequest("sort_by_age");});
    // (document.querySelector("#byexperience") as HTMLFormElement).addEventListener
    //        ("click",function() {new GetUserApi().getRequest("sort_by_exp");});
    // document.querySelector('fixed-header-drawer-exp').addEventListener('change', function (e) {
    //     console.log("test");
    //     const temp = new GetUserApi();
    //     temp.enteredName();
    // });
    //window.addEventListener("load",
    var table = document.getElementById("Request_data_body");
    console.log(table);
    function populateTable(array) {
        var htmlString = '';
        for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
            var element = array_1[_i];
            htmlString += element.GenerateTableRow();
            // console.log(element.GenerateTableRow());
        }
        ;
        // console.log(htmlString);
        table.innerHTML = htmlString;
    }
    function jass() {
        console.log("rgeehehe");
        var temp = new getApi_1.GetUserApi();
        temp.getRequest().then(function () {
            console.log(temp.array, "asdfghjkloiuytrewqazxcvbnmlpoiuytrewqazxcvbnm,klpoiuytrewqasdfghj");
            populateTable(temp.array);
        });
        // temp.searchByName();
    }
    jass();
    EventListeners_1.AllListerers();
    document.addEventListener('click', function (e) {
        if (e.target.id == "popup") {
            // let popup  = new form();
            // (document.getElementById("user_form") as HTMLDivElement).innerHTML = popup.popupform;
            util.openForm();
        }
        if (e.target.id == "closeFormButton") {
            // let popup  = new form();
            // (document.getElementById("user_form") as HTMLDivElement).innerHTML = popup.popupform;
            util.closeForm();
        }
    });
    //);
    // (document.querySelector("#switch-1") as HTMLButtonElement).addEventListener("click", function()
    //  {
    // 	 if(document.getElementById("switch-1").checked=true)
    // 	 {
    // 	 }
    // });
    // (document.querySelector("#sr") as HTMLButtonElement).addEventListener
    // 	  ("click",function() 
    // 	  {
    // 		console.log(1);const temp = new GetUserApi();
    // 		temp.enteredName();
    // 	});
    // (document.querySelector("#register-button") as HTMLButtonElement).addEventListener("click", function()
    //  {
    // 	util.openForm();
    // 	form_mode = "create";
    // });
    document.querySelectorAll(".form-close-button").forEach(function (button) {
        return button.addEventListener("click", function (ev) {
            util.closeForm();
        });
    });
    // (document.querySelector(".contact-form") as HTMLFormElement).addEventListener(
    // 	"submit",
    // 	function(e) {
    // 		e.preventDefault();
    // 		var validationResult = validateForm();
    // 		if (!validationResult) {
    // 			return;
    // 		}
    // 		if (form_mode == "create") {
    // 			new CreateUserApi().createUserData(createObjectFromForm(this));
    // 		} else if (form_mode == "edit") {
    // 			new UpdateUserApi().updateUserData(createObjectFromForm(this));
    // 		}
    // 		util.closeForm();
    // 	}
    // );
    // document.addEventListener("click", function(e) {
    // 	if ((e.target as HTMLButtonElement).className == "delete-button") {
    // 		const temp = new GetUserApi();
    // 		const username: any = (e.target as HTMLButtonElement).getAttribute("name");
    // 		temp.deleteData(username);
    // 		(document.getElementById("out") as HTMLFormElement).innerHTML = "";
    // 		alert(username + " is deleted");
    // 		temp.getRequest("");
    // 	}
    // 	if ((e.target as HTMLButtonElement).className == "edit-button") {
    // 		util.openForm();
    // 		const username: string = (e.target as HTMLButtonElement).dataset[
    // 			"username"
    // 		] as string;
    // 		var userObject: UserModel;
    // 		new GetUserApi().getUserByName(username).then(res => {
    // 			userObject = (res as unknown) as UserModel;
    // 			const form = document.forms["contact-form"] as HTMLFormElement;
    // 			populateFormFromObject(userObject, form);
    // 			form_mode = "edit";
    // 			util.disableEditing();
    /// 		});
    // 	}
    // });
    document.getElementsByClassName("userCheckStatus");
    document.addEventListener("click", function (e) {
        if ((e.target).className == "userCheckStatus") {
            var userId = parseInt((e.target).id);
            if (document.getElementById(userId.toString()).checked) {
                console.log("---------------1-----------------");
                new getApi_1.GetUserApi().userInactive(userId, "inactive");
            }
            else {
                console.log("----------------2----------------");
                new getApi_1.GetUserApi().userInactive(userId, "active");
            }
            jass();
        }
    });
    //document.getElementsByClassName("userDeleteData")
    // document.addEventListener("click" , f =>
    // {
    // 	//if (((f.target) as HTMLInputElement).className == "userDeleteData")
    // 	{
    // 		console.log("---------------1---------------------");
    // 		let userId:number = parseInt(((f.target) as HTMLInputElement).id);
    // 			new GetUserApi().deleteData(userId);
    // 	}
    // 	console.log("---------------2---------------------");
    // 	}
    // );
    document.addEventListener("click", function (ea) {
        if (ea.target.className == "userDeleteData") {
            var id = parseInt(ea.target.dataset["id"]);
            new getApi_1.GetUserApi().deleteData(id);
            jass();
        }
        else if (ea.target.tagName == 'TH') {
            var id = ea.target.id;
            console.log("----------------5-------");
            var returned = new sorting_1.Sort().sortBy(id);
            // console.log(returned);
            returned.then(function (data) {
                console.log(data);
                populateTable(data);
            });
            //jass();
        }
    });
});
