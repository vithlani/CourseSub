import { Component, OnInit } from '@angular/core';
import { Subject } from '../subject.model';
import { SubjectserviceService } from '../subjectservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseapiService } from '../../course/courseapi.service';
import { Course } from '../../course/course.model';

@Component({
  selector: 'app-list-subject',
  templateUrl: './list-subject.component.html',
  styleUrls: ['./list-subject.component.css']
})
export class ListSubjectComponent implements OnInit {
  courseId : number;
  courselist:Course[];
  subjectlist : Subject[];
  SelectedIDs: any[] = [];
  result: string = '';
  errorMessage: any;
  constructor(private route : ActivatedRoute,private subjservice : SubjectserviceService,private courseapiservice : CourseapiService,private router: Router ) { }

  ngOnInit() {
    let cid = +this.route.snapshot.paramMap.get('id')
    this.GetSubjectByCid(cid)

  }
  GetCourses(): void{
    this.courseapiservice.GetCourses().subscribe(mi => {
      this.courselist = mi;
      console.log(this.courselist); 
    
    });
  }
  GetSubjectByCid(cid) : void{
    this.subjservice.GetSubjectByCid(cid).subscribe(sb=>{
      this.subjectlist = sb;
      console.log(this.subjectlist);
    })
  }
  selectID(id, event:any):void{
    this.SelectedIDs.push(id);
  }
  deleteSelected(){
    var i =1
    console.log(this.SelectedIDs.length);
    this.SelectedIDs.forEach(element => {
    if(this.SelectedIDs.length == i)
    {
      this.result += 'subids' + '=' +element;
    }
    else{
      this.result += 'subids' +'=' + element + '&';
    }
    i++;
    console.log(this.result);
    });
    this.courseapiservice.deleteSubjects(this.SelectedIDs,this.result).subscribe({
      next: () => this.onSaveComplete(),
      error: err => this.errorMessage = err
    });
  }
  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.router.navigate(['/course/list']);
  }
}
