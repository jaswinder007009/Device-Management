export function validateForm(formMode:string) {
    
    var result= firstNamevalidation()*
    passwordvalidation(formMode)*
    confirmpasswordvalidation(formMode)*
    departmentvalidation()*
    designationvalidation()*
    emailvalidation()*
    phone1validation()*
    dob()*doj()*ac()*currAdd1()*
    currAdd2()*lastNamevalidation()*pincode()*currState()*currCity();
return result == 1 ? true : false;
}
export function remove() {
    (document.getElementById('firstNames') as HTMLInputElement).innerHTML = "";
    (document.getElementById('passwords') as HTMLInputElement).innerHTML = "";
    (document.getElementById('confirmpasss') as HTMLInputElement).innerHTML = "";
    (document.getElementById('departments') as HTMLInputElement).innerHTML = "";
    (document.getElementById('designations') as HTMLInputElement).innerHTML = "";
    (document.getElementById('emails') as HTMLInputElement).innerHTML = "";
    (document.getElementById('phone_number1s') as HTMLInputElement).innerHTML = "";
    (document.getElementById('dobs') as HTMLInputElement).innerHTML = "";
    (document.getElementById('dojs') as HTMLInputElement).innerHTML = "";
    (document.getElementById('acs') as HTMLInputElement).innerHTML = "";
    (document.getElementById('c1s') as HTMLInputElement).innerHTML = "";
    (document.getElementById('c2s') as HTMLInputElement).innerHTML = "";
    (document.getElementById('c3s') as HTMLInputElement).innerHTML = "";
    (document.getElementById('lastNames') as HTMLInputElement).innerHTML = "";
   (document.getElementById('c4s') as HTMLInputElement).innerHTML = "";
    (document.getElementById('c5s') as HTMLInputElement).innerHTML = "";
}
function firstNamevalidation() {

    var firstNames = (document.getElementById('firstName') as HTMLInputElement).value;
    if (firstNames == "") {
        (document.getElementById('firstNames') as HTMLInputElement).innerHTML = "Fill First Name";
        return 0;
    }else if (firstNames.length < 5 || firstNames.length > 20) {
        (document.getElementById('firstNames') as HTMLInputElement).innerHTML = "First Name Should Be Between 5 and 20";
        return 0;
    }
     else {
        (document.getElementById('firstNames') as HTMLInputElement).innerHTML = "";
        return 1;
    }
}
function lastNamevalidation() {

    var lastNames = (document.getElementById('lastName') as HTMLInputElement).value;
    if (lastNames == "") {
        (document.getElementById('lastNames') as HTMLInputElement).innerHTML = "Fill Last Name";
        return 0;
    }else if (lastNames.length < 5 || lastNames.length > 20) {
        (document.getElementById('lastNames') as HTMLInputElement).innerHTML = "Last Name Should Be Between 5 and 20";
        return 0;
    }
     else {
        (document.getElementById('lastNames') as HTMLInputElement).innerHTML = "";
        return 1;
    }
}
function passwordvalidation(formMode : string) {

    var passwords = (document.getElementById('password') as HTMLInputElement).value;
    if(formMode=="edit" && passwords=="")
        passwords="123#abc#45";
    if (passwords == "") {
        (document.getElementById('passwords') as HTMLInputElement).innerHTML = "Fill Password";
        return 0;
    } else if (passwords.length < 5 || passwords.length > 20) {
        (document.getElementById('passwords') as HTMLInputElement).innerHTML = "Password Should Be Between 5 and 20";
        return 0;
    } else {
        (document.getElementById('passwords') as HTMLInputElement).innerHTML = "";
        return 1;
    
    }
}
function confirmpasswordvalidation(formMode : string) {

    var passwords = (document.getElementById('password') as HTMLInputElement).value;

    var confirmpasss = (document.getElementById('confirmpass') as HTMLInputElement).value;
    if(formMode=="edit" && passwords=="" && confirmpasss=="")
    passwords=confirmpasss="w3e4r5t6y7";
    if (confirmpasss == "") {
        (document.getElementById('confirmpasss') as HTMLInputElement).innerHTML = "Fill Confirm Password";
        return 0;
    } else if (confirmpasss.length < 5 || confirmpasss.length > 20) {
        (document.getElementById('confirmpasss') as HTMLInputElement).innerHTML = "Confirm Password Should Be Between 5 and 20";
        return 0;
    } else if (passwords != confirmpasss) {
        (document.getElementById('confirmpasss') as HTMLInputElement).innerHTML = "Passwords Dont Match";
        return 0;
    } else {
        (document.getElementById('confirmpasss') as HTMLInputElement).innerHTML = "";
        return 1;
    }
}
function departmentvalidation() {
    var departments = (document.getElementById('department') as HTMLInputElement).value;
    if (departments == "") {
        (document.getElementById('departments') as HTMLInputElement).innerHTML = "Fill Department";
        return 0;
    } else {
        (document.getElementById('departments') as HTMLInputElement).innerHTML = "";
        return 1;
    }
}
function designationvalidation() {
    var designations = (document.getElementById('designationName') as HTMLInputElement).value;
    if (designations == "") {
        (document.getElementById('designations') as HTMLInputElement).innerHTML = "Fill Designation After Selecting Department";
        return 0;
    } else {
        (document.getElementById('designations') as HTMLInputElement).innerHTML = "";
        return 1;
    }
}
function dob(){
    var dobs = (document.getElementById('dob') as HTMLInputElement).value;
    if (dobs == "") {
        (document.getElementById('dobs') as HTMLInputElement).innerHTML = "Fill Date Of Birth";
        return 0;
    } else {
        (document.getElementById('dobs') as HTMLInputElement).innerHTML = "";
        return 1;
    }
}
function doj(){
    var dojs = (document.getElementById('doj') as HTMLInputElement).value;
    if (dojs == "") {
        (document.getElementById('dojs') as HTMLInputElement).innerHTML = "Fill Date Of Joining";
        return 0;
    } else {
        (document.getElementById('dojs') as HTMLInputElement).innerHTML = "";
        return 1;
    }
}
function ac(){
    var acs = (document.getElementById('ac') as HTMLInputElement).value;
    if (acs == "") {
        (document.getElementById('acs') as HTMLInputElement).innerHTML = "Fill Area Code";
        return 0;
    }else if (isNaN(parseInt(acs))) {
        (document.getElementById('acs')as HTMLInputElement).innerHTML = "**Only Digits Allowed";
        return 0;
    } 
     else {
        (document.getElementById('acs') as HTMLInputElement).innerHTML = "";
        return 1;
    }
}
function currAdd1(){
    var c1s = (document.getElementById('c1') as HTMLInputElement).value;
    if (c1s == "") {
        (document.getElementById('c1s') as HTMLInputElement).innerHTML = "Fill Address Line 1";
        return 0;
    } else {
        (document.getElementById('c1s') as HTMLInputElement).innerHTML = "";
        return 1;
    }
}
function currAdd2(){
    var c2s = (document.getElementById('c2') as HTMLInputElement).value;
    if (c2s == "") {
        (document.getElementById('c2s') as HTMLInputElement).innerHTML = "Fill Address Line 2";
        return 0;
    } else {
        (document.getElementById('c2s') as HTMLInputElement).innerHTML = "";
        return 1;
    }
}
function currState(){
    var c5s = (document.getElementById('c5') as HTMLSelectElement).value;
    if (c5s == "") {
        (document.getElementById('c5s') as HTMLInputElement).innerHTML = "Select Country And Then Select State";
        return 0;
    } else {
        (document.getElementById('c5s') as HTMLInputElement).innerHTML = "";
        return 1;
    }
}
function currCity(){
    var c4s = (document.getElementById('c4') as HTMLSelectElement).value;
    if (c4s == "") {
        (document.getElementById('c4s') as HTMLInputElement).innerHTML = "Select State And Then Select City";
        return 0;
    } else {
        (document.getElementById('c4s') as HTMLInputElement).innerHTML = "";
        return 1;
    }
}
function pincode(){
    var c3s = (document.getElementById('c3') as HTMLInputElement).value;
    if (c3s == "") {
        (document.getElementById('c3s') as HTMLInputElement).innerHTML = "Fill Pincode";
        return 0;
    }else if (isNaN(parseInt(c3s))) {
        (document.getElementById('c3s')as HTMLInputElement).innerHTML = "**Only Digits Allowed";
        return 0;
    } 
    else {
        (document.getElementById('c3s') as HTMLInputElement).innerHTML = "";
        return 1;
    }
}
function emailvalidation() {
    var emails = (document.getElementById('email') as HTMLInputElement).value;
    if (emails == "") {
        (document.getElementById('emails') as HTMLInputElement).innerHTML = "Fill Email";
        return 0;
    }else if (emails.indexOf('@') <= 0) {
        document.getElementById('useremails').innerHTML = "@ Is At Invalid position";
        return 0;
     } else {
            let str = emails;
        str=str.toLowerCase();
        let st =str.split("@");
        if(st[1]!="ex2india.com"){
            document.getElementById('emails').innerHTML = "Not A Valid Domain";
            return 0;
        }
            document.getElementById('emails').innerHTML = "";
                return 1; 
        }
    }
function phone1validation() {
    var phone_number1s = (document.getElementById('phone_number1') as HTMLInputElement).value;
    if (phone_number1s == "") {
        (document.getElementById('phone_number1s') as HTMLInputElement).innerHTML = "Enter Contact Number";
        return 0;
    } 
    else if (isNaN(parseInt(phone_number1s))) {
        (document.getElementById('phone_number1s')as HTMLInputElement).innerHTML = "**Only Digits Allowed";
        return 0;
    }
    else if (phone_number1s.length != 10) {
        (document.getElementById('phone_number1s') as HTMLInputElement).innerHTML = "Enter 10 Digits";
        return 0;
    }
     else {
        (document.getElementById('phone_number1s') as HTMLInputElement).innerHTML = "";
        return 1;
    }
}