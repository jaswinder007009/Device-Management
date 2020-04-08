import { BASEURL } from './globals';
let role='Admin';
let email='abc@gmail.com';
let user_id=16;

// let role = 'User';
// let email = 'nchauhan@ex2india.com';
// let user_id = 67;


function getOverview(url: string) {
    fetch(url).then(Response => Response.json())
        .then(data => {
            for (var key in data)
                document.getElementById(key).innerHTML += data[key];
        });
}


getOverview(BASEURL + "/api/dashboard/statistics");
document.getElementById('email').innerHTML = email;
document.getElementById('userRole').innerHTML = role;

