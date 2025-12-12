import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  public get() : Map<string, string>{
    let cookies = new Map<string, string>();
    document.cookie.split(",").forEach(elmt=>{
      let parsedElmt = elmt.trim().split("=")
      if (parsedElmt.length == 2) cookies.set(parsedElmt[0], parsedElmt[1]);
    });
    return cookies;
  }
  public set(map : Map<string, string>) : void{
    document.cookie = "";
    map.forEach((value, key) => {
      document.cookie += `${key}=${value}, `;
    });
  }
}
