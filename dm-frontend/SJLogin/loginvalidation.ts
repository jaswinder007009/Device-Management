export function validationRegister() {

    var result = emailvalidation()*
    passwordvalidation()*
    confirmpasswordvalidation();
    return result == 1 ? true : false;

}
export function validationLogin(){
    var result =emailvalidation1()*passwordvalidation1();
    return result == 1 ? true : false;

}
// export function validationReset(){
//     var result2 =emailvalidation2();
//     return result2;
// }
// function emailvalidation2() {
//     var femails = document.getElementById('femail').value;
//     if (femails == "") {
//         document.getElementById('femails').innerHTML = "Please Fill Email";
//         return 0;
//     } else if (femails.indexOf('@') <= 0) {
//         document.getElementById('femails').innerHTML = "@ Is At Invalid position";
//         return 0;
//     } else if ((femails.charAt(femails.length - 4) != '.')) {
//         document.getElementById('femails').innerHTML = ". Is At Invalid position";
//         return 0;
//     } else {
//         document.getElementById('femails').innerHTML = "";
//         return 1; }
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
    var useremails = (document.getElementById('useremail') as HTMLInputElement).value;
    if (useremails == "") {
        document.getElementById('useremails').innerHTML = "Please Fill Email";
        return 0;
    } else if (useremails.indexOf('@') <= 0) {
        document.getElementById('useremails').innerHTML = "@ Is At Invalid position";
        return 0;
     } else {
            let str = useremails;
        str=str.toLowerCase();
        let st =str.split("@");
        if(st[1]!="ex2india.com"){
            document.getElementById('useremails').innerHTML = "Not A Valid Domain";
            return 0;
        }
            document.getElementById('useremails').innerHTML = "";
                return 1; 
}}
function passwordvalidation1() {
    var userpasswords = (document.getElementById('userpassword') as HTMLInputElement).value;
    if (userpasswords == "") {
        document.getElementById('userpasswords').innerHTML = "Please Fill Password";
        return 0;
    } else if (userpasswords.length < 5 || userpasswords.length > 20) {
        document.getElementById('userpasswords').innerHTML = "Password Should Be Between 5 and 20";
        return 0;
    } else {
        document.getElementById('userpasswords').innerHTML = "";
        return 1; }
}
function emailvalidation() {
    
    var emails = (document.getElementById('remail') as HTMLInputElement).value;
    if (emails == "") {
        document.getElementById('emails').innerHTML = "Please Fill Email";
        return 0;
    } else if (emails.indexOf('@') <= 0) {
        document.getElementById('emails').innerHTML = "@ Is At Invalid position";
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
}}

function passwordvalidation() {
    var passwords = (document.getElementById('rpassword') as HTMLInputElement).value;
    if (passwords == "") {
        document.getElementById('passwords').innerHTML = "Please Fill Password";
        return 0;
    } else if (passwords.length < 5 || passwords.length > 20) {
        document.getElementById('passwords').innerHTML = "Password Should Be Between 5 and 20";
        return 0;
    } else {
        document.getElementById('passwords').innerHTML = "";
        return 1; }
}
function confirmpasswordvalidation() {
    var passwords = (document.getElementById('rpassword') as HTMLInputElement).value;
    var confirmpasss = (document.getElementById('rpassword1') as HTMLInputElement).value;
    if (confirmpasss == "") {
        document.getElementById('confirmpasss').innerHTML = "Please Fill Confirm Password";
        return 0;
    } else if (confirmpasss.length < 5 || confirmpasss.length > 20) {
        document.getElementById('confirmpasss').innerHTML = "Confirm Password Should Be Between 5 and 20";
        return 0;
    } else if (passwords != confirmpasss) {
        document.getElementById('confirmpasss').innerHTML = "Passwords Dont Match";
        return 0;
    } else {
        document.getElementById('confirmpasss').innerHTML = "";
        return 1; }
}

