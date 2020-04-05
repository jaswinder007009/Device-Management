"use strict";
var email = "abc@gmail.com";
var userId = 16;
function createCard(cardData) {
    var cardCreationCode = "<div class='demo-card-event mdl-card mdl-shadow--2dp mdl-color--blue-grey-200' id='card'>"
        + "<div class='mdl-card__title mdl-card--expand'>"
        + "<h5 class='mdl-color-text--blue-grey-800' >" + cardData + "</h5>"
        + "</div>"
        + "</div>";
    document.getElementById("content").innerHTML += cardCreationCode;
}
function createTable(tableTitle, tableHeading, tableBody) {
    var tableData = "<br><br><table class='mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp mdl-color-text--blue-grey-800'>"
        + "<thead class='mdl-color--blue-grey-400'>"
        + "<tr>" + tableTitle + "</tr>"
        + "<tr class='mdl-color--blue-grey-300'>" + tableHeading + "</tr>"
        + "</thead>"
        + "<tbody>" + tableBody + "</tbody>"
        + "</table>";
    document.getElementById("content").innerHTML += tableData;
}
function getTotalDevices(url) {
    var cardData = "Total Devices:";
    fetch(url).then(function (Response) { return Response.json(); })
        .then(function (data) {
        var count = data[0].count;
        cardData += count;
        createCard(cardData);
    });
}
function getDeviceReturnDates(url) {
    var tableTitle = "<TH COLSPAN='3'><center>DEVICE RETURN DATES</center></th>";
    var tableHeading = "";
    tableHeading += "<th class='mdl-data-table__cell--non-numeric'>Type</th>"
        + "<th>Model</th>"
        + "<th>Return Date</th>";
    var tableBody = "";
    fetch(url).then(function (Response) { return Response.json(); })
        .then(function (data) {
        for (var i = 0; i < data.length; i++) {
            var tempObject = data[i];
            tableBody += "<tr>"
                + "<td class='mdl-data-table__cell--non-numeric'>" + tempObject.deviceType + "</td>"
                + "<td>" + tempObject.deviceModel + "</td>"
                + "<td>" + tempObject.returnDate + "</td>"
                + "</tr>";
        }
        createTable(tableTitle, tableHeading, tableBody);
    });
}
function getHistory(url) {
    var tableTitle = "<TH COLSPAN='5'><center>DEVICE RETURN DATES</center></th>";
    var tableHeading = "";
    tableHeading += "<th class='mdl-data-table__cell--non-numeric'>Type</th>"
        + "<th>Brand</th>"
        + "<th>Model</th>"
        + "<th>Assign Date</th>"
        + "<th>Return Date</th>";
    var tableBody = "";
    fetch(url).then(function (Response) { return Response.json(); })
        .then(function (data) {
        for (var i = 0; i < data.length; i++) {
            var tempObject = data[i];
            tableBody += "<tr>"
                + "<td class='mdl-data-table__cell--non-numeric'>" + tempObject.type + "</td>"
                + "<td>" + tempObject.brand + "</td>"
                + "<td>" + tempObject.model + "</td>"
                + "<td>" + tempObject.assign_date + "</td>"
                + "<td>" + tempObject.return_date + "</td>"
                + "</tr>";
        }
        createTable(tableTitle, tableHeading, tableBody);
    });
}
function getCurrentDeviceCount(url) {
    var cardData = "Total Current Devices:";
    fetch(url).then(function (Response) { return Response.json(); })
        .then(function (data) {
        var count = data.length;
        cardData += count;
        createCard(cardData);
    });
}
function dashboardData() {
    document.getElementById("content").innerHTML = "";
    getTotalDevices("http://localhost:5000/api/dashboard/device/count");
    getHistory("http://localhost:5000/api/device/previous_device/" + userId);
    getCurrentDeviceCount("http://localhost:5000/api/device/current_device/" + userId);
    getDeviceReturnDates("http://localhost:5000/api/dashboard/" + email + "/devices/returndates");
}
window.onload = function () {
    dashboardData();
};
function navigate(id) {
    if (id == "dashboard") {
        dashboardData();
    }
    else {
        document.getElementById("content").innerHTML = "hello " + id;
    }
}
