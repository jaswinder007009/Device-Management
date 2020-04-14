export class navigate
{
    constructor()
    {
        let navbar = `<span class="mdl-layout-title">Submission Request</span>
        <nav class="mdl-navigation">
            <a class="mdl-navigation__link" href="dashboard.html">
                <i class="mdl-color-text--blue-grey-400 material-icons"
                    role="presentation">dashboard</i>Dashboard
            </a>
            <a class="mdl-navigation__link" href="">Device History</a>
            <a class="mdl-navigation__link" href="">User List</a>
            <a class="mdl-navigation__link" href="">Link</a>
        </nav>`;


    document.getElementById("navigate").innerHTML=navbar;
    }
}