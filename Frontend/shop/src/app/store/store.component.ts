import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  movies: any[];
  httpClient: HttpClient;
  constructor(private http: HttpClient, private router: Router) { this.httpClient = http;}

  ngOnInit() {
    this.httpClient.get('http://localhost:8080/api/movies', {  })
    .subscribe(
      (data: any) => {
        console.log(data.movies);
        
        this.movies = data.movies;
      }
      ,
      err => {
        console.log("not");
      }
    );
  }

  selectMovie(movie: any){
    console.log(movie);
  }

}
