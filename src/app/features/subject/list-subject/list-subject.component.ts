import { Component, OnInit } from '@angular/core';
import { Subject } from '../subject.model';
import { SubjectserviceService } from '../subjectservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-subject',
  templateUrl: './list-subject.component.html',
  styleUrls: ['./list-subject.component.css']
})
export class ListSubjectComponent implements OnInit {
  courseId : number;
  subjectlist : Subject[];
  constructor(private route : ActivatedRoute,private subjservice : SubjectserviceService ) { }

  ngOnInit() {
    let cid = +this.route.snapshot.paramMap.get('courseId')
    this.GetSubjectByCid(cid)

  }
  GetSubjectByCid(cid) : void{
    this.subjservice.GetSubjectByCid(cid).subscribe(sb=>{
      this.subjectlist = sb;
      console.log(this.subjectlist);
    })
  }

}
