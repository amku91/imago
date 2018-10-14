import { TestBed, inject } from '@angular/core/testing';

import { ImageService } from './image.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpModule } from '@angular/http';

describe('ImageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[MatSnackBarModule, HttpModule],
      providers: [ImageService]
    });
  });

  it('should be created', inject([ImageService], (service: ImageService) => {
    expect(service).toBeTruthy();
  }));
});
