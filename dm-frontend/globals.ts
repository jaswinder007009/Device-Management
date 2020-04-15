export const BASEURL = "http://localhost:5000";

export function amIAdmin(token: string){
    return fetch(BASEURL + "/api/device/is_admin",{
        headers: new Headers({"Authorization": `Bearer ${token}`})
    }
    ).then(res => res.json()).then(res => res.result as boolean);
}
export function amIUser(token: string){
    return fetch(BASEURL + "/api/device/is_user",{
        headers: new Headers({"Authorization": `Bearer ${token}`})
    }
    ).then(res => res.json()).then(res => res.result as boolean);
}
export function navigationBarsss(role:string , element:string) {
    var navigation = `<nav class="demo-navigation mdl-navigation mdl-color--blue-grey-800" >
    <a class="mdl-navigation__link" href="/dashboard.html">
   <i class="mdl-color-text--blue-grey-400 material-icons"
       role="presentation">dashboard</i>Dashboard
    </a>
     <a class="mdl-navigation__link" href="/deviceListForadmin.html">
         <i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">devices</i>All
             Devices
    </a>
    
    <a class="mdl-navigation__link" href="/user-model.html">
    <i class="mdl-color-text--blue-grey-400 material-icons"
            role="presentation">import_export</i>Request Device
    </a>
    <a class="mdl-navigation__link" href="/userRequestHistory.html">
        <i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">storage</i>My
        Devices
    </a>`;
    if (role == "Admin") {
        let nav = ` 
    
   
    <a class="mdl-navigation__link" href="/web.html">
        <i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">group</i>Users
    </a>
    <a class="mdl-navigation__link" href="/adminRequestPage.html">
        <i class="mdl-color-text--blue-grey-400 material-icons"
            role="presentation">import_export</i>All Requests
    </a>
    <a class="mdl-navigation__link" href="/request-history.html">
        <i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">history</i>Request History
    </a>
   
    <a class="mdl-navigation__link" href="/device_role/role1.html">
        <i class="mdl-color-text--blue-grey-400 material-icons"
            role="presentation">perm_device_information</i>Permissions
    </a></nav>

    `;
        document.getElementById(element).innerHTML = navigation + nav;
    }
   else if(role == "User")
   {
    document.getElementById(element).innerHTML = navigation;
}
}