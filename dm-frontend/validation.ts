export function validateForm() {
    
    
    passwordvalidation();
    confirmpasswordvalidation();
    departmentvalidation();
    designationvalidation();
    emailvalidation();
   
    phone1validation();
   
    if(passwordvalidation()==true&&confirmpasswordvalidation()==true
    &&departmentvalidation()==true&&designationvalidation()==true&&emailvalidation()==true
   &&phone1validation()==true)
    {
        
        return true;
        }
    else {
           
            return false;
        }
    ​
    }
    ​
    function passwordvalidation() {
        
        var passwords = (document.getElementById('password')as HTMLInputElement).value;
        if (passwords == "") {
            (document.getElementById('passwords')as HTMLInputElement).innerHTML = "Fill Password";
            return false;
        } else if (passwords.length < 5 || passwords.length > 20) {
            (document.getElementById('passwords')as HTMLInputElement).innerHTML = "Password Should Be Between 5 and 20";
            return false;
        } else {
            (document.getElementById('passwords')as HTMLInputElement).innerHTML = "";
            return true; }
    }
    function confirmpasswordvalidation() {
        var passwords = (document.getElementById('password')as HTMLInputElement).value;
        var confirmpasss = (document.getElementById('confirmpass')as HTMLInputElement).value;
        if (confirmpasss == "") {
            (document.getElementById('confirmpasss')as HTMLInputElement).innerHTML = "Fill Confirm Password";
            return false;
        } else if (confirmpasss.length < 5 || confirmpasss.length > 20) {
            (document.getElementById('confirmpasss')as HTMLInputElement).innerHTML = "Confirm Password Should Be Between 5 and 20";
            return false;
        } else if (passwords != confirmpasss) {
            (document.getElementById('confirmpasss')as HTMLInputElement).innerHTML = "Passwords Dont Match";
            return false;
        } else {
            (document.getElementById('confirmpasss')as HTMLInputElement).innerHTML = "";
            return true; }
    }
    function departmentvalidation() {
        var departments = (document.getElementById('department')as HTMLInputElement).value;
        if (departments == "") {
            (document.getElementById('departments')as HTMLInputElement).innerHTML = "Fill Department";
            return false;
        } else {
            (document.getElementById('departments')as HTMLInputElement).innerHTML = "";
            return true;}
    }
    function designationvalidation() {
        var designations = (document.getElementById('designation')as HTMLInputElement).value;
        if (designations == "") {
            (document.getElementById('designations')as HTMLInputElement).innerHTML = "Fill Designation";
            return false;
        } else {
            (document.getElementById('designations')as HTMLInputElement).innerHTML = "";
            return true;}
    }
    function emailvalidation() {
        var emails = (document.getElementById('email')as HTMLInputElement).value;
        if (emails == "") {
            (document.getElementById('emails')as HTMLInputElement).innerHTML = "Fill Email";
            return false;
        } else if (emails.indexOf('@') <= 0) {
            (document.getElementById('emails')as HTMLInputElement).innerHTML = "@ Is At Invalid position";
            return false;
        } else if ((emails.charAt(emails.length - 4) != '.') && (emails.charAt(emails.length - 3) != '.')) {
            (document.getElementById('emails')as HTMLInputElement).innerHTML = ". Is At Invalid position";
            return false;
        } else {
            (document.getElementById('emails')as HTMLInputElement).innerHTML = "";
            return true; }
    }
    function altemailvalidation() {
        var altemails = (document.getElementById('altemail')as HTMLInputElement).value;
        if (altemails == "") {
            (document.getElementById('altemails')as HTMLInputElement).innerHTML = "Fill Alternate Email";
            return false;
        } else if (altemails.indexOf('@') <= 0) {
            (document.getElementById('altemails')as HTMLInputElement).innerHTML = "@ Is At Invalid position";
            return false;
        } else if ((altemails.charAt(altemails.length - 4) != '.') && (altemails.charAt(altemails.length - 3) != '.')) {
            (document.getElementById('altemails')as HTMLInputElement).innerHTML = ". Is At Invalid position";
            return false;
        } else {
            (document.getElementById('altemails')as HTMLInputElement).innerHTML = "";
            return true;}
    }
    function phone1validation() {
        var phone_number1s = (document.getElementById('phone_number1')as HTMLInputElement).value;
        if (phone_number1s == "") {
            (document.getElementById('phone_number1s')as HTMLInputElement).innerHTML = "Enter Contact Number";
            return false;
        } else if (phone_number1s.length != 10) {
            (document.getElementById('phone_number1s')as HTMLInputElement).innerHTML = "Enter 10 Digits";
            return false;
        } else {
            (document.getElementById('phone_number1s')as HTMLInputElement).innerHTML = "";
            return true;}
    }