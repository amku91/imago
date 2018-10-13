import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, } from '@angular/http';
import { Observable, empty, of } from 'rxjs';
import 'rxjs/add/operator/map';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../../environments/environment';
import { Component } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  preImageDataURI:any = "./assets/data/preimagedata.json";
  constructor(public snackBar: MatSnackBar, private _http:Http) { }

  getPreImages(){
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
      return this._http
                .get(this.preImageDataURI, options)
                .map(response => <string> response.json());
  }

  /**
    * @name showSnackBar
    * @param message
    * @param action
    * @description Used to show notifications
    * @returns void
    */
   showSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
