import { Subject } from "../subject/subject.model";
export class Course{
        courseDetailId: number;
        name : string;
        duration : string;
        fees : string;
        description : string;
       subjects : Array<Subject>;         
}