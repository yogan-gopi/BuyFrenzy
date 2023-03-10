import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "https://e-commerce-yogan-gopi.onrender.com/api/register"
  private _loginUrl = "https://e-commerce-yogan-gopi.onrender.com/api/login"

  constructor(private http: HttpClient,
              private _router: Router) { }

  registerUser(user: any) {
    return this.http.post<any>(this._registerUrl, user)
  }
  loginUser(user: any) {
    return this.http.post<any>(this._loginUrl, user)
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }

  logoutUser(){
    localStorage.removeItem('token')
    this._router.navigate(['/login'])
  }


  getToken() {
    return localStorage.getItem('token')
  }
}
