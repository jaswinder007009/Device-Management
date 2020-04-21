import { BASEURL, amIAdmin, amIUser,navigationBarsss } from './globals';

(async function () {
    let cardTitle = ['Total Devices', 'Free Devices', 'Faults', 'Assigned Devices', 'Device Requests', 'Rejected Requests'];


    const url = new URL(window.location.href);
    let token, id;
    if(url.searchParams.has("token") && url.searchParams.has("id")){
        token = url.searchParams.get("token");
        id = url.searchParams.get("id");
        sessionStorage.setItem("user_info", JSON.stringify({ token, id }));
    }
    let email = 'abc@gmail.com';
    token = JSON.parse(sessionStorage.getItem("user_info"))["token"]; 

    
  let role = await amIUser(token) == true ? "User" : "Admin";
    //let role = 'User';
 


    (function(){
        if (role=="Admin")
        {
            (document.getElementById("submissionNotification") as HTMLSpanElement).innerText ="check_circle";
        }
    })();

    document.querySelector("#submissionNotification").addEventListener('click',e=>
        {
            if(role=="Admin")
            {
                window.location.href="./submissionRequestPage.html";
            }
        });
    function createCard(index, key, cardData) {
        var cardCreationCode: string = "<div class='demo-card-event mdl-card mdl-shadow--2dp mdl-color--blue-grey-200' id='card'>"
            + "<div class='mdl-card__title mdl-card--expand'>"
            + "<h5 class='mdl-color-text--blue-grey-800' >" + cardTitle[index] + ': ' + cardData + "</h5>"
            + "</div>"
            + "</div>";
        if (((key == 'assignedDevices' || key == 'rejectedRequests') && (role == 'User')) || ((key == 'deviceRequests' || key == 'faults') && (role == 'Admin'))) {
            return;
        }
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
                let index = 0;
                for (var key in data) {
                    createCard(index, key, data[key]);
                    index++;
                }

            });
    }

    function getFaults(url: string) {

        var tableTitle = "<TH COLSPAN='3'><center>FAULTS</center></th>";
        var tableHeading = "";
        tableHeading += "<th class='mdl-data-table__cell--non-numeric'>Type</th>"
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
                        + "<td class='mdl-data-table__cell--non-numeric'>" + tempObject.deviceType + "</td>"
                        + "<td>" + tempObject.deviceModel + "</td>"
                        + "<td>" + tempObject.faultDescription + "</td>"
                        + "</tr>"
                }
                createTable(tableTitle, tableHeading, tableBody);
            });

    }

    function getDeviceReturnDates(url: string) {
        var tableTitle = "<TH COLSPAN='3'><center>DEVICE RETURN DATES</center></th>";
        var tableHeading = "";
        tableHeading += "<th class='mdl-data-table__cell--non-numeric'>Type</th>"
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
                        + "<td class='mdl-data-table__cell--non-numeric'>" + tempObject.deviceType + "</td>"
                        + "<td>" + tempObject.deviceModel + "</td>"
                        + "<td>" + tempObject.returnDate + "</td>"
                        + "</tr>"
                }
                createTable(tableTitle, tableHeading, tableBody);
            });

    }
    function getHistory(url: string) {
        var tableTitle = "<TH COLSPAN='3'><center>MY HISTORY</center></th>";
        var tableHeading = "";
        tableHeading += "<th class='mdl-data-table__cell--non-numeric'>Type</th>"
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
                            + "<td class='mdl-data-table__cell--non-numeric'>" + tempObject.type + "</td>"
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
        tableHeading += "<th class='mdl-data-table__cell--non-numeric'>User Id</th>"
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
                        + "<td class='mdl-data-table__cell--non-numeric'>" + tempObject.userId + "</td>"
                        + "<td>" + tempObject.deviceType + "</td>"
                        + "<td>" + tempObject.deviceModel + "</td>"
                        + "</tr>"
                }
                createTable(tableTitle, tableHeading, tableBody);
            });

    }
    navigationBarsss(role,"navigation");

    document.getElementById("notifications").addEventListener('click', function (e) {
        window.location.href = "./notifiication.html";
        sessionStorage.clear();
        window.location.href = "/SJLogin/LoginRegiter.html";
    })
    
    // document.getElementById('userRole').innerHTML = role;
    if (role == 'User') {
        getStatistics(BASEURL + "/api/dashboard/statistics");
        getDeviceReturnDates(BASEURL + "/api/dashboard/" + email + "/devices/returndates");
        getHistory(BASEURL + "/api/device/previous_device/" + id);
    }
    else if (role == 'Admin') {
        getStatistics(BASEURL + "/api/dashboard/statistics");
        getFaults(BASEURL + "/api/dashboard/faults");
        getPendingRequests(BASEURL + "/api/request/pending");
        
    }
    })();
    
