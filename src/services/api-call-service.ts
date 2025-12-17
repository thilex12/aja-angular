import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  private apiURL : String = environment.url;
  private http = inject(HttpClient);  

  // Prepare header content (conf basic auth)
  protected prepareHeader(username : string | null, password : string | null) : Record<string, string | string[]>{
    let header: Record<string, string | string[]> = {};
    header["Content-Type"] ="application/json"; 
    if (username && password) header["Authorization"] = "Basic " + btoa(username+":"+atob(password)); 
    return header;
  }

  // Call the API with specified method
  protected call<T>(method : string, path : string, username : string | null, password : string | null, query = {} ) : Observable<T>{
    const httpOptions = {
      headers: this.prepareHeader(username, password)
    };
    switch(method){
      case "GET" :{
        return this.http.get<T>(this.apiURL+path, httpOptions);
      }
      case "POST" :{
        return this.http.post<T>(this.apiURL+path, query, httpOptions);
      }
      case "PUT" :{
        return this.http.put<T>(this.apiURL+path, query, httpOptions);
      }
      case "DELETE" :{
        return this.http.delete<T>(this.apiURL+path, httpOptions);
      }
      default : {
        return this.http.get<T>(this.apiURL+path, httpOptions);
      }
    }
    
  }
  // Make a GET call to the API
  public get<T>(path : string, username : string | null = null, password : string | null = null) : Observable<T>{
    return this.call<T>("GET", path, username, password);
  }
  // Make a POST call to the API
  public post<T>(path : string, username : string | null = null, password : string | null = null, datas = {}) : Observable<T>{
    return this.call<T>("POST", path, username, password, datas);
  }
  // Make a PUT call to the API
  public put<T>(path : string, username : string | null = null, password : string | null = null, datas = {}) : Observable<T>{
    return this.call<T>("PUT", path, username, password, datas);
  }
  // Make a DELETE call to the API
  public delete<T>(path : string, username : string | null = null, password : string | null = null, datas = {}) :  Observable<T>{
    return this.call<T>("DELETE", path, username, password, datas);
  }
}
