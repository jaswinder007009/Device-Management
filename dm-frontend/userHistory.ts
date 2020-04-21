import { BASEURL, amIAdmin, amIUser, navigationBarsss } from './globals';
import { Sort } from './user-profile/SortingUser';
import { dynamicGenerate } from './user-profile/dynamic';
( async function(){
    const userId=JSON.parse(sessionStorage.getItem("user_info"))["id"];
    const token=JSON.parse(sessionStorage.getItem("user_info"))["token"];
    const role = await amIUser(token) == true ? "User" : "Admin";
 
    var mydevices = new MyDevices(token);

    document.getElementById("one").addEventListener('click', function () {


        mydevices.getCurrentDecice(userId);
    });
    // document.getElementById("two").addEventListener('click', function () {


    //     mydevices.getPreviousDecice(userId);
    // });
    document.getElementById("three").addEventListener('click', function () {


        mydevices.getRequestHistory(userId);
    });
    document.getElementById("tab3").addEventListener('click', function (ev) {

        if ((ev.target as HTMLButtonElement).classList.contains("cancel")) {
            const requestId=(ev.target as HTMLButtonElement).parentElement.parentElement.dataset.requestId;
            mydevices.deleteRequestHistory(parseInt(requestId)).then(function () {mydevices.getRequestHistory(userId); });

        }

    });
    document.getElementById("tab1").addEventListener('click', function (ev) {

if ((ev.target as HTMLButtonElement).classList.contains("return")) {
            const deviceid=(ev.target as HTMLButtonElement).parentElement.parentElement.dataset.deviceId;
            console.log(deviceid);
            mydevices.returnDevice(parseInt(userId), parseInt(deviceid)).then(function () { mydevices.getCurrentDecice(userId); });

        }

       else if ((ev.target as HTMLButtonElement).classList.contains("fault")) {
            openForm();
            const deviceid=(ev.target as HTMLButtonElement).parentElement.parentElement.dataset.deviceId;
            document.getElementById("faultpopup").setAttribute("data-device-id", deviceid)
        }
        

    });

    document.querySelector('#faultpopup .submit').addEventListener('click', function (ev) {
        ev.preventDefault();
        var comment = (document.getElementById("comment")as HTMLTextAreaElement).value;
        var deviceid = parseInt(document.getElementById("faultpopup").dataset.deviceId);
        mydevices.reportFaultyDevice(parseInt(userId), deviceid, comment);
        closeForm();
    });

    document.querySelector('.close').addEventListener('click', function (e) {
      e.preventDefault();
        closeForm();
        

    });






    document.getElementById("search1").addEventListener('keyup', function () {

        mydevices.getCurrentDecice(userId,(document.getElementById("search1") as HTMLInputElement).value);
    });
    // document.getElementById("search2").addEventListener('keyup', function () {


    //     mydevices.getPreviousDecice(userId,document.getElementById("search2").value);
    // });
    document.getElementById("search3").addEventListener('keyup', function () {


        mydevices.getRequestHistory(userId,(document.getElementById("search3")as HTMLInputElement).value);
    });

    document.addEventListener("click", function (ea) {

        if ((ea.target as HTMLTableHeaderCellElement).tagName == 'TH' && (ea.target as HTMLTableHeaderCellElement).dataset.sortable=="true") {
            var tab1: HTMLLIElement = document.getElementById("fixed-tab-1") as HTMLLIElement;
            // var tab2: HTMLLIElement = document.getElementById("fixed-tab-2") as HTMLLIElement;

            const searchbox = tab1.querySelector(".mdl-textfield__input")
            if (document.querySelector(".mdl-layout__tab-panel.is-active") == tab1) {

                mydevices.getCurrentDecice(userId,(searchbox as HTMLInputElement).value, new Sort(token).getSortingUrl(ea.target as HTMLTableHeaderCellElement));
            }
            // else if(document.querySelector(".mdl-layout__tab-panel.is-active") == tab2) {

            //     mydevices.getPreviousDecice(userId,(searchbox as HTMLInputElement).value, new Sort(token).getSortingUrl(ea.target as HTMLTableHeaderCellElement));
            // }
            else{
                mydevices.getRequestHistory(userId,(searchbox as HTMLInputElement).value,new Sort(token).getSortingUrl(ea.target as HTMLTableHeaderCellElement));
            }
        
        }

    });
    function openForm() {
        document.getElementById("myFaultForm").style.display = "block";
        document.getElementById("page").style.filter = " blur()";
    }
    function closeForm() {
        document.getElementById("myFaultForm").style.display = "none";
        document.getElementById("page").style.filter = " blur()";
    }
    navigationBarsss(role, "navigation");

})();
export class MyDevices {
        
    data: any;
    size: number;
    url: string;
    token : string;
    table1: HTMLTableElement = document.getElementById("tab1") as HTMLTableElement;
    table2: HTMLTableElement = document.getElementById("tab2") as HTMLTableElement;
    table3: HTMLTableElement = document.getElementById("tab3") as HTMLTableElement;
     constructor (token : string)
     {
         this.token=token;
     }
    
    async getPreviousDecice(id:number,search: string = "", sort: string = "") {
        this.url = BASEURL + "/api/Device/previous_device/"+id+"?search=" + search + sort;
        let data = await this.getApiCall(this.url);
        this.data = await data;
        console.log(data);
        this.size = data.length;
        this.dynamicGenerate(this.table2);
        return data;

    }
  async getCurrentDecice(id:number,search: string = "", sort: string = "") {
        this.url = BASEURL + "/api/Device/current_device/"+id+"?search=" + search + sort;
        let data = await this.getApiCall(this.url);
        this.data = await data;
        console.log(data);
        this.size = data.length;
        this.dynamicGenerate(this.table1);
        return data;

    }
    async getRequestHistory(id: number, searchField: string = "", sort: string = "") {
        this.url = BASEURL + "/request/pending?id="+id+"&search=" + searchField + sort;
        let data = await this.getApiCall(this.url);
        this.data = await data;
        console.log(data);
        this.size = data.length;
        this.dynamicGenerate1(this.table3);
        return data;

    }
    returnDevice(userId:number,deviceId:number) {
        return fetch(BASEURL + "/api/ReturnRequest", {
            method: "POST",
            body:JSON.stringify({userId,deviceId}),
            headers:new Headers([["Content-Type","application/json"],["Authorization", `Bearer ${this.token}`]])
        });
    }
    reportFaultyDevice(userId: number, deviceId: number, comment: string) {
        return fetch(BASEURL + "/api/ReturnRequest/fault", {
            method: "POST",
            body: JSON.stringify({ userId, deviceId, comment }),
            headers: new Headers([["Content-Type", "application/json"], ["Authorization", `Bearer ${this.token}`]])
        });
    }
    deleteRequestHistory(requestID: number) {
        return fetch(BASEURL + "/request/" + requestID + "/cancel", {
            method: "DELETE",headers: new Headers({"Authorization": `Bearer ${this.token}`})
        });
    }
    
    //TODO 3 function with same signature into one

    async getApiCall(URL: any) {
        let response = await fetch(URL,{
            headers: new Headers({"Authorization": `Bearer ${this.token}`})   
        });
        let data = await (response.json());
        return ( data);
    }


    dynamicGenerate(table: any) {
        let loop = 0;
        this.DeleteRows(table);

        for (loop = 0; loop < this.data.length; loop++) {
            var row = table.insertRow(loop + 1);
            row.setAttribute("data-device-id", this.data[loop]["device_id"])
            // row.setAttribute("data-user-id",this.data[loop]["user_id"])
            var cell = row.insertCell(0);
            var cell1 = row.insertCell(1);
            var cell2 = row.insertCell(2);
            var cell3 = row.insertCell(3);
            var cell4 = row.insertCell(4);
            cell.innerHTML = this.data[loop]["type"]
            cell1.innerHTML = this.data[loop]["brand"]
            cell2.innerHTML = this.data[loop]["model"]
            cell3.innerHTML = this.data[loop]["assign_date"]
            cell4.innerHTML = this.data[loop]["return_date"]
            if (table == this.table1) {
                var cell5 = row.insertCell(5);
                cell5.innerHTML = `<button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored return">
            RETURN
        </button>`
                var cell6 = row.insertCell(6);
                cell6.innerHTML = `<button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored fault">
    REPORT
</button>`
            }


        }


    }
    dynamicGenerate1(table: any) {
        let loop = 0;
        this.DeleteRows(table);

        for (loop = 0; loop < this.data.length; loop++) {
            var row = table.insertRow(loop + 1);
            var cell = row.insertCell(0);
            var cell1 = row.insertCell(1);
            var cell2 = row.insertCell(2);
            var cell3 = row.insertCell(3);
            var cell4 = row.insertCell(4);
            var cell5 = row.insertCell(5);
            row.setAttribute("data-request-id",this.data[loop]["requestId"])

            cell.innerHTML = this.data[loop]["deviceType"]
            cell1.innerHTML = this.data[loop]["deviceBrand"]
            cell2.innerHTML = this.data[loop]["deviceModel"]
            cell3.innerHTML = this.data[loop]["requestDate"]
            cell4.innerHTML = this.data[loop]["noOfDays"]
            cell5.innerHTML = `<button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored cancel">CANCEL </button>`

        }
    }
    //TODO same function name      

    DeleteRows(table: any) {
        var rowCount = table.rows.length;
        for (var i = rowCount - 1; i > 0; i--) {
            table.deleteRow(i);
        }
    }

}
