import { Api } from "./HitSubmissionApi";


let uri = "http://localhost:5000"

getAll();

async function getAll()
{
    let url = uri + "/ReturnRequest"
    var data = await new Api().hitGetApi(url);
    console.log(data);
    return null;
}

document.addEventListener("click", function (e) {
    if ((e.target as HTMLButtonElement).className == "submission") {
        

    console.log("dfghjk");
}
});

