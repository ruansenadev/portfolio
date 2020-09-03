import { Component } from '@angular/core';

@Component({
  selector: 'post-list-loader',
  template: `
  <content-loader [height]="70">
  	<svg:rect x="70" y="20" rx="4" ry="4" width="80" height="5" />
  	<svg:rect x="70" y="30" rx="3" ry="3" width="250" height="5" />
  	<svg:rect x="0" y="60" rx="3" ry="3" width="360" height="2" />
  	<svg:circle cx="16" cy="16" r="16" />
   </content-loader>

  `
})
export class PostListLoaderComponent { }
