import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ImageService } from '../../services/image/image.service';
import { element } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
/**
 * @name PreviewComponent
 * @description Created to show zoomed view of image and delete image
 * @author Amit Kumar
 */
export class PreviewComponent implements OnInit {

  imageData: any;
  imageID: string;
  imageType: string;
  imageUrl: string;
  imageIndex: number = 0;
  disableBackArrow: boolean = false;
  disableForwardArrow: boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private imageService: ImageService) { }

  ngOnInit() {
    this.imageData = this.data.imageData;
    this.imageID = this.data.id;
    this.imageType = this.data.type;
    /** Handle image type */
    this.imageType == "cloud" ? this.handlePreImage() : this.handleLocalImage();
  }

  /**
  * @name handlePreImage
  * @param void
  * @description Used to handle pre images loading into page
  * @returns void
  */
  handlePreImage() {
    /** Loop and find image data/url */
    this.imageData.forEach((element, index) => {
      if (element.public_id == this.imageID) {
        this.imageUrl = element.secure_url;
        this.imageIndex = index;
      }
    });
    if (this.imageIndex == 0)
      this.disableBackArrow = true;
    if (this.imageIndex == (this.imageData.length - 1))
      this.disableForwardArrow = true;
  }

  /**
  * @name handleLocalImage
  * @param void
  * @description Used to handle local stored images loading into page
  * @returns void
  */
  handleLocalImage() {
    /** Loop and find image data/url */
    this.imageData.forEach((element, index) => {
      if (element.public_id == this.imageID) {
        this.imageUrl = element.data;
        this.imageIndex = index;
      }
    });
    if (this.imageIndex == 0)
      this.disableBackArrow = true;
    if (this.imageIndex == (this.imageData.length - 1))
      this.disableForwardArrow = true;
  }

  /**
  * @name loadNextImage
  * @param byPassIndex
  * @description Used to load next imgae in zoomed view. On true bypass flag do operation based on current image otherwise increment by 1
  * @returns void
  */
  loadNextImage(byPassIndex: boolean = false) {
    let imageIndex = this.imageIndex + 1;

    if (byPassIndex)
      imageIndex = this.imageIndex;
    /** reset defaults */
    this.disableBackArrow = false;
    this.imageIndex = imageIndex;
    this.imageType = this.getImageType(this.imageIndex);
    /** No image type found show warning message */ 
    if (this.imageType == "") {
      this.imageService.showSnackBar("Image not found.", "Ok");
    }

    this.imageID = this.imageData[this.imageIndex].public_id;
    this.imageUrl = (this.imageType == "cloud" ? this.imageData[this.imageIndex].secure_url : this.imageData[this.imageIndex].data);
    if (imageIndex == (this.imageData.length - 1)) {
      this.disableForwardArrow = true;
    }
    if (imageIndex == 0) {
      this.disableBackArrow = true;
    }
  }

  /**
  * @name loadPreviousImage
  * @param byPassIndex
  * @description Used to load previous imgae in zoomed view. On true bypass flag do operation based on current image otherwise decrement by 1
  * @returns void
  */
  loadPreviousImage(byPassIndex: boolean = false) {
    let imageIndex = this.imageIndex - 1;
    if (byPassIndex)
      imageIndex = this.imageIndex;
    /** reset defaults */
    this.disableForwardArrow = false;
    if (imageIndex == 0) {
      this.disableBackArrow = true;
    } else if (imageIndex < 0)
      return;

    this.imageIndex = imageIndex;
    this.imageType = this.getImageType(this.imageIndex);
    /** No image type found show warning message */  
    if (this.imageType == "") {
      this.imageService.showSnackBar("Image not found.", "Ok");
    }

    this.imageID = this.imageData[this.imageIndex].public_id;
    this.imageUrl = (this.imageType == "cloud" ? this.imageData[this.imageIndex].secure_url : this.imageData[this.imageIndex].data);
  }

  /**
  * @name getImageType
  * @param imageIndex
  * @description Used return image type based on index
  * @returns Image type: cloud, local
  */
  getImageType(imageIndex: number) {
    let type = "";
    this.imageData.forEach((element, index) => {
      if (index == imageIndex) {
        type = element.type;
      }
    });
    return type;
  }

  /**
  * @name deleteImage
  * @param void
  * @description Used to delete image from both local or cloud storage
  * @returns void
  */
  deleteImage() {
    this.imageService.deleteFromLocalStorage(this.imageType, this.imageID).subscribe(data => {
      this.imageData.splice(this.imageIndex, 1);
      this.imageService.showSnackBar("Image deleted.", "Ok");

      if (this.imageIndex >= this.imageData.length) {
        /** User at last image show previous image */
        this.loadPreviousImage(true);
      } else {
        /** Otherwise show next image */
        this.loadNextImage(true);
      }
    });

  }
}
