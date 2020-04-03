let adminId = 16;

function createTable(tableHeading, tableBody) {
    var tableData = "<br><br><table class='mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp mdl-color-text--blue-grey-800'>"
        + "<thead class='mdl-color--blue-grey-400'>"
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

function getPendingRequests(url: string) {
    var tableHeading = "";
    tableHeading += "<th class='mdl-data-table__cell--non-numeric'>User Id</th>"
        + "<th>Model</th>" + "<th>Brand</th>" + "<th>Type</th>" + "<th>RAM</th>"
        + "<th>Storage</th>" + "<th>Screen Size</th>" + "<th>Connectivity</th>"
        + "<th>Name</th>" + "<th>Request Date</th>" + "<th>Days</th>"
        + "<th>Availabilty</th>" + "<th colspan ='2'>Action</th>";
    var tableBody = "";
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
    console.log("http://localhost:5000/api/request/" + requestUrl);
    fetch("http://localhost:5000/api/request/" + requestUrl);

}


document.addEventListener("click", function (e) {
    const data = (e.target as HTMLButtonElement).dataset.requestid;
    let requestId = parseInt(data, 10);

    if ((e.target as HTMLButtonElement).className == "reject-button") {

        requestAction(requestId + '/reject?id=' + adminId);
        alert("Request " + requestId + " rejected");

    }
    if ((e.target as HTMLButtonElement).className == "accept-button") {

        requestAction(requestId + '/accept');
        alert("Request " + requestId + " accepted");

    }
    document.getElementById("content").innerHTML = "";
    getPendingRequests("http://localhost:5000/api/request/pending");

});


// let searchBar = "<div class='mdl-textfield__expandable-holder mdl-color--blue-1000'>"
// +"<input class='mdl-textfield__input' type='text' id='search-expandable2'>"
// +"<label class='mdl-textfield__label' for='search-expandable2'>Enter search text below"
// +"</label>"
// +"</div>";

// //document.getElementById("search").innerHTML = searchBar;
document.getElementById("content").innerHTML =""; 
getPendingRequests("http://localhost:5000/api/request/pending");


