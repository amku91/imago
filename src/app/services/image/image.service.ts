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
/**
 * @name ImageService
 * @description Created to manage all local storage related operation and pre image data loading
 * @author Amit Kumar
 */
export class ImageService {
  preImageDataURI: any = "./assets/data/preimagedata.json";
  storageKeyName = environment.localStorageKey;
  storageDeleteKey = environment.localDeleteKey;
  constructor(public snackBar: MatSnackBar, private _http: Http) { }

  /**
  * @name getPreImages
  * @param void
  * @description Used to fetch some pre defined images from image data json file located in asset folder
  * @returns json array observable
  */
  getPreImages() {
    /** Load some pre d */
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    return this._http
      .get(this.preImageDataURI, options)
      .map(response => <string>response.json());
  }

  /**
  * @name localStorageHandler
  * @param Image Object
  * @param Image Data
  * @description Used to store uploaded file in local storage
  * @returns saved file json array observable
  */
  localStorageHandler(imgObj: any, imageData: any) {
    return new Observable((observer) => {
      /* First check for previous images */
      this.getLocalImages().subscribe(data => {
        var localData: any = data;
        let tDate = new Date();
        /** Build image object */
        let tempData = {
          "public_id": "imago/" + (tDate.getTime()) + "-" + imgObj.size + "-" + Math.floor((Math.random() * 6) + 1),
          "resource_type": imgObj.type,
          "type": "local",
          "created_at": tDate,
          "bytes": imgObj.size,
          "data": imageData
        };
        if (localData && localData.length > 0) {
          localData.push(tempData);
        } else {
          localData = [];
          localData.push(tempData);
        }
        localStorage.setItem(this.storageKeyName, JSON.stringify(localData));
        observer.next(localData);
        observer.complete();
      });
    });
  }

  /**
  * @name deleteFromLocalStorage
  * @param Image Type: local/cloud
  * @param Image Unique ID
  * @description Used to delete uploaded file in local storage
  * @returns void
  */
  deleteFromLocalStorage(imageType: string, imageID: string) {
    return new Observable((observer) => {
      if (imageType == "local") {
        let imageIndex: number;
        this.getLocalImages().subscribe(data => {
          let localImageData: any = data;
          /** Find index in local storage array */
          localImageData.forEach((element, index) => {
            if (element.public_id == imageID) {
              imageIndex = index;
            }
          });
          /* Set back local storage */
          localImageData.splice(imageIndex, 1)
          localStorage.setItem(this.storageKeyName, JSON.stringify(localImageData));
          observer.next();
          observer.complete();
        });
      } else {
        /* Set delete key for cloud images */
        var cloudData: any = localStorage.getItem(this.storageDeleteKey);
        /** Parse data or initialise blank array */
        try {
          cloudData = JSON.parse(cloudData);
        } catch (e) {
          cloudData = [];
        }
        /* Check if cloud data does not have empty value */
        if (!cloudData) cloudData = [];
        cloudData.push(imageID);
        localStorage.setItem(this.storageDeleteKey, JSON.stringify(cloudData));
        observer.next();
        observer.complete();
      }
    });
  }

  /**
  * @name getLocalImages
  * @param void
  * @description Used to fetch all local stored images form local storage
  * @returns Image data observable
  */
  getLocalImages() {
    return new Observable((observer) => {
      var localData: any = localStorage.getItem(this.storageKeyName);
      /** Parse data or initialise blank array */
      try {
        localData = JSON.parse(localData);
      } catch (e) {
        localData = [];
      }
      /* CHeck local data does not have empty value */
      if (!localData) localData = [];
      observer.next(localData);
      observer.complete();
    });
  }

  /**
  * @name getDeletedImages
  * @param void
  * @description Used to fetch all deleted images id's form local storage
  * @returns Deleted image data observable
  */
  getDeletedImages() {
    return new Observable((observer) => {
      var localData: any = localStorage.getItem(this.storageDeleteKey);
      /** Parse data or initialise blank array */
      try {
        localData = JSON.parse(localData);
      } catch (e) {
        localData = [];
      }
      /* CHeck local data does not have empty value */
      if (!localData) localData = [];
      observer.next(localData);
      observer.complete();
    });
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
