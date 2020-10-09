import { PostsService } from './posts.service';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { Post } from './post';

describe('PostsService', () => {
  let service: PostsService;
  let httpTestingController: HttpTestingController;
  let mockRouter;
  let mockMessagesService;

  const d = new Date();
  const url = environment.api + '/posts';
  const posts: Post[] = [
    {
      date: d,
      date_formated: { relative: "há 1 min", locale: d.toLocaleDateString() },
      description: "Test timing",
      icon: "local_library",
      _id: "1a",
      labels: ["Reading", "Timing"],
      markdown: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      reading: { text: "3 min read", minutes: 3 },
      slug: "reading-time",
      title: "Reading time"
    },
    {
      date: d,
      date_formated: { relative: "há 1 min", locale: d.toLocaleDateString() },
      description: "Testing",
      icon: "test",
      _id: "1b",
      labels: ["Test", "Unit"],
      markdown: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      reading: { text: "3 min read", minutes: 3 },
      slug: "testing",
      title: "Testing time"
    }
  ];

  beforeAll(() => {
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockMessagesService = jasmine.createSpyObj(['openFromComponent']);
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        PostsService,
        { provide: Router, useValue: mockRouter },
        { provide: MatSnackBar, useValue: mockMessagesService }
      ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(PostsService);
  });

  it('should call api with queries', () => {
    const year = 2020, month = 9, left = 2, items = 5;
    const query = `?left=${left}&items=${items}&year=${year}&month=${month}`;

    service.getPosts(left, items, year, month).subscribe();

    const req = httpTestingController.expectOne(url + query);
    req.flush({ posts, max: 4 });
    httpTestingController.verify();
  });
});
