import { Component, OnInit, Input, ElementRef } from '@angular/core';
// manually defined
import { AuthServiceService } from './../../auth/auth-service.service';
import { BlogService } from '../../auth/blog.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {


  blogPosts: any = [];
  liked: string;
  showComment: string;
  helper: any;

  constructor(private _blogService: BlogService,
    private _authService: AuthServiceService) {
    this.helper = new JwtHelperService();
  }

  ngOnInit() {
    this.getblogs();
  }

  getblogs() {
    this._blogService.getallblogs().subscribe((data: any) => {
      this.blogPosts = data.blogs;
    });
  }

  deletePost(_id: string) {
    this._blogService.deletepost(_id).subscribe((data: any) => {
      data = this.getblogs();

    });
  }
  likePost(_id: string) {
    this._blogService
      .likePost(_id)
      .pipe(
        switchMap(doc => this._blogService.getallblogs()),
        map(blogs => blogs['blogs'])
      ).subscribe((blogs) => {
        this.blogPosts = blogs;
      });
  }
  addComment(_id: string, commentvalue: HTMLInputElement) {
    // console.log( commentvalue.value);
    this._blogService.addComment(_id, commentvalue.value).pipe(
      switchMap(doc => this._blogService.getallblogs()),
      map(blogs => blogs['blogs'])
    ).subscribe((blogs) => {
      this.blogPosts = blogs;
    });

  }
}
