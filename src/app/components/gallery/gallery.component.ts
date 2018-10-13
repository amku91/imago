import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, empty, of } from 'rxjs';
import { environment } from '../../../environments/environment';

import { ImageService } from '../../services/image/image.service';

import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  preImageData:any = [];
  newUploadedImageData:any = [];
  constructor(public imageService: ImageService) { }

  ngOnInit() {
    /** Load pre images from cloud */
    this.showPreImages();
  }

  showPreImages(){
    this.imageService.getPreImages().subscribe(data => {
      let rowData:any = data;
      this.preImageData = rowData.resources;
    }, error => {
      this.imageService.showSnackBar("Unable to load pre images", "Ok");
    });
  }

}
