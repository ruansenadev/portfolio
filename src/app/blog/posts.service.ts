import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { Post } from "./post";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private http: HttpClient, private router: Router) { }
  private posts: Post[] = []
  private stream = new Subject<Post[]>()

  populatePosts(): void {
    this.http.get<{posts: Post[]}>('http://localhost:3000/api/posts').subscribe((res) => {
      this.posts = res.posts
      this.stream.next([...this.posts])
    })
  }
  getStream() {
    return this.stream.asObservable()
  }
  addPost(title: string, content: string, description: string | null): void {
    const post: Post = {title, date: new Date(), content, description}
    this.http.post<{message: string}>('http://localhost:3000/api/posts', post).subscribe((res) => {
      console.log(res.message)
      this.posts.push(post)
      this.stream.next([...this.posts])
      this.router.navigate(['/'])
    })
  }
}
