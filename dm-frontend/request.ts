import { BASEURL } from "./globals";
let adminId = 16;
let searchBar = "<br><input type='text' class='mdl-input-field' placeholder='Enter text to Search' id='searchBar' style='margin-left:1000px'>"
    + "</input><button class='search-button'>Search</button><br>";
let headingArray = ['User Id', 'Model', 'Brand', 'Type', 'RAM', 'Storage',
    'Screen Size', 'Connectivity', 'Name', 'Request Date', 'No. of Days', 'Availability'];

function createTable(tableHeading, tableBody) {
    var tableData = "<br><br><table class='mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp mdl-color-text--blue-grey-800'>"
        + "<thead class='mdl-color--blue-grey-400'>"
        + "<tr class='mdl-color--blue-grey-300'>" + tableHeading + "</tr>"
        + "</thead>"
        + "<tbody>" + tableBody + "</tbody>"
        + "</table>";
    document.getElementById("content").innerHTML += tableData;

}

function getPendingRequests(url: string) {
    var tableHeading = "", tableBody = "";
    for (var i = 0; i < headingArray.length; ++i) {
        tableHeading += "<th class='mdl-data-table__cell--non-numericsort-key'>" + headingArray[i] + "</th>";
    }
    tableHeading += "<th colspan ='2'>Action</th>";

    fetch(url).then(Response => Response.json()).then(data => {
        for (var i = 0; i < data.length; i++) {
            tableBody += "<tr>";
            var key, name = "";
            for (var prop in data[i]) {
                var requestId: number = data[i]['requestId'];
                var value = data[i][prop];
                if (typeof (value) == 'object') {
                    for (key in value) {
                        var val = value[key];
                        if (key == "salutation" || key == "firstName" || key == "middleName" || key == "lastName")
                            name += val + " ";

                        if (prop != "requestedBy")
                            tableBody += "<td>" + val + "</td>";

                        if (key == "lastName")
                            tableBody += "<td>" + name + "</td>";
                    }
                }
                else {
                    key = prop;
                    if (key != "comment" && key != "requestId")
                        tableBody += "<td>" + value + "</td>";

                    if (key == "availability" && value == true)
                        tableBody += "<td>" + "<button class=\"accept-button\" data-requestid=\"" + requestId + "\" >Accept</button>" + "</td>";
                }
            }

            tableBody += "<td>" + "<button class=\"reject-button\" data-requestid=" + requestId + " >Reject</button>" + "</td>";

            tableBody += "</tr>";
        }
        createTable(tableHeading, tableBody);
        
    });

}
function requestAction(requestUrl) {
    console.log(BASEURL + "/api/request/" + requestUrl);
    fetch(BASEURL + "/api/request/" + requestUrl);

}


document.addEventListener("click", function (e) {

    if ((e.target as HTMLButtonElement).className == "reject-button") {
        const data = (e.target as HTMLButtonElement).dataset.requestid;
        let requestId = parseInt(data, 10);
        requestAction(requestId + '/reject?id=' + adminId);
        alert("Request " + requestId + " rejected");
        document.getElementById("content").innerHTML = "";
        getPendingRequests(BASEURL + "/api/request/pending");

    }
    if ((e.target as HTMLButtonElement).className == "accept-button") {
        const data = (e.target as HTMLButtonElement).dataset.requestid;
        let requestId = parseInt(data, 10);
        requestAction(requestId + '/accept');
        alert("Request " + requestId + " accepted");
        document.getElementById("content").innerHTML = "";
        getPendingRequests(BASEURL + "/api/request/pending");

    }
    if ((e.target as HTMLButtonElement).className == "search-button") {
        let searchField = (<HTMLInputElement>document.getElementById("searchBar")).value;
        document.getElementById("content").innerHTML = "";
        getPendingRequests(BASEURL + "/api/request/pending?search=" + searchField);
    }

});

document.getElementById("search").innerHTML = searchBar;
document.getElementById("content").innerHTML = "";
getPendingRequests(BASEURL + "/api/request/pending");


