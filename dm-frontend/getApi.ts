import { BASEURL } from './globals';
import { UserModel } from "./UserModel";
import { DeviceListForUsers } from "./deviceListForUsers";

class GetApi {
	getApi(URL:string) {
		fetch(
			URL
		)
			.then(Response => Response.json())
			.then(data => {
				console.log(data);
				document.getElementById("Request_data").innerHTML = "";
				for (let i = 0; i < data.length; i++) {
					let res = new DeviceListForUsers(data[i]);
					res.getDeviceList();
				}
			})
			.catch(err => console.log(err));


	}
	getData() {
		const URL = BASEURL + "/dm/Device/page?limit1=6&offset1=0";
		this.getApi(URL);
	}
	searchByName() {
		var search = (document.getElementById("fixed-header-drawer-exp") as HTMLInputElement).value;
		const URL = BASEURL + "/dm/Device/" + search;
		this.getApi(URL);
	}
	sort(SortColumn,SortDirection: any) {
		const URL = BASEURL + "/dm/Device/sort?SortColumn="+SortColumn + "&SortDirection=" + SortDirection;
		this.getApi(URL);
	}
	checkSortType(value: string): string {
        const type = (document.getElementById(value) as HTMLTableRowElement).getAttribute("class");
        if (type === "mdl-data-table__header--sorted-descending") {
            document.getElementById(value).setAttribute("class", "mdl-data-table__header--sorted-ascending");
            return "a";
        }
        else {
            document.getElementById(value).setAttribute("class", "mdl-data-table__header--sorted-descending");
            return "d";
        }
    }

}
document.addEventListener("click", function (e) {

		const col = (e.target as HTMLElement).getAttribute('name');
		const temp = new GetApi();
		var pos = temp.checkSortType(col);
		temp.sort(col,pos);

});
document.querySelector('#fixed-header-drawer-exp').addEventListener('change', function (e) {

	console.log("test");
	const temp = new GetApi();
	temp.searchByName();
});


window.addEventListener(
	"load",
	function () {

		const temp = new GetApi();
		temp.getData();

	});

export class GetUserApi 
{
	array: any = [];
/////API TO SORT
	getSort(uri : string) {
		return fetch(uri)
			.then(Response => {
				return Response.json();
			})
			.then(data => {
				return data.map(obj => new UserModel(obj));
			});
			}
/////API GET		
	getRequest() {
		return fetch("http://localhost:5000/api/user")
			.then(Response => {
				return Response.json();
			})
			.then(data => {
				console.log(data);
				data.forEach((userObject: any) => {
					this.array.push(new UserModel(userObject));  
				});
				console.log('Array', this.array);
				
			})
			.catch(err => console.log(err));
	}
	////API TO MAKE ACTIVE INACTIVE
	userInactive(userId: number,jass : string) {
		return fetch("http://localhost:5000/api/user/" + userId + "/" + jass + "")
			.then(res =>
				console.log(res.status))
			
			.catch(err => console.error(err));
	}
/////API TO DELETE
	deleteData(userId: number) {
		fetch("http://localhost:5000/api/user/" + userId + "/remove", {
			method: "DELETE"
		});
	}
}
