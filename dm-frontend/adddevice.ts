
import { AddDevice } from './device_crud';
import { navigationBarsss } from './globals';
import { specificationDropdown } from './Device-Request/UserRequestMain';
let token = JSON.parse(sessionStorage.getItem("user_info"))["token"];
let brand = (document.getElementById("inputbrand") as HTMLInputElement);
let type = (document.getElementById("inputtype") as HTMLInputElement);
let model = (document.getElementById("inputmodel") as HTMLInputElement);
let specification = (document.getElementById("specification") as HTMLSelectElement);
function checkDropDown(elements: string,compareElement) {
  let flag = 0;
  let option = (document.getElementById(elements)as HTMLDataListElement).options;
  Array.from(option).forEach(element => {
    if (compareElement.value == element.value) {
      flag = 1;
    }
  });

  return flag;
}
// function checkTypeBrandModel() {

//   return (brand.value && type.value && model.value);
// }
(document.querySelector('#inputtype') as HTMLInputElement).addEventListener('change', function (e) {
  console.log((document.getElementById("inputtype") as HTMLInputElement).value)
  let types = checkDropDown("type",type);
  if (types == 0) {
    console.log("type");
    if (confirm("do you want to add new type")) {
      const temp = new AddDevice(token);
      temp.addNewTypeBrandModel("/api/Device/type", "inputtype");
      temp.typeDropdown();
    }
    else
    {
      (document.getElementById("inputtype") as HTMLInputElement).value="";
    }
  }
  // if (checkTypeBrandModel())
  // specificationDropdown(type.value, brand.value, model.value);
 
});
(document.querySelector('#inputbrand') as HTMLInputElement).addEventListener('change', function (e) {
  let brands = checkDropDown("brand",brand);
  if (brands == 0) {
    console.log("brands");
    if (confirm("do you want to add new brand")) {
      const temp = new AddDevice(token);
      temp.addNewTypeBrandModel("/api/Device/brand", "inputbrand");
      temp.brandDropdown();
    }
    else
    {
      (document.getElementById("inputbrand") as HTMLInputElement).value="";
    }
  }
  // if (checkTypeBrandModel())
  // specificationDropdown(type.value, brand.value, model.value);
 
});
(document.querySelector('#inputmodel') as HTMLInputElement).addEventListener('change', function (e) {
  let models = checkDropDown("model",model);
  if (models == 0) {
    console.log("model");
    if (confirm("do you want to add new model")) {
      const temp = new AddDevice(token);
      temp.addNewTypeBrandModel("/api/Device/model", "inputmodel");
      temp.modelDropdown();
    }
    else
    {
      (document.getElementById("inputmodel") as HTMLInputElement).value="";
    }
  }
  // if (checkTypeBrandModel())
  // specificationDropdown(type.value, brand.value, model.value);
 
});
(document.querySelector('#popup_specification') as HTMLButtonElement).addEventListener('submit', function (e) {
  console.log("inside function")
  e.preventDefault();
  const temp = new AddDevice(token);
  temp.addNewSpecification();
  
  (document.getElementById("popupForm") as HTMLFormElement).style.display = "none";
  // temp.specificationDropdown();

});

(document.querySelector('#back') as HTMLButtonElement).addEventListener('click', function (e) {
  window.location.href = "./deviceListForadmin.html";
});

(document.querySelector('#submit') as HTMLButtonElement).addEventListener('click', function (e) {
  console.log("add");
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("device_id");
  console.log(myParam);
  e.preventDefault();
  const temp = new AddDevice(token);
   if(validation()){
  if (myParam) {
   
    temp.update_device(myParam);
    
    // window.location.href = "./deviceListForadmin.html";
  }
  else {
    
    temp.Create_device();
   
    //window.location.href = "./deviceListForadmin.html";
  }
   }

});
navigationBarsss("Admin", "navigation");
const temp = new AddDevice(token);
temp.brandDropdown();
temp.typeDropdown();
temp.modelDropdown();
temp.getSpecificationDropdown();
temp.statusDropdown();
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get("device_id");
if (myParam != null) {
  temp.getDataToForm();
 
}
function validation()
      {
        
          let flag=1;
          var device_color=(document.getElementById("color")as HTMLInputElement).value;
          var device_price=(document.getElementById("price")as HTMLInputElement).value;
          var device_serial_number=(document.getElementById("serial_number")as HTMLInputElement).value;
          var device_warranty_year=(document.getElementById("warranty_year")as HTMLInputElement).value;
          var device_purchase_date=(document.getElementById("purchase_date")as HTMLInputElement).value;
          var device_entry_date=(document.getElementById("entry_date")as HTMLInputElement).value;
         if(type.value=="")
         {
          document.getElementById("types").innerHTML="*please enter the Device Type";
          flag=0; 
          }
          if(brand.value=="")
         {
          document.getElementById("brands").innerHTML="*please enter the Device Brand";
          flag=0;
          }
          if(model.value=="")
         {
          document.getElementById("models").innerHTML="*please enter the Device Model";
          flag=0;
          }
          if(device_color=="")
          {
            
              document.getElementById("colors").innerHTML="*please enter the color";
              flag=0;
          }
          if(device_price=="")
          {
            document.getElementById("prices").innerHTML="*please enter the price";
            flag=0;
          }
          if(device_serial_number=="")
          {
            document.getElementById("serial_numbers").innerHTML="*please enter the serial number";
            flag=0;
          }
          if(device_warranty_year=="")
          {
            document.getElementById("warranty_years").innerHTML="*please enter the warranty year";
            flag=0;
          }
          if(device_purchase_date=="")
          {
            document.getElementById("purchase_dates").innerHTML="*please enter the purchase date";
            flag=0;
          }
          if(device_entry_date=="")
          {
            document.getElementById("entry_dates").innerHTML="*please enter the entry date";
            flag=0;
          }
       if(flag==0)
       {
         return false;
       }   
       else{
         return true;
       }
      }