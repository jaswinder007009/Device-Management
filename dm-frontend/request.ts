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
        + "<th>Model</th>" + "<th>Brand</th>" + "<th>Type</th>"
        + "<th>RAM</th>" + "<th>Storage</th>" + "<th>Screen Size</th>" + "<th>Connectivity</th>"
        + "<th>Name</th>" + "<th>Request Date</th>" + "<th>Availabilty</th>";
    var tableBody = "";
    fetch(url).then(Response => Response.json())
        .then(data => {
            for (var i = 0; i < data.length; i++) {
                tableBody += "<tr>";
                var key, name = "";
                for (var prop in data[i]) {
                    var value = data[i][prop];
                    if (typeof (value) == 'object') {
                        for (key in value) {
                            var val = value[key];
                            if (key == "salutation" || key == "firstName" || key == "middleName" || key == "lastName") {
                                name += val+" ";
                            }
                            if (key != "salutation" && key != "firstName" && key != "middleName" && key != "lastName" && key != "email" && key != "dob" && key != "doj" && key != "gender" && key != "departmentName" && key != "designationName") {
                                tableBody += "<td>" + val + "</td>";
                            }
                            if (key == "lastName") {
                                tableBody += "<td>" + name + "</td>";
                            }
                        }
                    }
                    else {
                        key = prop;
                        if (key != "comment" && key != "noOfDays" && key != "requestId") {
                            tableBody += "<td>" + value + "</td>";
                        }
                    }
                }
                tableBody += "</tr>";
            }
            createTable(tableHeading, tableBody);
        });

}
document.getElementById("content").innerHTML = "";
getPendingRequests("http://localhost:5000/api/request/pending");


