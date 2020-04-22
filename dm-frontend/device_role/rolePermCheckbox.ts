import { BASEURL } from "../globals";
export class RolePermission{
    token: string;
    roles;
    permissions;
    mapping;
    
    constructor(token: string){
        this.token = token;
    }

    getRolesAndPermissions(token){
        return fetch(BASEURL + "/api/device/role", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(mappingArray => mappingArray);
    }

    renderTable(){
        let htmlString = `
            <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                <tr>
                    <td></td>
                    ${
                        this.permissions.reduce((acc, permissionsObject) => 
                            acc + `<th scope="col">${permissionsObject["PermissionName"]}</th>`
                        , '')
                    }
                </tr>
                ${
                    this.mapping.reduce((acc, roleObject) => 
                        {
                            return acc + `
                            <tr>
                                <th scope="row">
                                    ${roleObject["RoleName"]}
                                </th>
                                ${
                                    this.permissions.reduce((acc, permissionObject, idx) => 
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
        document.querySelector('#fixed-tab-1 .mdl-spinner').classList.remove("is-active");
        document.querySelector('#fixed-tab-1 .main').innerHTML = htmlString;
    }

    checkboxListener(event: MouseEvent){
        const checkbox = event.target as HTMLInputElement;
        const rowIndex = checkbox.closest('tr').rowIndex - 1;
        const colIndex = checkbox.closest('td').cellIndex - 1;
        if(checkbox.checked){
            const PermissionToAdd = Object.assign({}, this.permissions[colIndex]);
            if(this.mapping[rowIndex].hasOwnProperty("Permissions"))
                this.mapping[rowIndex]["Permissions"].push(PermissionToAdd);
            else
                this.mapping[rowIndex]["Permissions"] = new Array(PermissionToAdd);
        }
        else{
            const PermissionToRemove = this.permissions[colIndex];
            const idxToDelete = this.mapping[rowIndex]["Permissions"].findIndex(obj => obj["PermissionName"] == PermissionToRemove["PermissionName"]);
            this.mapping[rowIndex]["Permissions"].splice(idxToDelete, 1);
        }
    }
    setup(){
        this.getRolesAndPermissions(this.token).then(mappingArray => {
            this.mapping = Array.from(mappingArray["Roles"]);
            this.roles = Object.keys(this.mapping);
            this.permissions = mappingArray.Permissions;
            this.renderTable();
        });
    }
    save(){
        fetch(BASEURL + "/api/device/role", {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${this.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"Roles": this.mapping})
        }).then(response => {
            if(!response.ok)
                throw "";
            alert("Changes saved successfully");
            this.setup();
        }).catch(err => console.error(err));
    }
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
window["mouseOverTD"] = mouseOverTD;
window["mouseOutTD"] = mouseOutTD;

