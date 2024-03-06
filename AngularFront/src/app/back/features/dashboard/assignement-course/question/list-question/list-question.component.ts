import { Component, Input, OnInit } from '@angular/core';
import { Exams } from 'src/app/back/features/model/exams';
import { Question } from 'src/app/back/features/model/question';
import { QuestionService } from 'src/app/back/features/services/question.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-question',
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.css']
})
export class ListQuestionComponent implements OnInit {
@Input() exams!:Exams;
public editVisibility:any=false;
public questions!:Question[]
public selectedQuestion!:Question;
public addVisibility:any=false;
constructor(private questionService$:QuestionService) { }


ngOnChanges() {

}

ngOnInit() {
  console.log('%clist-course-content.component.ts line:27 this.exams.id', 'color: #007acc;', this.exams.id);
  this.getAllQuestions();
}

/**
 * get all courses
 * @returns all courses
 */
public getAllQuestions()
{
  this.questionService$.getbyExamId(this.exams.id).subscribe((res:Question[])=>{
    this.questions = res;
    console.log('%clist-questions.component.ts line:30 this.questions', 'color: #007acc;', this.questions);
  })
}

getItemSelected(item:any){
  console.log('%clist-course.component.ts line:35 item', 'color: #007acc;', item);
  this.selectedQuestion=item;
}

deleteItem(item:any)
{
  this.questionService$.delete(item.id).subscribe(
    (resp) => {
      this.getAllQuestions();
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        title: 'Success!',
        text: 'updated',
        icon: 'success',
        background: '#d4edda'
      });

    },
    (err) => {
      this.getAllQuestions();
      console.log(err);
      //this.toastr.success('Error');
    }
       );

this.getAllQuestions();
}

onQuestionAdded(event: any) {
  this.getAllQuestions()
 }

}
