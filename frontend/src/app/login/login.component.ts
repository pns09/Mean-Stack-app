import { Component, OnInit } from '@angular/core';
// manually defined imports
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from './../auth/auth-service.service';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  allusers: any;
  oneuser: any;
  helper: any;

  constructor(private _fb: FormBuilder,
    private _http: HttpClient,
    private _authService: AuthServiceService,
    private _router: Router) {
    this.helper = new JwtHelperService();
  }

  ngOnInit() {

    this.loginForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  login() {
    this._authService.login(this.loginForm.value).subscribe((data) => {
      this._authService.user.next(this.helper.decodeToken(data['token']));
      this._authService.$auth.next('token');
      this._authService.setToken(data['token']);
      this._router.navigate(['/createpost']);
    });


  }

}

