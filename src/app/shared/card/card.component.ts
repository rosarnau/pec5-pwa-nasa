import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() images: any[] = [];
  @Input() isLoading: boolean = true; 
  private apiKey: string = 'ng add angular-cli-ghpages'; 

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchImages();
  }

  fetchImages(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.http.get<any[]>(`https://api.nasa.gov/planetary/apod?api_key=${this.apiKey}&count=10`).subscribe(data => {
        this.images = data;
        this.isLoading = false;
      }, error => {
        console.error('Error fetching images:', error);
        this.isLoading = false;
      });
    }, 2000); 
  }

  goToDetail(image: any): void {
    this.router.navigate(['/detail', image.date]);
  }
}
