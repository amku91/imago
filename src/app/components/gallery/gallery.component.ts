import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, empty, of, observable } from 'rxjs';
import { ImageService } from '../../services/image/image.service';
import { PreviewComponent } from '../preview/preview.component';
import { UploadComponent } from '../upload/upload.component';
import { PageEvent } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
/**
 * @name GalleryComponent
 * @description Created to show image on home page and paginate them
 * @author Amit Kumar
 */
export class GalleryComponent implements OnInit {

  preImageData: any = [];
  allImageData: any = [];
  newUploadedImageData: any = [];
  length: number = 0;
  pageSize: number = 15;
  pageSizeOptions: number[] = [10, 15, 25, 50];
  pageEvent: PageEvent;
  activePageData: any = [];
  constructor(public imageService: ImageService, public dialog: MatDialog) { }

  ngOnInit() {
    /** Load pre images from cloud */
    this.showPreImages();
    localStorage.getItem("imagoimgData");
  }

  /**
  * @name showPreImages
  * @param void
  * @description Used to handle pre images loading into page
  * @returns void
  */
  showPreImages() {
    /** Loop and load pre defined images */
    this.imageService.getPreImages().subscribe(data => {
      let rowData: any = data;
      this.preImageData = rowData.resources;
      this.getAllImageData(rowData.resources).subscribe((data) => {
        this.allImageData = data;
        this.length = this.allImageData.length;
        this.activePageData = this.getGridLayoutData(this.allImageData.slice(0, this.pageSize));
      });
    }, error => {
      this.imageService.showSnackBar("Unable to load pre images.", "Ok");
    });
  }

  /**
  * @name setPageSizeOptions
  * @param void
  * @description Used to set pagination page size
  * @returns void
  */
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    /** Set page size to paginator */
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  /**
  * @name onPageChanged
  * @param pagination click event e
  * @description Used to handle pagination into gallery
  * @returns void
  */
  onPageChanged(e) {
    let startIndex = e.pageIndex * e.pageSize;
    let lastIndex = startIndex + e.pageSize;
    this.activePageData = this.getGridLayoutData(this.allImageData.slice(startIndex, lastIndex));
  }

  /**
  * @name getAllImageData
  * @param Json Object Pre Image Data
  * @description Used to merge all images based on local and pre images. Also reverse stored images.
  * @returns void
  */
  getAllImageData(preImageData: any) {
    /** First check with deleted images and remove them. Next merge both pre images and local store images */
    return new Observable((observable) => {
      this.imageService.getDeletedImages().subscribe(data => {
        let rowData: any = data;
        let tempLocalData: any = preImageData;
        let tempLocalDataExact: any = tempLocalData;
        tempLocalData.forEach((element, index) => {
          if (rowData.includes(element.public_id)) {
            tempLocalDataExact.splice(index, 1);
          }
        });
        preImageData = tempLocalDataExact;
        this.imageService.getLocalImages().subscribe(data => {
          let localImages: any = data;
          localImages = localImages.slice().reverse();
          preImageData = localImages.concat(preImageData);
          observable.next(preImageData);
          observable.complete();
        });
      });
    });
  }

  /**
  * @name getGridLayoutData
  * @param array of images object
  * @description Used to make five column grid layout
  * @returns formatted output
  */
  getGridLayoutData(rowData: any) {
    let result: any = [];
    let i: number;
    let j: number;
    let chunk: number = 5;
    /** make chunk array where each element containing 5 images */
    for (i = 0, j = rowData.length; i < j; i += chunk) {
      let temparray = rowData.slice(i, i + chunk);
      result.push(temparray);
    }
    return result;
  }

  /**
  * @name openViewDialog
  * @param image id, image type
  * @description Used to show zoomed view dialog
  * @returns void
  */
  openViewDialog(id: string, type: string) {
    var scope = this;
    let dialogRef = this.dialog.open(PreviewComponent, {
      width: 'auto',
      height: 'auto',
      panelClass: 'imageview',
      data: {
        id: id,
        type: type,
        imageData: this.allImageData,
      }
    });
    /** Reload images after closing dialog */
    dialogRef.afterClosed().subscribe(result => {
      this.showPreImages();
    });
  }

  /**
  * @name openAddDialog
  * @param void
  * @description Used to open image upload dialog
  * @returns void
  */
  openAddDialog() {
    var scope = this;
    let dialogRef = this.dialog.open(UploadComponent, {
      width: 'auto',
      height: 'auto',
      panelClass: 'imageview',
      data: {
        type: "local",
        imageData: this.allImageData,
      }
    });
    /** Reload images after closing dialog */
    dialogRef.afterClosed().subscribe(result => {
      this.showPreImages();
    });
  }

}
