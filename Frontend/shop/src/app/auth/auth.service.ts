
import { Injectable } from '@angular/core';
import decode from 'jwt-decode';
@Injectable()
export class AuthService {

  public getToken(): string {
    return localStorage.getItem('id_token');
  }
  public isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? true : false;
  }
  
}
