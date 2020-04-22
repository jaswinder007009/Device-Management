export class HitApi {
  Data: any;
  token: string;

  constructor(token: string) {
    this.token = token;
  }
  public async HitGetApi(uri: string) {
    let res;
    // try {
      res = await fetch(uri, {
        headers: new Headers({ Authorization: `Bearer ${this.token}` }),
      });
      // debugger
      console.log(res.status);
    // } catch {
        // console.log("error while hittiing api");
        // return null;
    // }
    const data = await res.json();
    return await data;
  }

  public async HitPostApi(uri: string, data: any) {
    return fetch(uri, {
      method: "POST",
      headers: new Headers([
        ["Content-Type", "application/json"],
        ["Authorization", `Bearer ${this.token}`],
      ]),
      body: JSON.stringify(data),
    });
  }
  public async HitPutApi(uri: string, data: any) {
    //console.log(data);
    return fetch(uri, {
      method: "PUT",
      headers: new Headers([
        ["Content-Type", "application/json"],
        ["Authorization", `Bearer ${this.token}`],
      ]),
      body: JSON.stringify(data),
    });
  }
}
