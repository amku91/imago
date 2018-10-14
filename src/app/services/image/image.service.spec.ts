import { TestBed, inject, async } from '@angular/core/testing';

import { ImageService } from './image.service';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('ImageService', () => {
  let service: ImageService;
  let backend: MockBackend;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, MatSnackBarModule],
      providers: [
        ImageService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  it('should be created', inject([ImageService], (service: ImageService) => {
    expect(service).toBeTruthy();
  }));

  describe('getPreImages()', () => {

    it('should return an Observable<Array<Images>>',
        inject([ImageService, XHRBackend], (imageService, mockBackend) => {

        const mockResponse = {
          "resources": [
              {
                  "public_id": "imago/158466-800x600",
                  "format": "jpg",
                  "version": 1539411112,
                  "resource_type": "image",
                  "type": "cloud",
                  "created_at": "2018-10-13T06:11:52Z",
                  "bytes": 347965,
                  "width": 800,
                  "height": 600,
                  "url": "http://res.cloudinary.com/remphi-internet-pvt-ltd/image/upload/v1539411112/imago/158466-800x600.jpg",
                  "secure_url": "https://res.cloudinary.com/remphi-internet-pvt-ltd/image/upload/v1539411112/imago/158466-800x600.jpg"
              }
            ]
          };

        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        imageService.getPreImages().subscribe((data) => {
          expect(data.resources.length).toBe(1);
          expect(data.resources[0].public_id).toEqual("imago/158466-800x600");
          expect(data.resources[0].type).toEqual("cloud");
        });

    }));
  });
  describe('localStorageHandler()', () => {

    it('should save an image into local storage and return an Observable<Array<Images>> and should be equal or more then  1',
        inject([ImageService, XHRBackend], (imageService, mockBackend) => {
        imageService.localStorageHandler({type:"local", size:"123423"}, []).subscribe((data) => {
          expect(data.length).toBeGreaterThanOrEqual(1);
        });

    }));
  });
  describe('getLocalImages()', () => {

    it('should return an Observable<Array<Images>> of local images and should be equal or more then 1',
        inject([ImageService, XHRBackend], (imageService, mockBackend) => {
        imageService.getLocalImages().subscribe((data) => {
          expect(data.length).toBeGreaterThanOrEqual(1);
        });

    }));
  });
  describe('deleteFromLocalStorage()', () => {

    it('should delte an image into local storage and return empty response',
        inject([ImageService, XHRBackend], (imageService, mockBackend) => {
        imageService.deleteFromLocalStorage("cloud", "imago/158466-800x600").subscribe((data) => {
          expect(data.length).toEqual('');
        });

    }));
  });
  describe('getDeletedImages()', () => {

    it('should return an Observable<Array<Images>> of deleted local image',
        inject([ImageService, XHRBackend], (imageService, mockBackend) => {
        imageService.getDeletedImages().subscribe((data) => {
          expect(data.length).toBeGreaterThanOrEqual(0);
        });

    }));
  });
  
});
