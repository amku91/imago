import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../../app.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { GalleryComponent } from '../../components/gallery/gallery.component';
import { UploadComponent } from '../../components/upload/upload.component';
import { PreviewComponent } from '../../components/preview/preview.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../../app.routing';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule, MatNativeDateModule } from '@angular/material';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpModule } from '@angular/http';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

describe('UploadComponent', () => {
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        GalleryComponent,
        UploadComponent,
        PreviewComponent,
        NavbarComponent
      ],
      imports: [
        BrowserAnimationsModule,
        BrowserModule,
        RouterModule,
        AppRoutingModule,
        MatDialogModule,
        MatTableModule,
        MatCardModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        MatTabsModule,
        MatMenuModule,
        MatSidenavModule,
        MatSliderModule,
        MatButtonModule,
        MatSnackBarModule,
        MatChipsModule,
        MatDatepickerModule,
        MatRadioModule,
        MatStepperModule,
        MatProgressBarModule,
        MatNativeDateModule,
        MatAutocompleteModule,
        MatToolbarModule,
        MatTooltipModule,
        HttpModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {id: "imago/158466-800x600", type: "cloud", imageData:[{
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
      }]}},
      { provide: MatDialogModule, useValue: {id: "imago/158466-800x600", type: "cloud", imageData:[{
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
    }]}}
  ],
 })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
