import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Post } from './post';
import { Observable } from 'rxjs';
import { PostsService } from './posts.service';

@Injectable()
export class PostResolver implements Resolve<Post> {
  constructor(private postsService: PostsService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Post> {
    const slug = route.paramMap.get('slug');
    return this.postsService.getPost(slug);
  }
}
