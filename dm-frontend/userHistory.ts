import { BASEURL } from './globals';
import { Sort } from './user-profile/SortingUser';
import { dynamicGenerate } from './user-profile/dynamic';
class MyDevices {

    data: any;
    size: number;
    url: string;
    table1: HTMLTableElement = document.getElementById("tab1") as HTMLTableElement;
    table2: HTMLTableElement = document.getElementById("tab2") as HTMLTableElement;

    async getPreviousDecice(search: string = "", sort: string = "") {
        this.url = BASEURL + "/api/Device/previous_device/16?search=" + search + sort;
        let data = await this.getApiCall(this.url);
        this.data = await data;
        console.log(data);

        this.size = data.length;
        this.dynamicGenerate(this.table2);
        return data;

    }
    async getCurrentDecice(search: string = "", sort: string = "") {
        this.url = BASEURL + "/api/Device/current_device/16?search=" + search + sort;
        let data = await this.getApiCall(this.url);
        this.data = await data;
        console.log(data);
        this.size = data.length;
        this.dynamicGenerate(this.table1);
        return data;

    }

    async getApiCall(URL: any) {


        let response = await fetch(URL);
        let data = await (response.json());
        console.log(data);
        return (await data);
    }



    dynamicGenerate(table: any) {
        let loop = 0;
        this.DeleteRows(table);
        for (loop = 0; loop < this.data.length; loop++) {
            var row = table.insertRow(loop + 1);
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

        }


    }

    DeleteRows(table: any) {
        var rowCount = table.rows.length;
        for (var i = rowCount - 1; i > 0; i--) {
            table.deleteRow(i);
        }
    }

}
var mydevices = new MyDevices();

document.getElementById("one").addEventListener('click', function () {


    mydevices.getCurrentDecice();
});
document.getElementById("two").addEventListener('click', function () {


    mydevices.getPreviousDecice();
});

document.getElementById("search1").addEventListener('keyup', function () {

    mydevices.getCurrentDecice(document.getElementById("search1").value);
});
document.getElementById("search2").addEventListener('keyup', function () {


    mydevices.getPreviousDecice(document.getElementById("search2").value);
});

document.addEventListener("click", function (ea) {

    if (ea.target.tagName == 'TH') {
        var tab1: HTMLLIElement = document.getElementById("fixed-tab-1") as HTMLLIElement;
       
        const searchbox = tab1.querySelector(".mdl-textfield__input")
        if (document.querySelector(".mdl-layout__tab-panel.is-active") == tab1) {
          
            mydevices.getCurrentDecice(searchbox.value, new Sort().getSortingUrl(ea.target));
        }
        else {

            mydevices.getPreviousDecice(searchbox.value, new Sort().getSortingUrl(ea.target));
        }
    }

});