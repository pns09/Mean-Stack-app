import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {
  userForm: FormGroup;
  constructor(private _fb: FormBuilder, private _http: HttpClient, private _router: Router) { }

  ngOnInit() {
    this.userForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  submit() {
    this._http.post('http://localhost:3000/api/new_register', this.userForm.value).subscribe(function () {
      console.log('Successfully Registered!!');
    }, function errorCallback() {
      console.log('Failed at client side!!');
    });
    this._router.navigate(['/login']);

  }
}
