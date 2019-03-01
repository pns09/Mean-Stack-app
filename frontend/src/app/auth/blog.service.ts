import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class BlogService {



  constructor(private _http: HttpClient) { }


  getallblogs() {
    return this._http.get('http://localhost:3000/post/getallblogs');
  }

  deletepost(_id: string) {

    return this._http.delete('http://localhost:3000/post/deletepost' + `/${_id}`);
  }

  likePost(_id: string) {
    return this._http.put('http://localhost:3000/post/likeBlog' + `/${_id}`, {});
  }

  addComment(_id: string, comment: string) {
    return this._http.post('http://localhost:3000/post/Comment' + `/${_id}`, { comment: comment });
  }
}

