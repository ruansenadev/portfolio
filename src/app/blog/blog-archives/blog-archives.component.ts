import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from '../posts.service';

export interface Archives {
  year: number;
  months: [
    { num: number, month: string, count: number }
  ];
}
@Component({
  selector: 'app-blog-archives',
  templateUrl: './blog-archives.component.html',
  styleUrls: ['./blog-archives.component.css']
})
export class BlogArchivesComponent implements OnInit {
  archivesList: Archives[];
  year: number;
  d: Date;
  constructor(private postsService: PostsService, private router: Router) {
    this.d = new Date();
    this.year = this.d.getFullYear();
  }
  ngOnInit(): void {
    this.postsService.getArchives().subscribe(res => this.archivesList = res);
  }
  isSelectedYear(year: number): boolean {
    return this.year ? this.year === year : this.isActualYear(year);
  }
  isActualYear(year: number): boolean {
    return this.d.getFullYear() === year;
  }
  onExpandYear(year: number): void {
    if (this.isSelectedYear(year)) {
      return;
    }
    if (this.year && this.isActualYear(year)) {
      this.router.navigate([]);
    } else {
      this.router.navigate([], { queryParams: { year } });
    }
    this.year = year;
  }
}
