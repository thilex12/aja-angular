import { TestBed } from '@angular/core/testing';

import { WhatTimeApi } from './what-time-api';
import { environment } from '../environments/environment.development';
import { Observable, tap } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EventDetailsModel } from '../models/event-details/event-details-module';
import { signal } from '@angular/core';
import { UserModel } from '../models/user/user-module';

const testEventDatas : any = {
  "content": [
    {
        "id": 1,
        "id_owner": 1,
        "name": "Event 1",
        "description": "Description for Event 1",
        "creationDate": null,
        "startDate": "2025-11-25T18:00:00",
        "endDate": "2025-11-25T20:00:00",
        "location": 1,
        "visibility": false,
        "tags": []
    },
    {
        "id": 2,
        "id_owner": 2,
        "name": "Event 2",
        "description": "Description for Event 2",
        "creationDate": null,
        "startDate": "2025-12-01T20:00:00",
        "endDate": "2025-12-01T22:00:00",
        "location": 1,
        "visibility": false,
        "tags": [
            1
        ]
    }
  ],
"pageable": {
    "pageNumber": 0,
    "pageSize": 20,
    "sort": {
        "empty": true,
        "sorted": false,
        "unsorted": true
    },
    "offset": 0,
    "paged": true,
    "unpaged": false
},
"totalPages": 1,
"totalElements": 17,
"last": true,
"size": 20,
"number": 0,
"sort": {
  "empty": true,
  "sorted": false,
  "unsorted": true
},
"numberOfElements": 17,
"first": true,
"empty": false
};

const testUserDatas : any = [
  {
      "id": 1,
      "name": "John",
      "surname": "John",
      "mail": "mail@gmail.com"
  },
  {
      "id": 2,
      "name": "Henri",
      "surname": "Poincaré",
      "mail": "henri.care@gmail.com"
  }
];

const testUserData : any = {
  "id": 1,
  "name": "John",
  "surname": "John",
  "mail": "mail@gmail.com",
  "followTags": [
    {
        "id": 2,
        "tagId": 1,
        "accountId": 1,
        "nameTag": "Beebo"
    }
  ],
  "inscriptions": [
    {
        "id": 1,
        "accountId": 1,
        "eventId": 1
    },
    {
        "id": 11,
        "accountId": 1,
        "eventId": 4
    }
  ],
  "role": "ROLE_ADMIN"
};

const testTagDatas = [
  {
      "id": 1,
      "name": "Beebo"
  },
  {
      "id": 2,
      "name": "Test2"
  }
];

function testGetEvents(service : WhatTimeApi, mock : HttpTestingController){
  const url : string = "/admin-events";
  service.getEvents().subscribe((r)=>{
    expect(service.events()).toEqual(testEventDatas.content);
  })
  
  const req = mock.expectOne(environment.url + url);
  req.flush(testEventDatas);
}

function testGetUsers(service : WhatTimeApi, mock : HttpTestingController){
  const url : string = "/admin-accounts";
  const signalTest = signal<UserModel[]>(testUserDatas);

  service.getUsers().subscribe((r)=>{
    expect(service.users()).toEqual(signalTest());
  })
  
  const req = mock.expectOne(environment.url + url);
  req.flush(testUserDatas);
}

function testGetUser(service : WhatTimeApi, mock : HttpTestingController){
  const url : string = "/admin-accounts/1";

  service.getUserById(1).subscribe((r)=>{
    expect(service.user()).toEqual(testUserData);
  });
  
  const req = mock.expectOne(environment.url + url);
  req.flush(testUserData);
}

function testLogin(service : WhatTimeApi, mock : HttpTestingController, username : string, password : string){
  const url : string = "/accounts/me";

  service.getInfo(username, password).subscribe((r)=>{
    expect(service.adminUser()).toEqual(testUserData);
    expect(service.adminUser()?.role).toEqual("ROLE_ADMIN");
  });
  
  const req = mock.expectOne(environment.url + url);
  req.flush(testUserData);
}

function testGetTags(service : WhatTimeApi, mock : HttpTestingController){
  const url : string = "/tags";

  service.getTags().subscribe((r)=>{
    expect(service.tags()).toEqual(testTagDatas);
    expect(localStorage.getItem("tags")).toEqual(JSON.stringify(testTagDatas));
  });
  
  const req = mock.expectOne(environment.url + url);
  req.flush(testTagDatas);
}

describe('WhatTimeApi', () => {
  let service: WhatTimeApi;
  let httpMock: HttpTestingController;
    
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [WhatTimeApi]
    });
    service = TestBed.inject(WhatTimeApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); 
  });
  
  localStorage.setItem("username", "toto");
  localStorage.setItem("password", btoa("1234"));

  it('should received events', ()=>{
    testGetEvents(service, httpMock);
  });
  it('should received users', ()=>{
    testGetUsers(service, httpMock);
  });
  it('should received user', ()=>{
    testGetUser(service, httpMock);
  });
  it('should login', ()=>{
    testLogin(service, httpMock, "toto", btoa("1234"));
  });
  it('should received tags', ()=>{
    testGetTags(service, httpMock);
  });
});
