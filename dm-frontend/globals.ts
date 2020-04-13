export const BASEURL = "http://localhost:5000";

export function amIAdmin(token: string){
    return fetch(BASEURL + "/api/device/is_admin",{
        headers: new Headers({"Authorization": `Bearer ${token}`})
    }
    ).then(res => res.json()).then(res => res.result as boolean);
}
export function amIUser(token: string){
    return fetch(BASEURL + "/api/device/is_user",{
        headers: new Headers({"Authorization": `Bearer ${token}`})
    }
    ).then(res => res.json()).then(res => res.result as boolean);
}