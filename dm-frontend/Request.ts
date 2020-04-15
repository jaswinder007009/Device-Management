import { BASEURL } from "./globals";
import { Requests,Specification } from "./RequestModel";
let adminId = 16;
let sortDirection = "asc";

let globalUrl = BASEURL + "/request/";
function getPendingRequests(url: string) {

    var tableData = '';
    var specs = new Specification();
    fetch(url).then(Response => Response.json()).then(data => {
        for (var i = 0; i < data.length; i++) {
            tableData += "<tr>";
            var key, name = "";
            specs = data[i]['specs'];
            var deviceModel = data[i]['deviceModel'];
            var deviceType = data[i]['deviceType'];
            var deviceBrand = data[i]['deviceBrand'];
        
            for (var prop in data[i]) {
               
                var requestId: number = data[i]['requestId'];
                var value = data[i][prop];
                if (typeof (value) == 'object') {
                    for (key in value) {
                        var val = value[key];
						if(prop=="requestedBy"){
                        if (key == "salutation" || key == "firstName" || key == "middleName" || key == "lastName")
                            name += val + " ";
						}
                        

                        if (key == "lastName")
                            tableData += "<td>" + name + "</td>";
						if (prop == "specs")
                            if(key=="storage")
								tableData += "<td>" + specs.ram+", "+ specs.connectivity +",<br>"+specs.screenSize +"", "+specs.storage+ "</td>";
                    }
                }
                else {
                    key = prop;
                    if (key != "comment" && key != "requestId" && key != "noOfDays")
                        tableData += "<td>" + value + "</td>";

                    if (key == "availability" && value == true)
                        tableData += "<td>" + "<button class=\"accept-button\" data-requestid=\"" + requestId + "\" >Accept</button>" + "</td>";
                     else if(key =="availability" && value == false)
                     tableData += "<td>" + "<button class=\"notify-button\" data-devicemodel=\"" + deviceModel 
                   +"\"data-devicetype=\"" + deviceType + "\" data-devicebrand=\"" + deviceBrand 
                   +"\"data-ram=\"" + specs.ram
                   +"\"data-connectivity=\"" + specs.connectivity
                   +"\"data-screensize=\"" + specs.screenSize
                   +"\"data-storage=\"" + specs.storage +"\" >Notify</button>" + "</td>";
                   

                    }
            }

            tableData += "<td>" + "<button class=\"reject-button\" data-requestid=" + requestId + " >Reject</button>" + "</td>";

            tableData += "</tr>";
        }
        document.getElementById("content").innerHTML = tableData;

    });

}

function requestAction(requestUrl, requestId, action) {
    fetch(globalUrl + requestId+requestUrl);
    alert("Request " + requestId + " " + action);
    document.getElementById("content").innerHTML = "";
    getPendingRequests(globalUrl + "pending");

}

function getDirection(className, sortField) {
    if (className === "mdl-data-table__header--sorted-descending") {
        document.getElementById(sortField).setAttribute("class", "mdl-data-table__header--sorted-ascending");
        return "asc";
    }
    else {
        document.getElementById(sortField).setAttribute("class", "mdl-data-table__header--sorted-descending");
        return "desc";
    }
}

function postNotification(data:Requests)
{

    let data1 = JSON.stringify(data);
    fetch(BASEURL + "/api/Notification", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: data1,
    }).catch(Error => console.log(Error));
    alert("Notification sent");
}

(document.querySelector('#tablecol') as HTMLTableElement).addEventListener("click", function (e) {
    const sortField = (e.target as HTMLElement).getAttribute('name');
    const className = (document.getElementById(sortField) as HTMLTableRowElement).getAttribute("class");
    sortDirection = getDirection(className, sortField);
    document.getElementById("content").innerHTML = "";
    getPendingRequests(globalUrl + "pending?sortby=" + sortField + "&direction=" + sortDirection);

});

document.querySelector('#fixed-header-drawer-exp').addEventListener('input', function (e) {
    var searchField = (document.getElementById("fixed-header-drawer-exp") as HTMLInputElement).value;
    getPendingRequests(globalUrl + "pending?search=" + searchField);
});


document.addEventListener("click", function (e) {

    if ((e.target as HTMLButtonElement).className == "reject-button") {
        const data = (e.target as HTMLButtonElement).dataset.requestid;
        let requestId = parseInt(data, 10);
        requestAction('/reject?id=' + adminId, requestId, 'rejected');

    }
    if ((e.target as HTMLButtonElement).className == "accept-button") {
        const data = (e.target as HTMLButtonElement).dataset.requestid;
        let requestId = parseInt(data, 10);
        requestAction('/accept?id=' + adminId, requestId, 'accepted');

    }
    if((e.target as HTMLButtonElement).className == "notify-button")
    {
        let request = new Requests();
        request.deviceModel = (e.target as HTMLButtonElement).dataset.devicemodel;
        request.deviceBrand = (e.target as HTMLButtonElement).dataset.devicebrand;
        request.deviceType = (e.target as HTMLButtonElement).dataset.devicetype;
        request.specs.ram = ((e.target as HTMLButtonElement).dataset.ram);
        request.specs.connectivity = ((e.target as HTMLButtonElement).dataset.connectivity);
        request.specs.screenSize = ((e.target as HTMLButtonElement).dataset.screensize);
        request.specs.storage = ((e.target as HTMLButtonElement).dataset.storage);
         postNotification(request);

        (e.target as HTMLButtonElement).remove();
        
    }

});

// document.getElementById("content").innerHTML = "";
getPendingRequests(globalUrl + "pending");


