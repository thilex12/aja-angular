import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  private apiURL : String = environment.url;
  private http = inject(HttpClient);  
  // Prepare header content (conf basic auth)
  protected prepareHeader(username : string | undefined, password : string | undefined) : HttpHeaders{
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    if (username && password){
      header.append("Authorization", "Basic " + btoa(username+":"+password));
    }
    return header;
  }
  // Call the API with specified method
  protected call(method : Function, path : string, username : string | undefined, password : string | undefined, query = {} ) : void{
    const httpOptions = {
      headers: this.prepareHeader(username, password)
    };
    return method(this.apiURL+path, query, httpOptions);
  }
  // Make a GET call to the API
  public get(path : string, username : string | undefined, password : string | undefined){
    return this.call(this.http.get, path, username, password);
  }
  // Make a POST call to the API
  public post(path : string, username : string | undefined, password : string | undefined, datas = {}){
    return this.call(this.http.post, path, username, password, datas);
  }
  // Make a PUT call to the API
  public put(path : string, username : string | undefined, password : string | undefined, datas = {}){
    return this.call(this.http.put, path, username, password, datas);
  }
  // Make a DELETE call to the API
  public delete(path : string, username : string | undefined, password : string | undefined, datas = {}){
    return this.call(this.http.delete, path, username, password, datas);
  }
}
