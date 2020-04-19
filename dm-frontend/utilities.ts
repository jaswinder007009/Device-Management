export function openForm() {
	// document.getElementsByClassName("RegisterForm")[0].classList.add("active");
	(document.querySelector("#myForm") as HTMLFormElement).style.display="block";
}
​
export function closeForm() {
	// document.getElementsByClassName("RegisterForm")[0].classList.remove("active");
    (document.querySelector("#myForm") as HTMLFormElement).style.display="none";
    (document.querySelector("#myForm") as HTMLFormElement).reset();
}
export function formatDate1(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}