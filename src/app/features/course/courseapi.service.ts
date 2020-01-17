import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable  } from "rxjs";
import { catchError, tap, map } from 'rxjs/operators';
import { Course } from "./course.model";
@Injectable({
  providedIn: 'root'
})
export class CourseapiService {
  [x: string]: any;

  coures: any = [];
  constructor(private http: HttpClient) { }

  readonly rootURL = 'http://localhost:52341/api';

  GetCourses(): Observable<Course[]> {
    return  this.http.get<Course[]>(this.rootURL + '/Course');
  }
  
  GetCoursesbyId(courseId : string): Observable<Course> {
    return  this.http.get<Course>(this.rootURL + '/Course/' + courseId);
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
      map(() =>course)
    );
  }

  }

