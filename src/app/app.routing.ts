import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { GalleryComponent } from './components/gallery/gallery.component';



export const routes: Routes =[
    { path: 'gallery', component: GalleryComponent },
    { path: '',redirectTo: 'gallery', pathMatch: 'full'},
    { path: "**",redirectTo:"gallery"}
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }