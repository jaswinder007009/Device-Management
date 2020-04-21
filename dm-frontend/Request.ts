import { BASEURL, navigationBarsss } from "./globals";

        var tableData = '';
        var specs = new Specification();
        var requestedBy = new PartialUserModel();
        fetch(url, {
            headers: new Headers({ "Authorization": `Bearer ${token}` })
        }).then(Response => Response.json()).then(data => {
            for (var i = 0; i < data.length; i++) {
                specs = data[i]['specs'];
                requestedBy = data[i]['requestedBy'];
                tableData += "<tr>"
                    + "<td>" + data[i]['userId'] + "</td>"
                    + "<td>" + data[i]['deviceType'] + "</td>" + "<td>" + data[i]['deviceBrand'] + "</td>" + "<td>" + data[i]['deviceModel'] + "</td>"
                    + "<td>" + specs.ram + ", " + specs.connectivity + ",<br>" + specs.screenSize + "', " + specs.storage + "</td>"
                    + "<td>" + requestedBy.salutation + " " + requestedBy.firstName + " " + requestedBy.middleName + " " + requestedBy.lastName + "</td>"
                    + "<td>" + data[i]['requestDate'] + "</td>"
                    + "<td>" + data[i]['availability'] + "</td>";
                if (data[i]['availability'] == true)
                    tableData += "<td>" + "<button class=\"accept-button\" data-requestid=\"" + data[i]['requestId'] + "\" >Accept</button>" + "</td>";
                else
                    tableData += "<td>" + "<button class=\"notify-button\" data-devicemodel=\""
                        + data[i]['deviceModel'] + "\"data-devicetype=\"" + data[i]['deviceType'] + "\" data-devicebrand=\""
                        + data[i]['deviceBrand'] + "\"data-ram=\"" + specs.ram + "\"data-connectivity=\"" + specs.connectivity
                        + "\"data-screensize=\"" + specs.screenSize + "\"data-storage=\"" + specs.storage + "\" >Notify</button>" + "</td>";

                tableData += "<td>" + "<button class=\"reject-button\" data-requestid=" + data[i]['requestId'] + " >Reject</button>" + "</td></tr>";

            }
            document.getElementById("content").innerHTML = tableData;

        });

    }

    function requestAction(requestUrl, requestId, action) {
        fetch(globalUrl + requestId + requestUrl,
            {headers: new Headers({"Authorization": `Bearer ${token}`})
        });
        alert("Request " + requestId + " " + action);
        getPendingRequests(globalUrl);

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

    function postNotification(data: Requests) {

        let data1 = JSON.stringify(data);
        fetch(BASEURL + "/api/Notification", {
            method: "POST",
            headers: [["Content-Type", "application/json"],["Authorization", `Bearer ${token}`]],
            body: data1,
        }).catch(Error => console.log(Error));
        alert("Notification sent");
    }

    (document.querySelector('#tablecol') as HTMLTableElement).addEventListener("click", function (e) {
        const sortField = (e.target as HTMLElement).getAttribute('name');
        const className = (document.getElementById(sortField) as HTMLTableRowElement).getAttribute("class");
        getPendingRequests(globalUrl + "?sortby=" + sortField + "&direction=" + getDirection(className, sortField));

    });

    document.querySelector('#fixed-header-drawer-exp').addEventListener('input', function (e) {
        var searchField = (document.getElementById("fixed-header-drawer-exp") as HTMLInputElement).value;
        getPendingRequests(globalUrl + "?search=" + searchField);
    });


    document.addEventListener("click", function (e) {

        if ((e.target as HTMLButtonElement).className == "reject-button") {
        if ((e.target as HTMLButtonElement).className == "accept-button") {
            const data = (e.target as HTMLButtonElement).dataset.requestid;
            let requestId = parseInt(data, 10);
            requestAction('/accept?id=' + adminId, requestId, 'accepted');
          }

            let requestId = parseInt((e.target as HTMLButtonElement).dataset.requestid, 10);
            requestAction('/accept?id=' + adminId, requestId, 'accepted');

        }

        if ((e.target as HTMLButtonElement).className == "notify-button") {
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

    getPendingRequests(globalUrl);
    navigationBarsss("Admin","navigation");

})();
