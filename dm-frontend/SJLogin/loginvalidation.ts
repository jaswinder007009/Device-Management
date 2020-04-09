export function validationRegister() {

var result = emailvalidation()*
passwordvalidation()*
confirmpasswordvalidation();
return result;

}
export function validationLogin(){
    var result1 =emailvalidation1()*passwordvalidation1();
    return result1;

}
// export function validationReset(){
//     var result2 =emailvalidation2();
//     return result2;
// }
// function emailvalidation2() {
//     var femails = document.getElementById('femail').value;
//     if (femails == "") {
//         document.getElementById('femails').innerHTML = "Please Fill Email";
//         return false;
//     } else if (femails.indexOf('@') <= 0) {
//         document.getElementById('femails').innerHTML = "@ Is At Invalid position";
//         return false;
//     } else if ((femails.charAt(femails.length - 4) != '.')) {
//         document.getElementById('femails').innerHTML = ". Is At Invalid position";
//         return false;
//     } else {
//         document.getElementById('femails').innerHTML = "";
//         return true; }
// }
// export function remove1() {
//     (document.getElementById('useremails') as HTMLInputElement).innerHTML = "";
//     (document.getElementById('userpasswords') as HTMLInputElement).innerHTML = "";
//     (document.getElementById('emails') as HTMLInputElement).innerHTML = "";
//     (document.getElementById('passwords') as HTMLInputElement).innerHTML = "";
//     (document.getElementById('confirmpasss') as HTMLInputElement).innerHTML = "";
//   //  (document.getElementById('confirmpasss') as HTMLInputElement).innerHTML = "";
//   //  (document.getElementById('phone_number1s') as HTMLInputElement).innerHTML = "";
// }

function emailvalidation1() {
    var useremails = document.getElementById('useremail').value;
    if (useremails == "") {
        document.getElementById('useremails').innerHTML = "Please Fill Email";
        return false;
    } else if (useremails.indexOf('@') <= 0) {
        document.getElementById('useremails').innerHTML = "@ Is At Invalid position";
        return false;
     } else {
            let str = useremails;
        str=str.toLowerCase();
        let st =str.split("@");
        if(st[1]!="ex2india.com"){
            document.getElementById('useremails').innerHTML = "Not A Valid Domain";
            return false;
        }
            document.getElementById('useremails').innerHTML = "";
                return true; 
}}
function passwordvalidation1() {
    var userpasswords = document.getElementById('userpassword').value;
    if (userpasswords == "") {
        document.getElementById('userpasswords').innerHTML = "Please Fill Password";
        return false;
    } else if (userpasswords.length < 5 || userpasswords.length > 20) {
        document.getElementById('userpasswords').innerHTML = "Password Should Be Between 5 and 20";
        return false;
    } else {
        document.getElementById('userpasswords').innerHTML = "";
        return true; }
}
function emailvalidation() {
    
    var emails = document.getElementById('remail').value;
    if (emails == "") {
        document.getElementById('emails').innerHTML = "Please Fill Email";
        return false;
    } else if (emails.indexOf('@') <= 0) {
        document.getElementById('emails').innerHTML = "@ Is At Invalid position";
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
}}

function passwordvalidation() {
    var passwords = document.getElementById('rpassword').value;
    if (passwords == "") {
        document.getElementById('passwords').innerHTML = "Please Fill Password";
        return false;
    } else if (passwords.length < 5 || passwords.length > 20) {
        document.getElementById('passwords').innerHTML = "Password Should Be Between 5 and 20";
        return false;
    } else {
        document.getElementById('passwords').innerHTML = "";
        return true; }
}
function confirmpasswordvalidation() {
    var passwords = document.getElementById('rpassword').value;
    var confirmpasss = document.getElementById('rpassword1').value;
    if (confirmpasss == "") {
        document.getElementById('confirmpasss').innerHTML = "Please Fill Confirm Password";
        return false;
    } else if (confirmpasss.length < 5 || confirmpasss.length > 20) {
        document.getElementById('confirmpasss').innerHTML = "Confirm Password Should Be Between 5 and 20";
        return false;
    } else if (passwords != confirmpasss) {
        document.getElementById('confirmpasss').innerHTML = "Passwords Dont Match";
        return false;
    } else {
        document.getElementById('confirmpasss').innerHTML = "";
        return true; }
}

