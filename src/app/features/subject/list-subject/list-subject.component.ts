import { Component, OnInit } from '@angular/core';
import { Subject } from '../subject.model';
import { SubjectserviceService } from '../subjectservice.service';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private route : ActivatedRoute,private subjservice : SubjectserviceService,private courseapiservice : CourseapiService ) { }

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


}
