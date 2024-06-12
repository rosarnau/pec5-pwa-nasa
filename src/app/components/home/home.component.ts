import { Component, OnInit } from '@angular/core';
import { ListService } from '../../../service/list.service';
import { Image } from '../../models/image.interface'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  images: any[] = [];
  isLoading: boolean = true;
  isGridView: boolean = false;

  constructor(private listService: ListService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.getImagesForJanuary();
    }, 2000); 
  }

  getImagesForJanuary(): void {
    this.listService.getImagesForMonth(2024, 1).subscribe(data => {
      console.log('Received images:', data); 
      this.images = data;
      this.isLoading=false;
    }, error => {
      console.error('Error fetching images:', error); 
      this.isLoading = false;
    });
  }

  showGridView(): void {
    this.isGridView = true;
  }

  showListView(): void {
    this.isGridView = false;
  }
}
