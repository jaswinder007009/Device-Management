import { HitApi } from "./HitRequestApi";
import { populateDropDown } from "./populateDropDown";
import { RequestDeviceModel } from "./deviceRequestModel";
import { BASEURL, Token, amIUser, navigationBarsss } from "../globals";
import { CreateUserApi } from "../createApi";

(async function () {
  let obj = Token.getInstance();
  let role = (await amIUser(obj.tokenKey)) == true ? "User" : "Admin";
  navigationBarsss(role, "navigations");
  return null;
})();

var device = [].map.call(document.querySelectorAll(".device"), (e) => {
  return e;
});
startup();


function startup() {
  device.map(function (e: any) {
    const path = BASEURL + "/api/dropdown/" + e.id;
    let data = GetData(path, e.id);
  });
}

document.addEventListener("change", (event) => {
  if ((event.target as HTMLSelectElement).className == "device") {
    if (validateDevice()) {
      specificationDropdown(device[0].value, device[1].value, device[2].value);
    }
  }
});

export async function specificationDropdown(
  types: string,
  brands: string,
  models: string
) {
  console.log(types + " " + brands + " " + models);
  let uri =
    BASEURL +
    "/api/Dropdown/" +
    encodeURI(types) +
    "/" +
    encodeURI(brands) +
    "/" +
    encodeURI(models) +
    "/specification";
  let obj = Token.getInstance();

  let data = await new HitApi(obj.tokenKey).HitGetApi(uri);

  console.log(data);
  (document.getElementById("specification") as HTMLSelectElement).innerHTML =
    "";
  (document.getElementById(
    "specification"
  ) as HTMLSelectElement).innerHTML += `<option value=""> </option>`;
  for (let i = 0; i < data.length; i++) {
    (document.getElementById("specification") as HTMLSelectElement).innerHTML +=
      '<option value="' + data[i].specification_id +'">' + ( data[i].ram == "" ? "" : " RAM: " +
      data[i].ram)  +
      (data[i].storage == "" ? "" : " Storage: " +
      data[i].storage) +
      (data[i].screen_size == "" ? "" : " Screen Size: " +
      data[i].screen_size) +
      (data[i].connectivity == "" ? "" : " Connectivity: " +
      data[i].connectivity) +
      "</option>";
  }
  return null;
}

async function GetData(uri: string, column: string) {
  let obj = Token.getInstance();

  let data = await new HitApi(obj.tokenKey).HitGetApi(uri);
  console.log(data);
  new populateDropDown().populateDevice(data, column);
  return data;
}

document.querySelector("#request")?.addEventListener("click", (e) => {
  let obj = Token.getInstance();
  var body = bindData(obj.userID);
  console.log(JSON.stringify(body));
  if (validate()) {
    let uri = BASEURL + "/request/device";

    new HitApi(obj.tokenKey).HitPostApi(uri, body).then((res) => {
      if (res.status == 200) alert("device request submitted ");
      else alert("device request submission failed ");
    });
    clearData();
  }
});

function clearData() {
  device.map((data) => {
    data.selectedIndex = 0;
  });
  (document.getElementById("expected-days") as HTMLInputElement).value = "";
  (document.getElementById(
    "specification"
  ) as HTMLSelectElement).selectedIndex = 0;
  (document.getElementById("comment") as HTMLTextAreaElement).value = "";
}

function validate() {
  if (
    (document.getElementById("expected-days") as HTMLInputElement).value == ""
  ) {
    alert("enter days");
    return 0;
  }
  if (!validateDevice()) {
    alert("enter device name  ");
    return 0;
  }

  if (
    (document.getElementById("specification") as HTMLInputElement).value == ""
  ) {
    alert("enter specification");
    return 0;
  }
  return 1;
}

function validateDevice() {
  for (let data of device)
    if (data.value == "") {
      return 0;
    }

  return 1;
}

function bindData(userID: number) {
  var body = new RequestDeviceModel();
  body.userId = userID;
  body.devicetype = device[0].value;
  body.brand = device[1].value;
  body.model = device[2].value;
  body.days = parseInt(
    (document.getElementById("expected-days") as HTMLInputElement).value
  );
  body.specificationId = parseInt(
    (document.getElementById("specification") as HTMLSelectElement).value
  );
  body.comment = (document.getElementById(
    "comment"
  ) as HTMLTextAreaElement).value;
  return body;
}
