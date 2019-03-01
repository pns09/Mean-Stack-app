import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService, User } from './../auth/auth-service.service';



@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  titleForm: FormGroup;
  user: User;

  constructor(private _fb: FormBuilder,
    private _http: HttpClient,
    private _router: Router,
    private _authService: AuthServiceService) { }

  ngOnInit() {
    this.titleForm = this._fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(5)]]
    });
    this._authService.user.subscribe(data => this.user = data);
  }
  post() {
    this._http.post('http://localhost:3000/post/createpost', { ...this.titleForm.value, ...this.user }).subscribe(() => {
      alert('successfully posted!');
      this._router.navigate(['/postdetails']);
    }, () => {
      console.log('error occured while posting!');
    }
    );

  }
}
