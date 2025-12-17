import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiCallService } from './api-call-service';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';

function testIfRightMethod(observ : (url: string) => Observable<any>, mock : HttpTestingController, method : string) {
  const mockResponse = { data: 'ok' };
  const url : string = "/test";

  observ(url).subscribe((res: any) => {
    expect(res).toEqual(mockResponse);
  });

  const req = mock.expectOne(environment.url + url);
  expect(req.request.method).toBe(method);

  req.flush(mockResponse);
}

function testContentType(observ : (url: string) => Observable<any>, mock : HttpTestingController){
  const mockResponse = { data: 'ok' };
  const url : string = "/test";

  observ(url).subscribe((res: any) => {
    expect(res).toEqual(mockResponse);
  });
  const req = mock.expectOne(environment.url + url);

  expect(req.request.headers.has('Content-Type')).toBeTruthy();
  expect(req.request.headers.get('Content-Type')).equal("application/json");
  req.flush({});
}

function testIfBasicAuthOk(observ : (url: string) => Observable<any>, mock : HttpTestingController, auth : string | null = null){
  const mockResponse = { data: 'ok' };
  const url : string = "/test";

  observ(url).subscribe((res: any) => {
    expect(res).toEqual(mockResponse);
  });
  const req = mock.expectOne(environment.url + url);
  
  if (auth != null){
    expect(req.request.headers.has('Authorization')).toBeTruthy();
    expect(req.request.headers.get('Authorization')).toContain('Basic');
    expect(req.request.headers.get('Authorization')).equal(auth);
  }
  else {
    expect(req.request.headers.has('Authorization')).toBeFalsy();
  }
  req.flush({});
}

describe('ApiCallService', () => {
  let service: ApiCallService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [ApiCallService]
    });
    service = TestBed.inject(ApiCallService);
    httpMock = TestBed.inject(HttpTestingController);
  });
 
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // - - - Association Method API <-> Method HttpRequest (object) - - -

  it('should call GET with correct URL', () => {
    testIfRightMethod((url) => service.get<any>(url), httpMock, 'GET');
  });

  it('should call POST with correct URL', () => {
    testIfRightMethod((url) => service.post<any>(url), httpMock, 'POST');
  });
  
  it('should call PUT with correct URL', () => {
    testIfRightMethod((url) => service.put<any>(url), httpMock, 'PUT');
  });

  it('should call DELETE with correct URL', () => {
    testIfRightMethod((url) => service.delete<any>(url), httpMock, 'DELETE');
  });

  // - - - Header - - -
  it('should send Content-Type application/json', () => {
    testContentType((url) => service.get<any>(url), httpMock);
  });

  it('shouldnt send basic auth', ()=>{
    testIfBasicAuthOk((url) => service.get<any>(url), httpMock);
  });
  it('should send basic auth', ()=>{
    testIfBasicAuthOk((url) => service.get<any>(url, "toto", btoa("1234")), httpMock, "Basic " + btoa(`toto:1234`));
  });

});
