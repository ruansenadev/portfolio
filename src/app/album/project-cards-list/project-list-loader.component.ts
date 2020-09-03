import { Component } from '@angular/core';

@Component({
  selector: 'project-list-loader',
  template: `
  <content-loader [width]="200" [height]="230">
  	<svg:rect x="20" y="0" rx="14" ry="14" width="80" height="28" />
  	<svg:rect x="20" y="60" rx="3" ry="3" width="150" height="4" />
  	<svg:rect x="20" y="80" rx="3" ry="3" width="120" height="4" />
  	<svg:rect x="20" y="100" rx="3" ry="3" width="140" height="4" />
  	<svg:rect x="20" y="120" rx="3" ry="3" width="160" height="4" />
  	<svg:rect x="20" y="140" rx="3" ry="3" width="130" height="4" />
    <svg:rect x="40" y="170" rx="6" ry="6" width="120" height="10" />
    <svg:rect x="110" y="190" rx="12" ry="12" width="80" height="24" />
  </content-loader>
  `
})
export class ProjectListLoaderComponent { }
