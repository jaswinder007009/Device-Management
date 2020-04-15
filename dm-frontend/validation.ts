export function validateForm(formMode:string) {
 
    var result= firstNamevalidation()*
    passwordvalidation(formMode)*
    confirmpasswordvalidation(formMode)*
    departmentvalidation()*
    designationvalidation()*
    emailvalidation()*
    phone1validation();
return result;
}
export function remove() {
    (document.getElementById('firstNames') as HTMLInputElement).innerHTML = "";
    (document.getElementById('passwords') as HTMLInputElement).innerHTML = "";
    (document.getElementById('confirmpasss') as HTMLInputElement).innerHTML = "";
    (document.getElementById('departments') as HTMLInputElement).innerHTML = "";
    (document.getElementById('designations') as HTMLInputElement).innerHTML = "";
    (document.getElementById('emails') as HTMLInputElement).innerHTML = "";
    (document.getElementById('phone_number1s') as HTMLInputElement).innerHTML = "";
}
function firstNamevalidation() {

    var passwords = (document.getElementById('firstName') as HTMLInputElement).value;
    if (passwords == "") {
        (document.getElementById('firstNames') as HTMLInputElement).innerHTML = "Fill First Name";
        return false;
    } else {
        (document.getElementById('firstNames') as HTMLInputElement).innerHTML = "";
        return true;
    }
}

function passwordvalidation(formMode : string) {

    var passwords = (document.getElementById('password') as HTMLInputElement).value;
    if(formMode=="edit" && passwords=="")
        passwords="123#abc#45";
    if (passwords == "") {
        (document.getElementById('passwords') as HTMLInputElement).innerHTML = "Fill Password";
        return false;
    } else if (passwords.length < 5 || passwords.length > 20) {
        (document.getElementById('passwords') as HTMLInputElement).innerHTML = "Password Should Be Between 5 and 20";
        return false;
    } else {
        (document.getElementById('passwords') as HTMLInputElement).innerHTML = "";
        return true;
    
    }
}
function confirmpasswordvalidation(formMode : string) {

    var passwords = (document.getElementById('password') as HTMLInputElement).value;

    var confirmpasss = (document.getElementById('confirmpass') as HTMLInputElement).value;
    if(formMode=="edit" && passwords=="" && confirmpasss=="")
    passwords=confirmpasss="w3e4r5t6y7";
    if (confirmpasss == "") {
        (document.getElementById('confirmpasss') as HTMLInputElement).innerHTML = "Fill Confirm Password";
        return false;
    } else if (confirmpasss.length < 5 || confirmpasss.length > 20) {
        (document.getElementById('confirmpasss') as HTMLInputElement).innerHTML = "Confirm Password Should Be Between 5 and 20";
        return false;
    } else if (passwords != confirmpasss) {
        (document.getElementById('confirmpasss') as HTMLInputElement).innerHTML = "Passwords Dont Match";
        return false;
    } else {
        (document.getElementById('confirmpasss') as HTMLInputElement).innerHTML = "";
        return true;
    }
}
function departmentvalidation() {
    var departments = (document.getElementById('department') as HTMLInputElement).value;
    if (departments == "") {
        (document.getElementById('departments') as HTMLInputElement).innerHTML = "Fill Department";
        return false;
    } else {
        (document.getElementById('departments') as HTMLInputElement).innerHTML = "";
        return true;
    }
}
function designationvalidation() {
    var designations = (document.getElementById('designationName') as HTMLInputElement).value;
    if (designations == "") {
        (document.getElementById('designations') as HTMLInputElement).innerHTML = "Fill Designation";
        return false;
    } else {
        (document.getElementById('designations') as HTMLInputElement).innerHTML = "";
        return true;
    }
}
function emailvalidation() {
    var emails = (document.getElementById('email') as HTMLInputElement).value;
    if (emails == "") {
        (document.getElementById('emails') as HTMLInputElement).innerHTML = "Fill Email";
        return false;
    }else if (emails.indexOf('@') <= 0) {
        document.getElementById('useremails').innerHTML = "@ Is At Invalid position";
        return false;
     } else {
            let str = emails;
        str=str.toLowerCase();
        let st =str.split("@");
        if(st[1]!="ex2india.com"){
            document.getElementById('emails').innerHTML = "Not A Valid Domain";
            return false;
        }
            document.getElementById('emails').innerHTML = "";
                return true; 
        }
    }
function phone1validation() {
    var phone_number1s = (document.getElementById('phone_number1') as HTMLInputElement).value;
    if (phone_number1s == "") {
        (document.getElementById('phone_number1s') as HTMLInputElement).innerHTML = "Enter Contact Number";
        return false;
    } 
    else if (isNaN(phone_number1s)) {
        (document.getElementById('phone_number1s')as HTMLInputElement).innerHTML = "**Only Digits Allowed";
        return false;
    }
    else if (phone_number1s.length != 10) {
        (document.getElementById('phone_number1s') as HTMLInputElement).innerHTML = "Enter 10 Digits";
        return false;
    }
     else {
        (document.getElementById('phone_number1s') as HTMLInputElement).innerHTML = "";
        return true;
    }
}