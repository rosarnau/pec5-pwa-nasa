import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListService } from './../../../service/list.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  image: any;
  showAllDetails = false;
  isLoading = true; 
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listService: ListService
  ) { }

  ngOnInit(): void {
    const date = this.route.snapshot.paramMap.get('date');
    console.log('date --> ', date);

    if (date) {
      setTimeout(() => {
        this.listService.getImageOfTheDay(date).subscribe((image) => {
          this.isLoading = false; 

          if (!image) {
            this.router.navigateByUrl('/');
            return;
          }
          this.image = image;
          console.log('Image --> ', this.image);
        }, error => {
          this.isLoading = false; 
          console.error('Error fetching image:', error);
          this.router.navigateByUrl('/');
        });
      }, 2000); 
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  toggleDetails(): void {
    this.showAllDetails = !this.showAllDetails;
  }
}
