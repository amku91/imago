import { Component, OnInit, Inject  } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  imageData:any;
  imageID:string;
  imageType:string;
  imageUrl:string;
  disableBackArrow:boolean = false;
  disableForwardArrow:boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.imageData = this.data.imageData;
    this.imageID = this.data.id;
    this.imageType = this.data.type;
    /** Handle image type */
    this.imageType == "cloud" ? this.handlePreImage() : this.handleLocalImage();
  }

  handlePreImage(){
    this.imageData.forEach(element => {
      if(element.public_id == this.imageID)
      this.imageUrl = element.secure_url;
    });
    console.log(this.imageUrl);
  }

  handleLocalImage(){

  }

}
