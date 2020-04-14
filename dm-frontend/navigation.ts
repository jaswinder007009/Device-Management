export class navigate
{
    constructor()
    {
        let navbar = `
        <nav class="mdl-navigation">
            <a class="mdl-navigation__link" href="dashboard.html">
            <i class="mdl-color-text--blue-grey-400 material-icons"
                role="presentation">dashboard</i>Dashboard
            </a>
            <a class="mdl-navigation__link" href="userRequestHistory.html">
            <i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">storage</i>My
            Devices
            </a>
            <a class="mdl-navigation__link" href="deviceListForadmin.html">
            <i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">devices</i>All
            Devices
            </a>
            <a class="mdl-navigation__link" href="web.html">
            <i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">group</i>Users
            </a>
            <a class="mdl-navigation__link" href="adminRequestPage.html">
            <i class="mdl-color-text--blue-grey-400 material-icons"
                role="presentation">import_export</i>Request/Return
            </a>
            <a class="mdl-navigation__link" href="request-history.html">
            <i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">history</i>Device
            Requests
            </a>
            <a class="mdl-navigation__link" href="device_role/user.html">
            <i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">build</i>Roles
            </a>
            <a class="mdl-navigation__link" href="device_role/role1.html">
            <i class="mdl-color-text--blue-grey-400 material-icons"
                role="presentation">perm_device_information</i>Permissions
            </a>
                    
        </nav>`;


    document.getElementById("navigate").innerHTML=navbar;
    }
}