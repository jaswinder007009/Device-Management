var email = "abc@gmail.com";
function createCard(cardData) {
    var cardCreationCode: string = "<div class='demo-card-event mdl-card mdl-shadow--2dp mdl-color--blue-grey-200' id='card'>"
        + "<div class='mdl-card__title mdl-card--expand'>"
        + "<h5 class='mdl-color-text--blue-grey-800' >"
        + cardData
        + "</h5>"
        + "</div>"
        + "</div>";
    document.getElementById("content").innerHTML += cardCreationCode;

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
    document.getElementById("content").innerHTML += tableData;

}
function getTotalDevices(url: string) {
    var cardData = "Total Devices:";
    fetch(url).then(Response => Response.json())
        .then(data => {
            count = data[0].count;
            cardData += count;
            createCard(cardData);
        });

}

function getDeviceReturnDates(url: string) {
    var tableTitle = "<TH COLSPAN='3'><center>DEVICE RETURN DATES</center></th>";
    var tableHeading = "";
    tableHeading += "<th class='mdl-data-table__cell--non-numeric'>Type</th>"
        + "<th>Model</th>"
        + "<th>Return Date</th>";
    var tableBody = "";
    fetch(url).then(Response => Response.json())
        .then(data => {
            for (var i = 0; i < data.length; i++) {
                tempObject = data[i];

                tableBody += "<tr>"
                    + "<td class='mdl-data-table__cell--non-numeric'>" + tempObject.deviceType + "</td>"
                    + "<td>" + tempObject.deviceModel + "</td>"
                    + "<td>" + tempObject.returnDate + "</td>"
                    + "</tr>"
            }
            createTable(tableTitle, tableHeading, tableBody);
        });

}


function dashboardData() {
    document.getElementById("content").innerHTML = "";

    getDeviceReturnDates("http://localhost:5000/api/dashboard/" + email + "/devices/returndates");

    getTotalDevices("http://localhost:5000/api/dashboard/device/count");
}

window.onload=()=>{
    dashboardData();
}
function navigate(id:string){
    if (id=="dashboard"){
        dashboardData();
    }
    else{
        document.getElementById("content").innerHTML = "hello "+id;
    }
}
