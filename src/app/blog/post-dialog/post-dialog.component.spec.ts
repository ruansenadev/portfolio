import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PostDialogComponent } from './post-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Post } from '../post';
import { MatButtonModule } from '@angular/material/button';

describe('PostDialogComponent', () => {
  let component: PostDialogComponent;
  let fixture: ComponentFixture<PostDialogComponent>;
  const d = new Date();

  const post: Post = {
    date: d,
    date_formated: { relative: 'há 1 min', locale: d.toLocaleDateString() },
    description: 'Testing',
    icon: 'test',
    _id: '1b',
    labels: ['Test', 'Unit'],
    markdown: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    reading: { text: '3 min read', minutes: 3 },
    slug: 'testing',
    title: 'Testing time'
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatButtonModule
      ],
      declarations: [PostDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: PostDialogComponent },
        { provide: MAT_DIALOG_DATA, useValue: post }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render post data', () => {
    expect(component.post).toEqual(post);
    expect(fixture.nativeElement.querySelector('h3').textContent).toBe(post.title);
  });
});
