import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  private httpClient: HttpClient;
  username: string;
  password: string;
  constructor(private http: HttpClient, private router: Router) {
    this.httpClient = http;
  }

  ngOnInit() {
  }
  signup() {
    this.httpClient.post('http://localhost:8080/api/signup', { name: this.username, password: this.password })
      .subscribe(
        data => {
          console.log("cool");
        }
        ,
        err => {
          console.log(this.username + this.password);
          
          console.log(err);
          console.log("not");
        }
      );
  }

}
