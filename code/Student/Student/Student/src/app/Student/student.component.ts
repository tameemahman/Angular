import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentService } from '../Service/student.service';
import { StudentModel } from './Student.model';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit {

  studentmodel: StudentModel = new StudentModel();
  formValue!: FormGroup<any>;

  studentData: any;

  constructor(private api: StudentService, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      roll: [''],
      name: [''],
      department: [''],
      marks: ['']
    });
    this.getAll();
  }

  savestudent() {

    this.studentmodel.roll = this.formValue.value.roll;
    this.studentmodel.name = this.formValue.value.name;
    this.studentmodel.department = this.formValue.value.department;
    this.studentmodel.marks = this.formValue.value.marks;
    this.api.studentPost(this.studentmodel)
      .subscribe(res => {
        console.log(res);
        alert("Student Added")
        this.formValue.reset();
        this.getAll();
      },

        err => {
          alert("Student Not Saved")
        })
}

getAll(){
  this.api.getAllStudent()
  .subscribe(res=>{
    this.studentData=res;
  })
}

deleteStudent(row:any){
  this.api.deleteStudent(row.roll)
  .subscribe(res=>{
    console.log(res);
    alert("Student Deleted")
    this.formValue.reset();
    this.getAll();
  },
  err=>{

    alert("Student Not Saved")
  })
}

onEdit(row:any){
this.studentmodel.roll=row.roll;
this.formValue.controls['Roll'].setValue(row.roll);
this.formValue.controls['Name'].setValue(row.name);
this.formValue.controls['Department'].setValue(row.department);
this.formValue.controls['Marks'].setValue(row.marks);

}


studentEdit(){

this.studentmodel.roll=this.formValue.value.roll;
this.studentmodel.name=this.formValue.value.name;
this.studentmodel.department=this.formValue.value.department;
this.studentmodel.marks=this.formValue.value.marks;

this.api.editStudent(this.studentmodel.roll,this.studentmodel)
.subscribe(res=>{
  console.log(res);
  alert("Student Updated")
  this.formValue.reset();
  this.getAll();
},
err=>{alert("Student Not Updated")}
)

}


}
