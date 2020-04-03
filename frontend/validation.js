// export function validateForm() {
// usernamevalidation();
// console.log("4");
// passwordvalidation();
// console.log("5");
// confirmpasswordvalidation();
// console.log("6");
// departmentvalidation();
// console.log("7");
// designationvalidation();
// console.log("8");
// emailvalidation();
// console.log("9");
// altemailvalidation();
// console.log("10");
// phone1validation();
// console.log("11");
// // return false;
// if(usernamevalidation()==true &&passwordvalidation()==true&&confirmpasswordvalidation()==true
// &&departmentvalidation()==true&&designationvalidation()==true&&emailvalidation()==true
// &&altemailvalidation==true()&&phone1validation()==true)
// {
//     console.log("2");
//     return true;
//     }
// else {
//         console.log("3");
//         return false;
//     }
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // }
    // function usernamevalidation() {
    // 	console.log("111");
    // 	var usernames = document.getElementById('username').value;
    // 	if (usernames == "") {
    // 		document.getElementById('usernames').innerHTML = "Fill User Name";
    // 		return false;
    // 	} else if (usernames.length < 5 || usernames.length > 20) {
    // 		document.getElementById('usernames').innerHTML = "Username Should Be Between 5 and 20";
    // 		return false;
    // 	} else {
    // 		document.getElementById('usernames').innerHTML = "";
    // 		return true;}
    // }
    // function passwordvalidation() {
    // 	console.log("222");
    // 	var passwords = document.getElementById('password').value;
    // 	if (passwords == "") {
    // 		document.getElementById('passwords').innerHTML = "Fill Password";
    // 		return false;
    // 	} else if (passwords.length < 5 || passwords.length > 20) {
    // 		document.getElementById('passwords').innerHTML = "Password Should Be Between 5 and 20";
    // 		return false;
    // 	} else {
    // 		document.getElementById('passwords').innerHTML = "";
    // 		return true; }
    // }
    // function confirmpasswordvalidation() {
    // 	var passwords = document.getElementById('password').value;
    // 	var confirmpasss = document.getElementById('confirmpass').value;
    // 	if (confirmpasss == "") {
    // 		document.getElementById('confirmpasss').innerHTML = "Fill Confirm Password";
    // 		return false;
    // 	} else if (confirmpasss.length < 5 || confirmpasss.length > 20) {
    // 		document.getElementById('confirmpasss').innerHTML = "Confirm Password Should Be Between 5 and 20";
    // 		return false;
    // 	} else if (passwords != confirmpasss) {
    // 		document.getElementById('confirmpasss').innerHTML = "Passwords Dont Match";
    // 		return false;
    // 	} else {
    // 		document.getElementById('confirmpasss').innerHTML = "";
    // 		return true; }
    // }
    // function departmentvalidation() {
    // 	var departments = document.getElementById('department').value;
    // 	if (departments == "") {
    // 		document.getElementById('departments').innerHTML = "Fill Department";
    // 		return false;
    // 	} else {
    // 		document.getElementById('departments').innerHTML = "";
    // 		return true;}
    // }
    // function designationvalidation() {
    // 	var designations = document.getElementById('designation').value;
    // 	if (designations == "") {
    // 		document.getElementById('designations').innerHTML = "Fill Designation";
    // 		return false;
    // 	} else {
    // 		document.getElementById('designations').innerHTML = "";
    // 		return true;}
    // }
    // function emailvalidation() {
    // 	var emails = document.getElementById('email').value;
    // 	if (emails == "") {
    // 		document.getElementById('emails').innerHTML = "Fill Email";
    // 		return false;
    // 	} else if (emails.indexOf('@') <= 0) {
    // 		document.getElementById('emails').innerHTML = "@ Is At Invalid position";
    // 		return false;
    // 	} else if ((emails.charAt(emails.length - 4) != '.') && (emails.charAt(emails.length - 3) != '.')) {
    // 		document.getElementById('emails').innerHTML = ". Is At Invalid position";
    // 		return false;
    // 	} else {
    // 		document.getElementById('emails').innerHTML = "";
    // 		return true; }
    // }
    // function altemailvalidation() {
    // 	var altemails = document.getElementById('altemail').value;
    // 	if (altemails == "") {
    // 		document.getElementById('altemails').innerHTML = "Fill Alternate Email";
    // 		return false;
    // 	} else if (altemails.indexOf('@') <= 0) {
    // 		document.getElementById('altemails').innerHTML = "@ Is At Invalid position";
    // 		return false;
    // 	} else if ((altemails.charAt(altemails.length - 4) != '.') && (altemails.charAt(altemails.length - 3) != '.')) {
    // 		document.getElementById('altemails').innerHTML = ". Is At Invalid position";
    // 		return false;
    // 	} else {
    // 		document.getElementById('altemails').innerHTML = "";
    // 		return true;}
    // }
    // function phone1validation() {
    // 	var phone_number1s = document.getElementById('phone_number1').value;
    // 	if (phone_number1s == "") {
    // 		document.getElementById('phone_number1s').innerHTML = "Enter Contact Number";
    // 		return false;
    // 	} else if (isNaN(phone_number1s)) {
    // 		document.getElementById('phone_number1s').innerHTML = "**Only Digits Allowed";
    // 		return false;
    // 	} else if (phone_number1s.length != 10) {
    // 		document.getElementById('phone_number1s').innerHTML = "Enter 10 Digits";
    // 		return false;
    // 	} else {
    // 		document.getElementById('phone_number1s').innerHTML = "";
    // 		return true;}
    // }
    function validateForm() {
        usernamevalidation();
        console.log("4");
        passwordvalidation();
        console.log("5");
        confirmpasswordvalidation();
        console.log("6");
        departmentvalidation();
        console.log("7");
        designationvalidation();
        console.log("8");
        emailvalidation();
        console.log("9");
        altemailvalidation();
        console.log("10");
        phone1validation();
        console.log("11");
        // return false;
        if (usernamevalidation() == true && passwordvalidation() == true && confirmpasswordvalidation() == true
            && departmentvalidation() == true && designationvalidation() == true && emailvalidation() == true
            && altemailvalidation == true() && phone1validation() == true) {
            console.log("2");
            return true;
        }
        else {
            console.log("3");
            return false;
        }
    }
    exports.validateForm = validateForm;
    function passwordvalidation() {
        console.log("222");
        var passwords = document.getElementById('password').value;
        if (passwords == "") {
            document.getElementById('passwords').innerHTML = "Fill Password";
            return false;
        }
        else if (passwords.length < 5 || passwords.length > 20) {
            document.getElementById('passwords').innerHTML = "Password Should Be Between 5 and 20";
            return false;
        }
        else {
            document.getElementById('passwords').innerHTML = "";
            return true;
        }
    }
    function confirmpasswordvalidation() {
        var passwords = document.getElementById('password').value;
        var confirmpasss = document.getElementById('confirmpass').value;
        if (confirmpasss == "") {
            document.getElementById('confirmpasss').innerHTML = "Fill Confirm Password";
            return false;
        }
        else if (confirmpasss.length < 5 || confirmpasss.length > 20) {
            document.getElementById('confirmpasss').innerHTML = "Confirm Password Should Be Between 5 and 20";
            return false;
        }
        else if (passwords != confirmpasss) {
            document.getElementById('confirmpasss').innerHTML = "Passwords Dont Match";
            return false;
        }
        else {
            document.getElementById('confirmpasss').innerHTML = "";
            return true;
        }
    }
    function departmentvalidation() {
        var departments = document.getElementById('department').value;
        if (departments == "") {
            document.getElementById('departments').innerHTML = "Fill Department";
            return false;
        }
        else {
            document.getElementById('departments').innerHTML = "";
            return true;
        }
    }
    function designationvalidation() {
        var designations = document.getElementById('designation').value;
        if (designations == "") {
            document.getElementById('designations').innerHTML = "Fill Designation";
            return false;
        }
        else {
            document.getElementById('designations').innerHTML = "";
            return true;
        }
    }
    function emailvalidation() {
        var emails = document.getElementById('email').value;
        if (emails == "") {
            document.getElementById('emails').innerHTML = "Fill Email";
            return false;
        }
        else if (emails.indexOf('@') <= 0) {
            document.getElementById('emails').innerHTML = "@ Is At Invalid position";
            return false;
        }
        else if ((emails.charAt(emails.length - 4) != '.') && (emails.charAt(emails.length - 3) != '.')) {
            document.getElementById('emails').innerHTML = ". Is At Invalid position";
            return false;
        }
        else {
            document.getElementById('emails').innerHTML = "";
            return true;
        }
    }
    function altemailvalidation() {
        var altemails = document.getElementById('altemail').value;
        if (altemails == "") {
            document.getElementById('altemails').innerHTML = "Fill Alternate Email";
            return false;
        }
        else if (altemails.indexOf('@') <= 0) {
            document.getElementById('altemails').innerHTML = "@ Is At Invalid position";
            return false;
        }
        else if ((altemails.charAt(altemails.length - 4) != '.') && (altemails.charAt(altemails.length - 3) != '.')) {
            document.getElementById('altemails').innerHTML = ". Is At Invalid position";
            return false;
        }
        else {
            document.getElementById('altemails').innerHTML = "";
            return true;
        }
    }
    function phone1validation() {
        var phone_number1s = document.getElementById('phone_number1').value;
        if (phone_number1s == "") {
            document.getElementById('phone_number1s').innerHTML = "Enter Contact Number";
            return false;
        }
        else if (isNaN(phone_number1s)) {
            document.getElementById('phone_number1s').innerHTML = "**Only Digits Allowed";
            return false;
        }
        else if (phone_number1s.length != 10) {
            document.getElementById('phone_number1s').innerHTML = "Enter 10 Digits";
            return false;
        }
        else {
            document.getElementById('phone_number1s').innerHTML = "";
            return true;
        }
    }
});
