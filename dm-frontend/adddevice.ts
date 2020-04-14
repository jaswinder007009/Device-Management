
import { AddDevice } from './device_crud';
import { navigate } from './navigation';

    
new navigate();

(document.querySelector('#brand_popup') as HTMLButtonElement).addEventListener('submit', function (e) {
    console.log("inside function")
    e.preventDefault();
    const temp = new AddDevice();
    temp.addNewBrand();
    (document.getElementById("popupForm2") as HTMLFormElement).style.display = "none";
    
    temp.brandDropdown();
  });
  (document.querySelector('#model_popup') as HTMLButtonElement).addEventListener('submit', function (e) {
    console.log("inside function model")
    e.preventDefault();
    const temp = new AddDevice();
    temp.addNewModel();
    (document.getElementById("popupForm3") as HTMLFormElement).style.display = "none";
    
    temp.modelDropdown();
    
  });

  
  
  (document.querySelector('#popuptype')as HTMLButtonElement).addEventListener('submit', function (e) {
    console.log("inside function")
    e.preventDefault();
    const temp = new AddDevice();
    temp.addNewType();
    (document.getElementById("popupForm1") as HTMLFormElement).style.display = "none";
    temp.typeDropdown();
  });
  
  (document.querySelector('#popup_specification') as HTMLButtonElement).addEventListener('submit', function (e) {
      console.log("inside function")
      e.preventDefault();
      const temp = new AddDevice();
      temp.addNewSpecification();
      (document.getElementById("popupForm") as HTMLFormElement).style.display = "none";
      temp.specificationDropdown();
      
    });
  
  (document.querySelector('#back') as HTMLButtonElement).addEventListener('click', function (e) {
      window.location.href = "./deviceListForadmin.html";
  });
  
  (document.querySelector('#submit') as HTMLButtonElement).addEventListener('click', function (e) {
      const urlParams = new URLSearchParams(window.location.search);
      const myParam = urlParams.get("device_id");
      console.log(myParam);
      e.preventDefault();
      const temp = new AddDevice();
      if (myParam) {
          temp.update_device(myParam);
          console.log("updated Successfully");
          alert("Device Updated");
          window.location.href = "./deviceListForadmin.html";
      }
      else {
        
          temp.Create_device();
          console.log("added Successfully");
          alert("Device Added");
          window.location.href = "./deviceListForadmin.html";
      }
  
  
  });
  
  const temp = new AddDevice();
  temp.brandDropdown();
  temp.typeDropdown();
  temp.modelDropdown();
  temp.specificationDropdown();
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("device_id");
  
  if(myParam!= null){
  temp.getDataToForm();
  }