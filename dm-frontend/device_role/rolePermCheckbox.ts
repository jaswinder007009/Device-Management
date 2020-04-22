import { BASEURL } from "../globals";

const token = "12345";
let roles;
let permissions;
let mapping;

function getRolesAndPermissions(){
    return fetch(BASEURL + "/api/role", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(mappingArray => mappingArray);
}

function renderTable(){
    let htmlString = `
        <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
            <tr>
                <td></td>
                ${
                    permissions.reduce((acc, permissionsObject) => 
                        acc + `<th scope="col">${permissionsObject["PermissionName"]}</th>`
                    , '')
                }
            </tr>
            ${
                mapping.reduce((acc, roleObject) => 
                    {
                        return acc + `
                        <tr>
                            <th scope="row">
                                ${roleObject["RoleName"]}
                            </th>
                            ${
                                permissions.reduce((acc, permissionObject, idx) => 
                                    acc + `
                                        <td class="mdl-data-table__cell" onmouseenter="mouseOverTD(this);" onmouseleave="mouseOutTD(this);">
                                            <label class="mdl-checkbox mdl-js-checkbox" for="checkbox-${idx}">
                                                <input type="checkbox" id="checkbox-${idx}" class="mdl-checkbox__input" ${roleObject["Permissions"] && roleObject["Permissions"].find(perm => perm["PermissionName"] == permissionObject["PermissionName"]) ? 'checked': ''}>
                                                <span class="mdl-checkbox__label"></span>
                                            </label>
                                        </td>`
                                , '')
                            }
                        </tr>`;
                    }, ''
                )
            }
        </table>
    `;
    document.querySelector('.mdl-spinner').classList.remove("is-active");
    document.querySelector('main').innerHTML = htmlString;
}

function mouseOverTD(tdElement){
    const rowTH = tdElement.parentElement.firstElementChild as HTMLTableHeaderCellElement;
    const columnTH = tdElement.parentElement.parentElement.firstElementChild.children[tdElement.cellIndex] as HTMLTableHeaderCellElement;
    rowTH.classList.add("activate");
    columnTH.classList.add("activate");
}
function mouseOutTD(tdElement){
    const rowTH = tdElement.parentElement.firstElementChild as HTMLTableHeaderCellElement;
    const columnTH = tdElement.parentElement.parentElement.firstElementChild.children[tdElement.cellIndex] as HTMLTableHeaderCellElement;
    rowTH.classList.remove("activate");
    columnTH.classList.remove("activate");
}
function checkboxListener(event: MouseEvent){
    const checkbox = event.target as HTMLInputElement;
    const rowIndex = checkbox.closest('tr').rowIndex - 1;
    const colIndex = checkbox.closest('td').cellIndex - 1;
    if(checkbox.checked){
        const PermissionToAdd = Object.assign({}, permissions[colIndex]);
        if(mapping[rowIndex].hasOwnProperty("Permissions"))
            mapping[rowIndex]["Permissions"].push(PermissionToAdd);
        else
            mapping[rowIndex]["Permissions"] = new Array(PermissionToAdd);
    }
    else{
        const PermissionToRemove = permissions[colIndex];
        const idxToDelete = mapping[rowIndex]["Permissions"].findIndex(obj => obj["PermissionName"] == PermissionToRemove["PermissionName"]);
        mapping[rowIndex]["Permissions"].splice(idxToDelete, 1);
    }
}
function setup(){
    getRolesAndPermissions().then(mappingArray => {
        mapping = Array.from(mappingArray["Roles"]);
        roles = Object.keys(mapping);
        permissions = mappingArray.Permissions;
        renderTable();
    });
}
function save(){
    fetch(BASEURL + "/api/role", {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"Roles": mapping})
    }).then(response => {
        if(!response.ok)
            throw "";
        alert("Changes saved successfully");
        setup();
    }).catch(err => console.error(err));
}

window["mouseOverTD"] = mouseOverTD;
window["mouseOutTD"] = mouseOutTD;

setup();
document.querySelector('body').addEventListener('change', function(e: MouseEvent){
    let target = e.target as HTMLElement;
    if(target.nodeName == 'INPUT' && target.id.startsWith("checkbox-")){
        checkboxListener(e);
    }
});
document.querySelector('#save-button').addEventListener('click', function(){
    save();
});