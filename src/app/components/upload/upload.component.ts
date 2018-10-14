import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { ImageService } from '../../services/image/image.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
/**
 * @name UploadComponent
 * @description Created to upload a new image into storage
 * @author Amit Kumar
 */
export class UploadComponent implements OnInit {
  @ViewChild('inputFile') myInputVariable: ElementRef;
  imageData: any = null;
  showprev: boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private imageService: ImageService) { }

  ngOnInit() {
  }

  /**
  * @name previewFile
  * @param void
  * @description Used to preview file and convert image to base64 data for local storage
  * @returns void
  */
  previewFile(event) {
    var input = event.target;
    this.imageData = null;
    if (input.files[0].size > 1000000) {
      this.imageService.showSnackBar("Invalid image size.", "Ok");
    } else if (input.files && input.files[0] && (input.files[0].type == 'image/jpeg' || input.files[0].type == 'image/jpg' || input.files[0].type == 'image/png')) {
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

  /**
  * @name close
  * @param void
  * @description Used to close image preview
  * @returns void
  */
  close() {
    this.imageData = null;
  }

  /**
  * @name saveImage
  * @param void
  * @description Used to save image into local storage
  * @returns void
  */
  saveImage() {
    if (this.imageData == null || this.imageData == "") {
      this.imageService.showSnackBar("Please select a image file.", "Ok");
      return false;
    }
    this.imageService.localStorageHandler(this.myInputVariable.nativeElement.files[0], this.imageData).subscribe(data => {
      let localData: any = data;
      this.imageData = null;
      this.showprev = false;
      this.imageService.showSnackBar("Image uploaded.", "Ok");
      this.data.imageData = localData;
    });

  }

}
