import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { Post } from "./post";
import { environment } from "../../environments/environment";
const apiPosts = environment.host + '/api/posts'

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private http: HttpClient, private router: Router) { }
  private posts: Post[] = []
  private stream = new Subject<{posts: Post[], max: number}>()

  populatePosts(left: number, items: number): void {
    const query = `?left=${left}&items=${items}`
    this.http.get<{ posts: Post[], max: number }>(apiPosts+query).subscribe((res) => {
      this.posts = res.posts
      this.stream.next({posts: [...this.posts], max: res.max})
    })
  }
  getStream() {
    return this.stream.asObservable()
  }
  addPost(title: string, markdown: string, description: string | null): void {
    const post = { title, date: new Date(), markdown, description }
    this.http.post<{ message: string, post: Post, max: number}>(apiPosts, post).subscribe((res) => {
      console.log(res.message)
      this.posts.push(res.post)
      this.stream.next({posts: [...this.posts], max: res.max})
      this.router.navigate(['/'])
    })
  }
  getPost(id: string) {
    return this.http.get<{post: Post}>(`${apiPosts}/${id}`)
  }
  editPost(_id: string, title: string, date: Date, markdown: string, description: string | null): void {
    const post: Post = { _id, title, date, markdown, description, modified: new Date() }
    this.http.put<{ message: string }>(`${apiPosts}/${_id}`, post).subscribe((res) => {
      console.log(res.message)
      this.router.navigate(['/'])
    })
  }
  delPost(id: string) {
    return this.http.delete<{ message: string }>(`${apiPosts}/${id}`)
  }
}
