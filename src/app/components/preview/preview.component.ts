import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  imageData: any;
  imageID: string;
  imageType: string;
  imageUrl: string;
  imageIndex: number = 0;
  disableBackArrow: boolean = false;
  disableForwardArrow: boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.imageData = this.data.imageData;
    this.imageID = this.data.id;
    this.imageType = this.data.type;
    /** Handle image type */
    this.imageType == "cloud" ? this.handlePreImage() : this.handleLocalImage();
  }

  handlePreImage() {
    this.imageData.forEach((element, index) => {
      if (element.public_id == this.imageID) {
        this.imageUrl = element.secure_url;
        this.imageIndex = index;
      }
    });
    if (this.imageIndex == 0)
      this.disableBackArrow = true;
      if (this.imageIndex == (this.imageData.length -1 ))
      this.disableForwardArrow = true;
  }

  handleLocalImage() {

  }

  loadNextImage() {
    let imageIndex = this.imageIndex + 1;
    this.disableBackArrow = false;
    this.imageIndex = imageIndex;
    this.imageUrl = this.imageData[this.imageIndex].secure_url;
    if (imageIndex == (this.imageData.length - 1)) {
      this.disableForwardArrow = true;
      return;
    }
  }

  loadPreviousImage() {
    let imageIndex = this.imageIndex - 1;
    this.disableForwardArrow = false;
    if (imageIndex == 0) {
      this.disableBackArrow = true;
      return;
    }
    this.imageIndex = imageIndex;
    this.imageUrl = this.imageData[this.imageIndex].secure_url;
  }

}
