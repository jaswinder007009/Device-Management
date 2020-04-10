import { BASEURL } from "./globals";
import { Sort } from "./user-profile/SortingUser";
import {Notifications} from "./notification";
class Notify
{
    getNotification(URL:any)
    {
        fetch(
            BASEURL + "/api/notification"+URL 
        )
            .then(Response => Response.json())
            .then(data => {
                console.log(data);
                (document.getElementById("notification_data") as HTMLTableElement).innerHTML = "";
            
                for (let element in data) {
                    let res = new Notifications(data[element]);
                    res.getNotificationTable();
                }
            })
            .catch(err => console.log(err));

    }
    notification(id:any)
    {
        let URL = "?id=" + id;
        this.getNotification(URL);
    }
    notificationSearch(search:string)
    {
        let URL = "?search="+search;
        this.getNotification(URL);
    }
    notificationSort(sort:string,direction:string)
    {
        let URL = "?sort="+sort +"&direction=" +direction;
        this.getNotification(URL);
    }
}
document.getElementById("fixed-header-drawer-exp").addEventListener("keyup",function(e)
{
    let search = (document.getElementById("fixed-header-drawer-exp")as HTMLInputElement).value;
    console.log(search);
    notify.notificationSearch(search);    
});
document.addEventListener("click", function (e) {

    if ((e.target as HTMLTableElement).tagName == 'TH') {
       
        
        let id = (e.target as HTMLTableHeaderCellElement);
        let column = (e.target as HTMLTableHeaderCellElement).dataset.id;
	    let sorts = new Sort();
        let direction =sorts.checkSortType(id);
        console.log(direction);
        notify.notificationSort(column,direction);
           
        }
        
            if ((e.target as HTMLButtonElement).className == "accept-button") {
               confirm("Are you sure you want to submit the device?");

            }
        if ((e.target as HTMLButtonElement).className == "reject-button") {
               confirm("Are you sure you donot want to submit the device?");
               
            }
        
});

let notify = new Notify();
notify.notification("");
