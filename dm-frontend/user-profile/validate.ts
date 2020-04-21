export function validate() {
    return Firstnamevalidation() && Middlenamevalidation() &&
    Lastnamevalidation() &&
    emailvalidation()&&passwordvalidation()&&confirmpasswordvalidation()&&addressvalidation("addresses1")&&addressvalidation("addresses2")&&
    addressvalidation1("addresses1")&&addressvalidation1("addresses2")&&date0fbirthvalidation()&&
    pinvalidation("addresses1")&&pinvalidation("addresses2")&&phonevalidation("phones1")&&
    phonevalidation("phones3");
}
function Firstnamevalidation() {
    var firstnames = (document.getElementById('firstName') as HTMLInputElement).value;
    if (firstnames == "") {
        document.getElementById('firstnames').innerHTML = "Fill First Name";
        return false;
    } else if (firstnames.length > 20) {
        document.getElementById('firstnames').innerHTML = "FirstName Should Not Be More Than 20 Characters";
        return false;
    }
    else {
        document.getElementById('firstnames').innerHTML = "";
        return true;
    }
}
function Middlenamevalidation() {
    var middlenames = (document.getElementById('middleName') as HTMLInputElement).value;
    if (middlenames=="")
    {
        return true;
    }
     else if (middlenames.length > 20) {
        document.getElementById('middlenames').innerHTML = "MiddleName Should Not Be More Than 20 Characters";
        return false;
    }
    else {
        document.getElementById('middlenames').innerHTML = "";
        return true;
    }
}
function Lastnamevalidation() {
    var lastnames = (document.getElementById('lastName') as HTMLInputElement).value;
    if (lastnames == "") {
        document.getElementById('lastnames').innerHTML = "Fill Last Name";
        return false;
    } else if (lastnames.length > 20) {
        document.getElementById('lastnames').innerHTML = "LastName Should Not Be More Than 20 Characters";
        return false;
    }
    else {
        document.getElementById('lastnames').innerHTML = "";
        return true;
    }
}
function emailvalidation() {
    var emails = (document.getElementById('email') as HTMLInputElement).value;
    if (emails == "") {
        document.getElementById('emails').innerHTML = "Fill Email";
        return false;
    } else if (emails.indexOf('@') <= 0) {
        document.getElementById('emails').innerHTML = "@ Is At Invalid position";
        return false;
    } else if ((emails.charAt(emails.length - 4) != '.') && (emails.charAt(emails.length - 3) != '.')) {
        document.getElementById('emails').innerHTML = ". Is At Invalid position";
        return false;
    } else {
        document.getElementById('emails').innerHTML = "";
        return true;
    }
}
function date0fbirthvalidation() {
    var dobs= (document.getElementById('dob') as HTMLInputElement).value;
    if (dobs == "") {
        document.getElementById('dobs').innerHTML = "Fill date of birth";
        return false;
    } 
     else {
        document.getElementById('dobs').innerHTML = "";
        return true;
    }
}
function passwordvalidation() {
    var passwords = (document.getElementById('password') as HTMLInputElement).value;
    if(passwords=="")
    {
        return true;
    }
    else if (passwords.length < 5 || passwords.length > 20) {
        document.getElementById('passwords').innerHTML = "Password Should Be Between 5 and 20";
        return false;
    } else {
        document.getElementById('passwords').innerHTML = "";
        return true; }
}
function confirmpasswordvalidation() {

    var passwords = (document.getElementById('password') as HTMLInputElement).value;

    var confirmpasswords = (document.getElementById('confirmpassword') as HTMLInputElement).value;
    if(passwords=="")
    {
        return true;
    }
   
    if (confirmpasswords == "") {
        (document.getElementById('confirmpasswords') as HTMLInputElement).innerHTML = "Fill Confirm Password";
        return true;
    } else if (confirmpasswords.length < 5 || confirmpasswords.length > 20) {
        (document.getElementById('confirmpasswords') as HTMLInputElement).innerHTML = "Confirm Password Should Be Between 5 and 20";
        return false;
    } else if (passwords != confirmpasswords) {
        (document.getElementById('confirmpasswords') as HTMLInputElement).innerHTML = "Passwords Dont Match";
        return false;
    } else {
        (document.getElementById('confirmpasswords') as HTMLInputElement).innerHTML = "";
        return true;
    }
}
function addressvalidation(containerId: string) {
    var addresses1 = (document.querySelector("#" + containerId + ' .addressLine1') as HTMLInputElement).value;
    if (addresses1 == "") {
        document.querySelector("#" + containerId + ' .addressLine1span').innerHTML = "Fill  addresss line1";
        return false;
    } else if (addresses1.length > 30) {
        document.querySelector("#" + containerId + ' .addressLine1span').innerHTML = "addressline1 Should Not Be More Than 30 Characters";
        return false;
    }
    else {
        document.querySelector("#" + containerId + ' .addressLine1span').innerHTML = "";
        return true;
    }
}
function addressvalidation1(containerId: string) {
    var addresses2 = (document.querySelector("#" + containerId + ' .addressLine2') as HTMLInputElement).value;
    if (addresses2 == "") {
        return true;
    }
     else if (addresses2.length > 30) {
        document.querySelector("#" + containerId + ' .addressLine2span').innerHTML = "addressline2 Should Not Be More Than 30 Characters";
        return false;
    }
    else {
        document.querySelector("#" + containerId + ' .addressLine2span').innerHTML = "";
        return true;
    }
}
function pinvalidation(containerId: string) {
    var pin = (document.querySelector("#" + containerId + ' .pin') as HTMLInputElement).value;
     if (isNaN(parseInt(pin))) {
        document.querySelector("#" + containerId + ' .pinspan').innerHTML = "pincode must be in digit";
        return false;
    }
    else {
        document.querySelector("#" + containerId + ' .pinspan').innerHTML = "";
        return true;
    }
}
function phonevalidation(containerId: string) {
    var phone = (document.querySelector("#" + containerId + ' .number') as HTMLInputElement).value;
    if ((phone=="")) {
        return true;
    }
    else if (isNaN(parseInt(phone))) {
        document.querySelector("#" + containerId + ' .numberspan').innerHTML = "**Only Digits Allowed";
        return false;
    } else if (phone.length != 10) {
        document.querySelector("#" + containerId + ' .numberspan').innerHTML = "Enter 10 Digits";
        return false;
    } else {
        document.querySelector("#" + containerId + ' .numberspan').innerHTML = "";
        return true;}
}