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
}).then(response => response.json()).then(json => {
    console.log("jwt token : "+ json.token);
    console.log(parseJwt(json.token));
    localStorage.setItem("jwttoken",json.token );
}).catch(err=>{console.log(err)});
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
    



document.querySelector("#mybtn").addEventListener('click',function(e) 
{
e.preventDefault();
LoginUser();
});
document.querySelector("#rmybtn").addEventListener('click',function(e) 
{
e.preventDefault();
RegisterUser();
});
document.querySelector("#fp").addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('.bg-model').style.display = 'flex' ;
});
document.querySelector('.x').addEventListener('click',
function(){
    document.querySelector('.bg-model').style.display='none';
});