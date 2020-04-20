import { validationRegister} from "./loginvalidation";
import { validationLogin} from "./loginvalidation";
//import { remove1} from "./loginvalidation";
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};


function  LoginUser()
{
 let useremail=(window.document.getElementById("useremail") as HTMLInputElement ).value;
 let userpassword=(window.document.getElementById("userpassword") as HTMLInputElement ).value;

 fetch("http://localhost:5000/api/auth/login", { 
    method: "POST", 
    body: JSON.stringify({ 
        email: useremail, 
        password: userpassword, 
    }), 
    headers: { 
        "Content-type": "application/json; charset=UTF-8"
    } 
}).then(response => {
    console.log(response);
    window.location.href=response.url;
})
.catch(err=>{console.log(err)});
}
function RegisterUser()
{
    let remail=(window.document.getElementById("remail") as HTMLInputElement ).value;
    let rpassword=(window.document.getElementById("rpassword") as HTMLInputElement ).value;
    console.log(remail+"  "+rpassword)
    fetch("http://localhost:5000/api/auth/register", { 
        method: "POST", 
        body: JSON.stringify({ 
            email: remail, 
            password: rpassword, 
        }), 
        headers: { 
            "Content-type": "application/json; charset=UTF-8"
        } 
    }).then(response => response.json()).catch(err=>{console.log(err)});
    }

  function SendEmail()
  {
      let email = (window.document.getElementById("femail") as HTMLInputElement ).value;
      console.log(email);
      fetch("http://localhost:5000/api/auth/Reset", { 
          method: "POST", 
          body: JSON.stringify({ 
              Email: email, 
              }), 
          headers: { 
              "Content-type": "application/json; charset=UTF-8"
          } 
      }).catch(err=>{console.log(err)});
}


    
    



document.querySelector("#mybtn").addEventListener('click',function(e) 
{
e.preventDefault();
if(validationLogin()==true)
{
    LoginUser();
}
else {
    return false;
}

});
document.querySelector("#rmybtn").addEventListener('click',function(e) 
{
e.preventDefault();
if(validationRegister()==true)
{
    RegisterUser();
  
}
else {
    return false;
}
});


document.querySelector("#fp").addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('.bg-model').style.display = 'flex' ;
});
document.querySelector('.x').addEventListener('click',
function(){
    document.querySelector('.bg-model').style.display='none';
});
document.querySelector("#rmybtn1").addEventListener('click', function (e) {
    e.preventDefault();
    SendEmail();
});







let password = document.querySelector('input[type="password"]');

password.addEventListener('focus', (a) => {
 document.getElementById('userpasswords').innerHTML = ""; 
});



let email = document.querySelector('input[type="text"]');

email.addEventListener('focus', (b) => {
 document.getElementById('useremails').innerHTML = ""; });




 let remail = document.querySelector('input[type="text"]');

 remail.addEventListener('focus', (c) => {
 document.getElementById('emails').innerHTML = ""; });



 
 let rpassword = document.querySelector('input[type="password"]');

 rpassword.addEventListener('focus', (d) => {
 document.getElementById('passwords').innerHTML = ""; 
 document.getElementById('confirmpasss').innerHTML = ""; 
});
