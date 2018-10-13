import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { ImageService } from '../../services/image/image.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  @ViewChild('inputFile') myInputVariable: ElementRef;
  imageData: any;
  showprev: boolean = false;
  storageKeyName = environment.localStorageKey;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private imageService: ImageService) { }

  ngOnInit() {
  }

  previewFile(event) {
    var input = event.target;
    if (input.files && input.files[0] && (input.files[0].type == 'image/jpeg' || input.files[0].type == 'image/jpg' || input.files[0].type == 'image/png' || input.files[0].type == 'image/ico')) {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.imageData = e.target;
        this.imageData = this.imageData.result;

      }
      reader.readAsDataURL(input.files[0]);
      this.showprev = true;
    } else {
      this.imageService.showSnackBar("Invalid image type.", "Ok");
    }
  }
  close() {
    this.imageData = null;
  }

  saveImage() {
    if (this.imageData == null || this.imageData == "") {
      this.imageService.showSnackBar("Please select a image file.", "Ok");
      return false;
    }
    this.localStorageHandler(this.myInputVariable.nativeElement.files[0]);
  }

  localStorageHandler(imgObj: any) {
    /* First check for previous images */
    var localData: any = localStorage.getItem(this.storageKeyName);
    try {
      localData = JSON.parse(localData);
    } catch (e) {
      localData = [];
    }
    let tDate = new Date();
    let tempData = {
      "public_id": "imago/" + (tDate.getTime()) + "-" + imgObj.size + "-" + Math.floor((Math.random() * 6) + 1),
      "resource_type": imgObj.type,
      "type": "local",
      "created_at": tDate,
      "bytes": imgObj.size,
      "data": this.imageData
    };
    if (localData && localData.length > 0) {
      localData.push(tempData);
    } else {
      localData = [];
      localData.push(tempData);
    }
    localStorage.setItem(this.storageKeyName, JSON.stringify(localData));
    this.imageData = null;
    this.showprev = false;
    this.imageService.showSnackBar("Image uploaded.", "Ok");
    this.data.imageData = localData;
  }

}
