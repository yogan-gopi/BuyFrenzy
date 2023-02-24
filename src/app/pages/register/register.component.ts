import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerUserData:any = {}
  constructor( private _auth: AuthService,
               private _router: Router ) { }

  ngOnInit(): void {
  }

  registerUser() {
    this._auth.registerUser(this.registerUserData).subscribe( 
      {
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
      }
    )
  }

}
