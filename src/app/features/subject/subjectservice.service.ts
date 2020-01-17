import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from './subject.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectserviceService {
[y:string]:any;

subjects: any = [];
  constructor(private http : HttpClient) { }

  readonly rootURl = 'http://localhost:52341/api';

  GetSubjects(): Observable<Subject[]>{
    return this.http.get<Subject[]>(this.rootURl + '/subject')
  }
  GetSubjectByCid(courseId : string ):Observable<Subject>{
    return this.http.get<Subject>(this.rootURl + '/subject' + )
  }

}
