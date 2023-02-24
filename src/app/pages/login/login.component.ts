import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginUserData:any = {}
  constructor( private _auth: AuthService, 
               private _router: Router ) { }

  ngOnInit(): void {
  }

  loginUser() {
    this._auth.loginUser(this.loginUserData).subscribe({
      next: (response) => {
        console.log(response)
        localStorage.setItem('token', response.token)
        this._router.navigate(['/home'])
      },
      error: (error: any) => {
        console.log(error)
      }
      /* res => console.log(res),
        err => console.log(err) */
    })
  }

}
