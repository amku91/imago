import { Component, OnInit, Input } from '@angular/core';
import { GalleryComponent } from '../components/gallery/gallery.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
/**
 * @name NavbarComponent
 * @description Created to show common header into pages
 * @author Amit Kumar
 */
export class NavbarComponent implements OnInit {
  @Input() title: any;

  constructor(public gc: GalleryComponent) { }

  ngOnInit() {
    this.title = "Imago";
  }
  openStore()
  {

  }
  logout()
  {

  }
}
