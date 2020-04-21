import { BASEURL, navigationBarsss } from "./globals";
import * as util from "./utilities";
import { Requests, Specification, PartialUserModel } from "./RequestModel";

(async function () {
    const token: string = JSON.parse(sessionStorage.getItem("user_info"))["token"];
    let adminId = JSON.parse(sessionStorage.getItem("user_info"))["id"];
    let globalUrl = BASEURL + "/api/request/";
    let request = new Requests();

    function getPendingRequests(url: string) {

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
                    + "<td>" + util.concatSpecs(specs) + "</td>"
                    + "<td>" + util.concatName(requestedBy) + "</td>"
                    + "<td>" + data[i]['requestDate'] + "</td>"
                    + "<td>" + data[i]['availability'] + "</td>";
                if (data[i]['availability'] == true)
                    tableData += "<td>" + "<button class=\"accept-button\" data-requestid=\"" + data[i]['requestId'] + "\" >Accept</button>" + "</td>";
                else
                    tableData += "<td>" + "<button class=\"show-users\" data-devicemodel=\""
                        + data[i]['deviceModel'] + "\"data-devicetype=\"" + data[i]['deviceType'] + "\" data-devicebrand=\""
                        + data[i]['deviceBrand'] + "\"data-ram=\"" + specs.ram + "\"data-connectivity=\"" + specs.connectivity
                        + "\"data-screensize=\"" + specs.screenSize + "\"data-storage=\"" + specs.storage + "\" >Notify</button>" + "</td>";

                tableData += "<td>" + "<button class=\"reject-button\" data-requestid=" + data[i]['requestId'] + " >Reject</button>" + "</td></tr>";

            }
            document.getElementById("content").innerHTML = tableData;

        });

    }

    function getDeviceHolders() {
        let tableData = "";
        fetch(BASEURL + "/api/Device/search?status_name=allocated", {
            headers: new Headers({ "Authorization": `Bearer ${token}` })
        }).then(Response => Response.json()).then(data => {
            for (var i = 0; i < data.length; i++) {
                if (filterData(data[i], request)) {
                    tableData += "<tr>"
                        + "<td>" + data[i]['device_id'] + "</td>"
                        + "<td>" + data[i]['assign_to']['first_name'] + " " + data[i]['assign_to']['middle_name'] + " " + data[i]['assign_to']['last_name'] + "</td>"
                        + "<td>" + data[i]['return_date'] + "</td>"
                        + "<td><button class=\"notify\" data-deviceid=" + data[i]['device_id'] + " >Notify</button></center></td></tr>"
                }

            }
            tableData += "<tr><td colspan=4><center><button class=\"notify-all\">Notify All</button></center></td></tr>";
            document.getElementById("popupContent").innerHTML = tableData;
            (document.querySelector('.popup') as HTMLDivElement).style.display = 'flex';

        });
    }

    function requestAction(requestUrl, requestId, action) {
        fetch(globalUrl + requestId + requestUrl,
            {
                headers: new Headers({ "Authorization": `Bearer ${token}` })
            });
        alert("Request " + requestId + " " + action);
        getPendingRequests(globalUrl + "pending");

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

    function filterData(data, request) {
        if ((data.type == request.deviceType) && (data.brand == request.deviceBrand)
            && (data.model == request.deviceModel) && (data.specifications.ram == request.specs.ram) &&
            (data.specifications.storage == request.specs.storage) && (data.specifications.screenSize == request.specs.screenSize) &&
            (data.specifications.connectivity == request.specs.connectivity))
            return true;
        else
            return false;
    }

    function postNotification(data: Requests) {

        let data1 = JSON.stringify(data);
        fetch(BASEURL + "/api/Notification", {
            method: "POST",
            headers: [["Content-Type", "application/json"], ["Authorization", `Bearer ${token}`]],
            body: data1,
        }).catch(Error => console.log(Error));
        alert("Notification sent");
    }

    (document.querySelector('#tablecol') as HTMLTableElement).addEventListener("click", function (e) {
        const sortField = (e.target as HTMLElement).getAttribute('name');
        const className = (document.getElementById(sortField) as HTMLTableRowElement).getAttribute("class");
        getPendingRequests(globalUrl + "pending?sortby=" + sortField + "&direction=" + getDirection(className, sortField));

    });

    document.querySelector('#fixed-header-drawer-exp').addEventListener('input', function (e) {
        var searchField = (document.getElementById("fixed-header-drawer-exp") as HTMLInputElement).value;
        getPendingRequests(globalUrl + "pending?search=" + searchField);
    });

    document.querySelector('.close').addEventListener('click',
        function () {
            (document.querySelector('.popup') as HTMLDivElement).style.display = 'none';
        });

    document.addEventListener("click", function (e) {

        if ((e.target as HTMLButtonElement).className == "reject-button") {
            let requestId = parseInt((e.target as HTMLButtonElement).dataset.requestid, 10);
            if (confirm("Are you sure you want to reject the request?"))
                requestAction('?action=reject&id=' + adminId, requestId, 'rejected');

        }
        if ((e.target as HTMLButtonElement).className == "accept-button") {
            const data = (e.target as HTMLButtonElement).dataset.requestid;
            let requestId = parseInt(data, 10);
            requestAction('/accept?id=' + adminId, requestId, 'accepted');
          }

            let requestId = parseInt((e.target as HTMLButtonElement).dataset.requestid, 10);
            if (confirm("Are you sure you want to accept the request?"))
                requestAction('?action=accept&id=' + adminId, requestId, 'accepted');

        }
        if ((e.target as HTMLButtonElement).className == "show-users") {
            request.deviceModel = (e.target as HTMLButtonElement).dataset.devicemodel;
            request.deviceBrand = (e.target as HTMLButtonElement).dataset.devicebrand;
            request.deviceType = (e.target as HTMLButtonElement).dataset.devicetype;
            request.specs.ram = ((e.target as HTMLButtonElement).dataset.ram);
            request.specs.connectivity = ((e.target as HTMLButtonElement).dataset.connectivity);
            request.specs.screenSize = ((e.target as HTMLButtonElement).dataset.screensize);
            request.specs.storage = ((e.target as HTMLButtonElement).dataset.storage);
            getDeviceHolders();

        }
        if ((e.target as HTMLButtonElement).className == "notify-all") {
            if (confirm("Notify all?"))
                postNotification(request);
            (document.querySelector('.popup') as HTMLDivElement).style.display = 'none';
        };

        if ((e.target as HTMLButtonElement).className == "notify") {
            let deviceId: number = parseInt((e.target as HTMLButtonElement).dataset.deviceid, 10);
            if (confirm("Notify User?")) {
                fetch(BASEURL + "/api/Notification/" + deviceId,
                    {
                        headers: new Headers({ "Authorization": `Bearer ${token}` })
                    });
                alert("Notification sent");
            }
            (document.querySelector('.popup') as HTMLDivElement).style.display = 'none';
        };

    });

    getPendingRequests(globalUrl + "pending");
    navigationBarsss("Admin", "navigation");

})();
