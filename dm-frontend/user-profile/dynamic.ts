export function dynamicGenerate(data) {
    this.headerTag = (document.querySelector(".data-hideable") as HTMLInputElement);
    this.headerTag1 = (document.querySelector(".data-hideable1") as HTMLInputElement);
    this.headerTag2 = (document.querySelector(".data-hideable2") as HTMLInputElement);
    this.data = data;

    this.headerTag.innerHTML = "";
    {
        this.headerTag.innerHTML += ` <span>NAME:${this.data["salutation"] + " " + this.data["firstName"] + " " + this.data["middleName"] + " " + this.data["lastName"]}</span><br>
        <span>GENDER:${this.data["gender"]}</span><br>
        <span>DESIGNATION:${this.data["designationName"]}</span><br>
        <span>DEPARTMENT:${this.data["departmentName"]}</span><br>
        <span>EMAIL:${this.data["email"]}</span><br>
        <span>DATE OF BIRTH:${this.data["dob"]}</span><br>
        <span>DATE OF JOINING:${this.data["doj"]}</span><br>
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored edit">EDIT
        </button>`

    }

    {
        let headerTag1HTML: string = '';
        for (let address of this.data.addresses) {
            headerTag1HTML +=
                ` <span>${address.addressType} ADDRESS :</span><br>
            <span>ADDRESS   ${address.addressLine1},
             ${address.addressLine2}</span><br>
            <span>CITY:    ${address.city}</span><br>
            <span>STATE:   ${address.state}</span><br>
            <span>COUNTRY:    ${address.country}</span><br>
            <span>PIN:    ${address.pin}</span><br>`;
        }
        headerTag1HTML += '<button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored edit">EDIT</button>';
        this.headerTag1.innerHTML = headerTag1HTML;
    }
    {
        let headerTag2HTML: string = '';
        for (let phone of this.data.phones) {
            headerTag2HTML +=
                ` <span>${phone.contactNumberType}:</span><br>
            <span>NUMBER:    ${phone.number}&nbsp;&nbsp;
            COUNTRY CODE:    ${phone.countryCode}&nbsp;&nbsp;
           AREA CODE:     ${phone.areaCode}</span><br>`;
        }
        headerTag2HTML += '<button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored edit">EDIT</button>';
        this.headerTag2.innerHTML = headerTag2HTML;
    }
}

