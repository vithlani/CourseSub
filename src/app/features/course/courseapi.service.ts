import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ObservableLike  } from "rxjs";
import { catchError, tap, map } from 'rxjs/operators';
import { Course } from "./course.model";
import { Subject } from '../subject/subject.model';
@Injectable({
  providedIn: 'root'
})
export class CourseapiService {
  [x: string]: any;

  coures: any = [];
  subject : Subject[]
  constructor(private http: HttpClient) { }

  readonly rootURL = 'http://localhost:52341/api';

  GetCourses(): Observable<Course[]> {
    return  this.http.get<Course[]>(this.rootURL + '/Course').pipe( 
      tap(data =>{  console.log('listCourses ' + JSON.stringify(data))} ),
    map((coures) => coures), catchError(this.handleError));
  }
  
  GetCoursesbyId(courseId : string): Observable<Course> {
    return  this.http.get<Course>(this.rootURL + '/Course/' + courseId).pipe( catchError(this.handleError));
  }

  createCourse(course: Course): Observable<Course> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    course.courseDetailId = 0;
    return this.http.post<Course>(this.rootURL + '/Course', course, { headers })
      .pipe(
        tap(data => console.log('createCourse: ' + JSON.stringify(data))),
        map(() =>course),
        catchError(this.handleError)
      );
  }

  UpdateCourse(courseId : number, course:Course):Observable<Course>{
    //const headers = new HttpHeaders({'Content-Type' : 'applciation/json'})
    return  this.http.put<Course>(this.rootURL + '/Course/' + courseId, course).pipe(
      tap(() => console.log('updateCourse : '+course.courseDetailId)),
      map(() =>course),
      catchError(this.handleError)
    );
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
  deleteSubject(subjectId: number):Observable<Course>{
    return this.http.delete<Course>(this.rootURL + '/Subject/' + subjectId);
  }
  deleteCourse(courseId : number):Observable<Course>{
    return this.http.delete<Course>(this.rootURL + '/Course/' + courseId);
  }
  deleteSubjects(ids:Array<number>,result:String):Observable<Course>{
    return this.http.delete<Course>(this.rootURL +'/Subject?'+result);
  }

  searchcourse(serachstring : String):Observable<any>{
    debugger;
    return this.http.get<any>(this.rootURL + '/Course' + '/search/' + serachstring)
  }
}