import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  //apiUrl: string = "https://localhost:44316/";
  apiUrl: string = "http://performanceapi-001-site1.itempurl.com/";
  apiUrlModify: string = "";

  constructor(public http: HttpClient) { }

  getServiceWithOutParams(url: string) {
    this.apiUrlModify = this.apiUrl + url;
    return this.http.get(this.apiUrlModify);
  }

  getServiceWithOneParams(url: string,param) {
    this.apiUrlModify = this.apiUrl + url + "/" + param;
    return this.http.get(this.apiUrlModify);
  }

  postService(url: string, objectSender: any) {
    this.apiUrlModify = this.apiUrl + url;
    return this.http.post(this.apiUrlModify,objectSender);
  }
}
