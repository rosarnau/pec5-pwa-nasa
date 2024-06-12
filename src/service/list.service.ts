import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { environment } from './../app/enviroments/environment';
import { Image } from '../app/models/image.interface';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private apiKey: string = environment.nasaApiKey;
  private apiUrl: string = 'https://api.nasa.gov/planetary/apod';

  constructor(private http: HttpClient) { }

  getImageOfTheDay(date: string): Observable<Image> {
    const url = `${this.apiUrl}?api_key=${this.apiKey}&date=${date}`;
    return this.http.get<Image>(url);
  }

  getImagesForMonth(year: number, month: number): Observable<Image[]> {
    const requests = [];
    const daysInMonth = new Date(year, month, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      requests.push(this.getImageOfTheDay(date));
    }
    return forkJoin(requests);
  }
}

