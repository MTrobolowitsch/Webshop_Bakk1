import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private httpClient: HttpClient;
  private router: Router;
  username: string;
  password: string;
  constructor(private http: HttpClient, private routerr: Router) {
    this.httpClient = http;
    this.router = routerr;
  }

  ngOnInit() {
  }
  login() {
    this.httpClient.post('http://localhost:8080/api/login', { name: this.username, password: this.password })
      .subscribe(
        data => {
          localStorage.setItem('id_token', (data as any).token);
          this.router.navigate(["store"])
        }
        ,
        err => {
          console.log("not");
        }
      );
  }



}
