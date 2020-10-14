import { AdminService } from './admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { TestBed } from '@angular/core/testing';

describe('AdminService', () => {
  let service: AdminService;
  let httpTestingController: HttpTestingController;
  let mockMessageService;
  const url = environment.api + '/admin';
  const admin = {
    name: 'Nyan',
    email: 'foo@bar.baz',
    last_name: 'Cat',
    birthdate: new Date(2011, 3, 2),
    address: { city: null, state: null },
    photo: 'https://placekitten.com/150/150',
    profession: 'Tester',
    biodata: 'Nyanyanyanyanyanyanya!',
    logo: null,
    nickname: 'nyan',
    skills: { fly: true, noise: 'high', rainbow: true },
    social: null,
    fullName: 'Nyan Cat',
    location: null,
    age: 9
  };

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['openFromComponent']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AdminService,
        { provide: MatSnackBar, useValue: mockMessageService }
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AdminService);
  });

  it('should call api', () => {
    service.fetchAdmin();

    httpTestingController.expectOne(url).flush(admin);
    httpTestingController.verify();
  });
});
