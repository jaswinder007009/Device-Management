export class populateData
{


    generateField(data : any , value : string )
    {
        const value = `<tr>
        <td class="requestedUserData"> ${historyInformation.userName}
        <span class="tooltipData">E-mail = ${historyInformation.email}</span>
        </td>
        
        <td>${historyInformation.serialNumber} </td>
        <td>${historyInformation.deviceType}</td>
        <td class="requestedUserData"> ${historyInformation.deviceName}
        <span class="tooltipData">Device Specs ${historyInformation.specifications} </span>
         </td>
        
        <td class="requestedUserData">${historyInformation.requestStatus} 
        <span class="tooltipData">Assigned for ${historyInformation.assignDays} days</span>
        </td>
        <td>${historyInformation.assignDate} </td>
        <td>${historyInformation.returnDate} </td>
        <td>${historyInformation.adminName} </td>
        </tr>`;
    }
    addData(data : string)
    {
       
        (document.getElementById(value) as HTMLTableElement).innerHTML += data;
    }

    clearData(value : string)
    {
       (document.getElementById(value) as HTMLTableElement).innerHTML = "";
     }
}