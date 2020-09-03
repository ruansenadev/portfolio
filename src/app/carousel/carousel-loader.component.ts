import { Component } from '@angular/core';

@Component({
  selector: 'carousel-loader',
  template: `
  <content-loader [width]="200" [height]="160">
  	<svg:rect x="70" y="20" rx="4" ry="4" width="110" height="8.5" />
  	<svg:rect x="20" y="60" rx="3" ry="3" width="160" height="4" />
  	<svg:rect x="20" y="80" rx="3" ry="3" width="160" height="4" />
  	<svg:rect x="20" y="100" rx="3" ry="3" width="160" height="4" />
  	<svg:rect x="20" y="120" rx="3" ry="3" width="160" height="4" />
  	<svg:rect x="20" y="140" rx="3" ry="3" width="160" height="4" />
  	<svg:circle cx="16" cy="16" r="16" />
   </content-loader>
  `
})
export class CarouselLoaderComponent { }
