import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, empty, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ImageService } from '../../services/image/image.service';
import { PageEvent } from '@angular/material';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  preImageData: any = [];
  allImageData: any = [];
  newUploadedImageData: any = [];
  length: number = 0;
  pageSize: number = 15;
  pageSizeOptions: number[] = [10, 15, 25, 50];
  pageEvent: PageEvent;
  activePageData: any = [];
  constructor(public imageService: ImageService) { }

  ngOnInit() {
    /** Load pre images from cloud */
    this.showPreImages();
  }

  showPreImages() {
    this.imageService.getPreImages().subscribe(data => {
      let rowData: any = data;
      this.preImageData = rowData.resources;
      this.allImageData = this.getAllImageData(rowData.resources);
      this.length = this.allImageData.length;
      this.activePageData = this.getGridLayoutData(this.allImageData.slice(0, this.pageSize));
    }, error => {
      this.imageService.showSnackBar("Unable to load pre images.", "Ok");
    });
  }
  
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.activePageData = this.getGridLayoutData(this.allImageData.slice(firstCut, secondCut));
  }

  getAllImageData(preImageData: any) {
    return preImageData;
  }

  getGridLayoutData(rowData: any) {
    let result: any = [];
    let i: number;
    let j: number;
    let chunk: number = 5;
    for (i = 0, j = rowData.length; i < j; i += chunk) {
      let temparray = rowData.slice(i, i + chunk);
      result.push(temparray);
    }
    return result;
  }

  openDialog(){
    
  }

}
