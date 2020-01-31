import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from './subject.model';
import { tap, map, catchError } from 'rxjs/operators';
import { Course } from '../course/course.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectserviceService {
[y:string]:any;
   coures: any = [];
  subject : Subject[]
  
  constructor(private http : HttpClient) { }

  readonly rootURl = 'http://localhost:52341/api';
  
  GetCourses(): Observable<Course[]> {
    return  this.http.get<Course[]>(this.rootURl + '/Course');
  }
  
  GetSubjects(): Observable<Subject[]>{
    return this.http.get<Subject[]>(this.rootURl + '/subject')
  }
  GetSubjectByCid(courseId : string ):Observable<Subject[]>{
    return this.http.get<Subject[]>(this.rootURl + '/subject/' + courseId + '/subbyid')
  }
  createSubject(subject: Subject): Observable<Subject> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    subject.subjectId = 0;
    return this.http.post<Subject>(this.rootURl + '/subject', subject, { headers })
      .pipe(
        tap(data => console.log('createSubject: ' + JSON.stringify(data))),
        map(() => subject),
        catchError(this.handleError)
      );
  }
  subjectbyid(subjectId : number):Observable<Subject>{
    return this.http.get<Subject>(this.rootURl + '/subject/' + subjectId)
  }
  updateSubject(subjectId:number, subject : Subject):Observable<Subject>{
    return this.http.put<Subject>(this.rootURl + '/Subject/' + subjectId ,subject).pipe(
      tap(() => console.log('updateCourse : '+subject.subjectId)),
      map(() =>subject),
      catchError(this.handleError)
    );
  }
}
