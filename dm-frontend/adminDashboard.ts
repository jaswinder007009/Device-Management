
function createCard(cardData) {
    var cardCreationCode: string = "<div class='demo-card-event mdl-card mdl-shadow--2dp mdl-color--blue-grey-200' id='card'>"
        + "<div class='mdl-card__title mdl-card--expand'>"
        + "<h5 class='mdl-color-text--blue-grey-800' >"
        +cardData
        +"</h5>"
        + "</div>" 
        + "</div>";
    document.getElementById("dynamicData").innerHTML += cardCreationCode;

}

function createTable(tableTitle, tableHeading, tableBody) {
    var tableData = "<br><br><table class='mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp mdl-color-text--blue-grey-800'>"
        + "<thead class='mdl-color--blue-grey-400'>"
        + "<tr>"
        + tableTitle
        + "</tr>"
        + "<tr class='mdl-color--blue-grey-300'>"
        + tableHeading
        + "</tr>"
        + "</thead>"
        + "<tbody>"
        + tableBody
        + "</tbody>"
        + "</table>";
    document.getElementById("dynamicData").innerHTML += tableData;

}

function getLatestAccepetedRequests(url: string) {
    var tableTitle = "<TH COLSPAN='5'><center>LATEST ACCEPTED REQUESTS</center></th>";
    var tableHeading = "";
    tableHeading += "<th class='mdl-data-table__cell--non-numeric'>Device Id</th>"
        + "<th>Type</th>"
        + "<th>Model</th>"
        + "<th>User Id</th>"
        + "<th>Assign Date</th>";
    var tableBody = "";
    fetch(url).then(Response => Response.json())
        .then(data => {
            for (var i = 0; i < data.length; i++) {
                tempObject = data[i];

                tableBody += "<tr>"
                    + "<td class='mdl-data-table__cell--non-numeric'>" + tempObject.deviceId + "</td>"
                    + "<td>" + tempObject.deviceType + "</td>"
                    + "<td>" + tempObject.deviceModel + "</td>"
                    + "<td>" + tempObject.userId + "</td>"
                    + "<td>" + tempObject.assignDate + "</td>"
                    + "</tr>"
            }

            createTable(tableTitle, tableHeading, tableBody);
            tableTitle = "";
        });

}

function getLatestPendingRequests(url: string) {

    var tableTitle = "<TH COLSPAN='4'><center>RECENT REQUESTS</center></th>";
    var tableHeading = "";
    tableHeading += "<th class='mdl-data-table__cell--non-numeric'>Device Id</th>"
        + "<th>Type</th>"
        + "<th>Model</th>"
        + "<th>User Id</th>";
    var tableBody = "";
    fetch(url).then(Response => Response.json())
        .then(data => {
            for (var i = 0; i < data.length; i++) {
                tempObject = data[i];

                tableBody += "<tr>"
                    + "<td class='mdl-data-table__cell--non-numeric'>" + tempObject.deviceId + "</td>"
                    + "<td>" + tempObject.deviceType + "</td>"
                    + "<td>" + tempObject.deviceModel + "</td>"
                    + "<td>" + tempObject.userId + "</td>"
                    + "</tr>"
            }
            createTable(tableTitle, tableHeading, tableBody);
        });

}

function getFaults(url: string) {

    var tableTitle = "<TH COLSPAN='3'><center>FAULTS</center></th>";
    var tableHeading = "";
    tableHeading += "<th class='mdl-data-table__cell--non-numeric'>Type</th>"
        + "<th>Model</th>"
        + "<th>Fault</th>";
    var tableBody = "";
    fetch(url).then(Response => Response.json())
        .then(data => {
            for (var i = 0; i < data.length; i++) {
                tempObject = data[i];

                tableBody += "<tr>"
                    + "<td class='mdl-data-table__cell--non-numeric'>" + tempObject.deviceType + "</td>"
                    + "<td>" + tempObject.deviceModel + "</td>"
                    + "<td>" + tempObject.faultDescription + "</td>"
                    + "</tr>"
            }
            createTable(tableTitle, tableHeading, tableBody);
        });

}
function getRejectedRequests(url:string) {
    var cardData="Total Requests Rejected: ";
    fetch(url).then(Response => Response.json())
        .then(data => {
                count=data[0].count;
                cardData+=count;
                createCard(cardData);
            });
               
}

function getTotalDevices(url:string) {
    var cardData="Total Devices:";
    fetch(url).then(Response => Response.json())
        .then(data => {
                count=data[0].count;
                cardData+=count;
                createCard(cardData);
            });
               
}


function dashboardData() {
    document.getElementById("dynamicData").innerHTML = "";

    getLatestAccepetedRequests("http://localhost:5000/api/dashboard/requests/accepted");

    getLatestPendingRequests("http://localhost:5000/api/dashboard/requests/pending");

    getRejectedRequests("http://localhost:5000/api/dashboard/requests/rejected");

    getTotalDevices("http://localhost:5000/api/dashboard/device/count");

    getFaults("http://localhost:5000/api/dashboard/device/faults");
}

window.onload=()=>{
    dashboardData();
}
// (document.querySelector("#dashboard") as HTMLAnchorElement).addEventListener(
//     "click",function(){
//         dashboardData()
//     }
// )
