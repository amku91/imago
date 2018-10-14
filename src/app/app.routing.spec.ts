import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { UploadComponent } from './components/upload/upload.component';
import { PreviewComponent } from './components/preview/preview.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
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
import {routes} from './app.routing';
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import { HttpModule } from '@angular/http';

TestBed.configureTestingModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
});
describe('Router: App', () => {
  let location: Location;
  let router: Router;
  let fixture;
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
    }).compileComponents();
    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
  }));
  it('navigate to "" redirects you to /gallery', fakeAsync(() => { 
    router.navigate(['']); 
    tick(); 
    expect(location.path()).toBe('/gallery'); 
  }));
  it('navigate to any url redirects you to /gallery', fakeAsync(() => { 
    router.navigate(['/wrongpath']); 
    tick(); 
    expect(location.path()).toBe('/gallery'); 
  }));
});
