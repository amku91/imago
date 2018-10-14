import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule, Router } from '@angular/router';
import { GalleryComponent } from './components/gallery/gallery.component';



const routes: Routes =[
    { path: '', component: GalleryComponent },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule { }