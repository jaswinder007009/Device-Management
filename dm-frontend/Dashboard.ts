import { BASEURL, amIAdmin, amIUser, navigationBarsss } from './globals';

(async function () {
 
    const url = new URL(window.location.href);
    let token, id;
    if (url.searchParams.has("token") && url.searchParams.has("id")) {
        token = url.searchParams.get("token");
        id = url.searchParams.get("id");
        sessionStorage.setItem("user_info", JSON.stringify({ token, id }));
    }
    id = JSON.parse(sessionStorage.getItem("user_info"))["id"];
    token = JSON.parse(sessionStorage.getItem("user_info"))["token"];

    let role = await amIUser(token) == true ? "User" : "Admin";

    (function () {
        if (role == "Admin") {
            (document.getElementById("submissionNotification") as HTMLSpanElement).innerText = "check_circle";
        }
    })();

    document.querySelector("#submissionNotification").addEventListener('click', e => {
        if (role == "Admin") {
            window.location.href = "./submissionRequestPage.html";
        }
    });
    function createCard(cardData,action) {
        let cardCreationCode="<button class='mdl-color--blue-grey-200' id='card' data-card=" + action +">"+cardData+ "</button>";
        document.getElementById("content").innerHTML += cardCreationCode;
    }

    function createTable(tableTitle: string, tableHeading: string, tableBody: string) {
        var tableData = "<br><br><table class='mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp mdl-color-text--blue-grey-800'>"
            + "<thead class='mdl-color--blue-grey-400'>"
            + "<tr>" + tableTitle + "</tr>"
            + "<tr class='mdl-color--blue-grey-300'>" + tableHeading + "</tr>"
            + "</thead>"
            + "<tbody>" + tableBody + "</tbody>"
            + "</table>";
        document.getElementById("content").innerHTML += tableData;

    }

    function getStatistics(url: string) {
        fetch(url, {
            headers: new Headers({ "Authorization": `Bearer ${token}` })
        }).then(Response => Response.json())
            .then(data => {
                createCard("Total Devices:"+ data.totalDevices,"total");
                createCard("Free Devices:" + data.freeDevices,"free");
                if (role == "Admin") {
                    createCard("Assigned Devices:" + data.assignedDevices,"allocated");
                    createCard("Requests Rejected:" + data.rejectedRequests,"history");
                    createCard("Total Requests:" + data.deviceRequests,"requests");
                    createCard("Total Faults:"+ data.faults,"faults");
                }
                if (role == "User") {
                    createCard("Total Requests:" + data.deviceRequests,"");
                    createCard("Total Faults:"+ data.faults,"");
                }
            });

    }

    function getFaults(url: string) {

        var tableTitle = "<TH COLSPAN='3'><center><a href='/faultyDevice/faultdevice.html'>FAULTS</a></center></th>";
        var tableHeading = "";
        tableHeading += "<th>Type</th>"
            + "<th>Model</th>"
            + "<th>Fault</th>";
        var tableBody = "";
        fetch(url, {
            headers: new Headers({ "Authorization": `Bearer ${token}` })
        }).then(Response => Response.json())
            .then(data => {
                for (var i = 0; i < data.length; i++) {
                    let tempObject = data[i];

                    tableBody += "<tr>"
                        + "<td>" + tempObject.deviceType + "</td>"
                        + "<td>" + tempObject.deviceModel + "</td>"
                        + "<td>" + tempObject.faultDescription + "</td>"
                        + "</tr>"
                }
                createTable(tableTitle, tableHeading, tableBody);
            });

    }

    function getDeviceReturnDates(url: string) {
        var tableTitle = "<TH COLSPAN='3'><center><a href='/userRequestHistory.html'>DEVICE RETURN DATES</a></center></th>";
        var tableHeading = "";
        tableHeading += "<th>Type</th>"
            + "<th>Model</th>"
            + "<th>Return Date</th>";
        var tableBody = "";
        fetch(url, {
            headers: new Headers({ "Authorization": `Bearer ${token}` })
        }).then(Response => Response.json())
            .then(data => {
                for (var i = 0; i < data.length; i++) {
                    let tempObject = data[i];

                    tableBody += "<tr>"
                        + "<td>" + tempObject.deviceType + "</td>"
                        + "<td>" + tempObject.deviceModel + "</td>"
                        + "<td>" + tempObject.returnDate + "</td>"
                        + "</tr>"
                }
                createTable(tableTitle, tableHeading, tableBody);
            });

    }
    function getHistory(url: string) {
        console.log(url);
        var tableTitle = "<TH COLSPAN='3'><center>MY HISTORY</center></th>";
        var tableHeading = "";
        tableHeading += "<th>Type</th>"
            + "<th>Brand</th>"
            + "<th>Model</th>";
        var tableBody = "";
        fetch(url, {
            headers: new Headers({ "Authorization": `Bearer ${token}` })
        }).then(Response => Response.json())
            .then(data => {
                for (var i = 0; i < data.length; i++) {
                    let tempObject = data[i];
                    if (tempObject.assign_date != '')
                        tableBody += "<tr>"
                            + "<td>" + tempObject.type + "</td>"
                            + "<td>" + tempObject.brand + "</td>"
                            + "<td>" + tempObject.model + "</td>"
                            + "</tr>";
                }
                createTable(tableTitle, tableHeading, tableBody);
            });

    }
    function getPendingRequests(url: string) {

        var tableTitle = "<TH COLSPAN='4'><center>REQUESTS</center></th>";
        var tableHeading = "";
        tableHeading += "<th>User Id</th>"
            + "<th>Type</th>"
            + "<th>Model</th>"
        var tableBody = "";
        fetch(url, {
            headers: new Headers({ "Authorization": `Bearer ${token}` })
        }).then(Response => Response.json())
            .then(data => {
                for (var i = 0; i < data.length; i++) {
                    let tempObject = data[i];

                    tableBody += "<tr>"
                        + "<td class=''>" + tempObject.userId + "</td>"
                        + "<td>" + tempObject.deviceType + "</td>"
                        + "<td>" + tempObject.deviceModel + "</td>"
                        + "</tr>"
                }
                createTable(tableTitle, tableHeading, tableBody);
            });

    }
    navigationBarsss(role, "navigation");

    document.getElementById("notifications").addEventListener('click', function (e) {
        window.location.href = "./notifiication.html";
    })
    document.getElementById("logout").addEventListener('click', function (e) {
        sessionStorage.clear();
        window.location.href = "/SJLogin/LoginRegiter.html";
    })
    
    document.addEventListener("click", function (e) {
        let action = (e.target as HTMLButtonElement).dataset.card;
        if(action=="total")
            window.open("/deviceListForadmin.html","_self");
        if(action=="faults")
            window.open("/faultyDevice/faultdevice.html","_self");
        if(action=="requests")
            window.open("/adminRequestPage.html","_self");
        /*if(action=="history"){
            //Get all rejected requests
        }   
        if(action=="free"){
            //Get all free devices
        }    
        if(action=="allocated"){
            //Get all allocated devices
        }*/
        

    });

    document.getElementById('role').innerHTML = role;
    if (role == 'User') {
        getStatistics(BASEURL + "/api/dashboard/statistics");
        getDeviceReturnDates(BASEURL + "/api/dashboard/" + id + "/returndates");
        getHistory(BASEURL + "/api/device/previous_device/" + id);
    }
    else if (role == 'Admin') {
        getStatistics(BASEURL + "/api/dashboard/statistics");
        // getFaults(BASEURL + "/api/dashboard/faults");
        // getPendingRequests(BASEURL + "/api/request/pending");

    }
})();

