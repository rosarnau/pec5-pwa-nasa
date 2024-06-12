import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnChanges {
  @Input() images: any[] = [];
  @Input() isLoading: boolean = false;
  displayedColumns: string[] = ['date', 'title'];
  dataSource: MatTableDataSource<any>;

  constructor(private router: Router) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.images) {
      this.dataSource = new MatTableDataSource(this.images);
    }
  }

  goToDetail(image: any): void {
    this.router.navigate(['/detail', image.date]);
  }
}

