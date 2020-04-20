import { BASEURL, Token, amIUser } from "./globals";




(async function()
{
    let obj = Token.getInstance();
    let role = (await amIUser(obj.tokenKey)) == true ? "User" : "Admin";
    if (role == "Admin")
    {
        document.getElementById("content-pane").innerHTML+=  `<section class="mdl-layout__tab-panel" id="">
        <table class="mdl-data-table mdl-js-data-table mdl-data-table mdl-shadow--2dp" id="Request_data1"
        style="overflow: auto;">
        <thead id="tablecol">
            <tr>
                <th class="mdl-data-table__header--sorted-descending" name="device_name"
                    data-id="device_name">
                    Device Name </th>
                <th class="mdl-data-table__header--sorted-descending" name="serial_number"
                    data-id="serial_number">
                    Serial Number </th>

                <th class="mdl-data-table__header--sorted-descending" name="specification"
                    data-id="specification">
                    Specifications </th>
                <th>Assign Date</th>
                <th>Return Date</th>
                <th>Assign To</th>
                <th>Assign By</th>
            </tr>
        </thead>
        <tbody>
        <tbody id="Request_data">
        </tbody>
    </table> 
    </section>`;
        document.getElementById("Tabs").setAttribute("class" , "mdl-layout__tab-bar mdl-js-ripple-effect")
        document.getElementById("Tabs").innerHTML  = ``;
    }
    return null;
})();