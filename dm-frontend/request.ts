import { BASEURL } from "./globals";
let adminId = 16;
let sortDirection = 1;
let globalUrl = BASEURL + "/request/";

function getPendingRequests(url: string) {

    var tableData = '';
    fetch(url).then(Response => Response.json()).then(data => {
        for (var i = 0; i < data.length; i++) {
            tableData += "<tr>";
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
                            tableData += "<td>" + val + "</td>";

                        if (key == "lastName")
                            tableData += "<td>" + name + "</td>";
                    }
                }
                else {
                    key = prop;
                    if (key != "comment" && key != "requestId")
                        tableData += "<td>" + value + "</td>";

                    if (key == "availability" && value == true)
                        tableData += "<td>" + "<button class=\"accept-button\" data-requestid=\"" + requestId + "\" >Accept</button>" + "</td>";
                }
            }

            tableData += "<td>" + "<button class=\"reject-button\" data-requestid=" + requestId + " >Reject</button>" + "</td>";

            tableData += "</tr>";
        }
        document.getElementById("content").innerHTML = tableData;

    });

}

function requestAction(requestUrl, requestId, action) {
    fetch(globalUrl + requestUrl);
    alert("Request " + requestId + " " + action);
    document.getElementById("content").innerHTML = "";
    getPendingRequests(globalUrl + "pending");

}

function getDirection(className, sortField) {
    if (className === "mdl-data-table__header--sorted-descending") {
        document.getElementById(sortField).setAttribute("class", "mdl-data-table__header--sorted-ascending");
        return -1;
    }
    else {
        document.getElementById(sortField).setAttribute("class", "mdl-data-table__header--sorted-descending");
        return 1;
    }
}

document.addEventListener("click", function (e) {
    const sortField = (e.target as HTMLElement).getAttribute('name');
    const className = (document.getElementById(sortField) as HTMLTableRowElement).getAttribute("class");
    sortDirection = getDirection(className, sortField);
    document.getElementById("content").innerHTML = "";
    getPendingRequests(globalUrl + "pending?sort=" + sortField + "&direction=" + sortDirection);

});

document.querySelector('#fixed-header-drawer-exp').addEventListener('input', function (e) {
    var searchField = (document.getElementById("fixed-header-drawer-exp") as HTMLInputElement).value;
    getPendingRequests(globalUrl + "pending?search=" + searchField);
});


document.addEventListener("click", function (e) {

    if ((e.target as HTMLButtonElement).className == "reject-button") {
        const data = (e.target as HTMLButtonElement).dataset.requestid;
        let requestId = parseInt(data, 10);
        requestAction(requestId + '/reject?id=' + adminId, requestId, 'rejected');

    }
    if ((e.target as HTMLButtonElement).className == "accept-button") {
        const data = (e.target as HTMLButtonElement).dataset.requestid;
        let requestId = parseInt(data, 10);
        requestAction(requestId + '/accept', requestId, 'accepted');

    }

});

document.getElementById("content").innerHTML = "";
getPendingRequests(globalUrl + "pending");


