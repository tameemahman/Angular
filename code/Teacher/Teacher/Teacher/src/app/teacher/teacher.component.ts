import { Component, } from '@angular/core';
import { TeacherModel } from './teacher.model';
import { TeacherService } from '../service/teacher.service';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css'
})
export class TeacherComponent {


  teachermodel: TeacherModel = new TeacherModel();
  formValue!: FormGroup;

  teacherData: any;

  constructor(private api: TeacherService, private formBuilder: FormBuilder) {

  }


  ngOnInit(): void {

    this.formValue = this.formBuilder.group({

      id: [''],
      name: [''],
      department: [''],
      gender: [''],
      hobby: [''],
    });
    this.getAll();
  }


  savetacher() {

    this.teachermodel.id = this.formValue.value.id;
    this.teachermodel.name = this.formValue.value.name;
    this.teachermodel.department = this.formValue.value.department;
    this.teachermodel.gender = this.formValue.value.gender;
    this.teachermodel.hobby = this.formValue.value.hobby;
  
    this.api.teacherPost(this.teachermodel)
      .subscribe(res =>{
      console.log(res);
      alert("Teacher Added")
      this.formValue.reset();
      this.getAll();

    },

    err => {
      alert("Data not saved")

    })
  }


  getAll() {

    this.api.getAllTeacher()
      .subscribe(res => {
        this.teacherData = res;
      })
  }


  deleteTeacher(row: any) {
    this.api.deleteTeacher(row.id)
      .subscribe(res => {
        console.log(res);
        alert("Teacher Deleted")
        this.formValue.reset();
        this.getAll();

      },
        err => {

          alert("Data Not Saved")
        }
      )

  }
onEdit(row:any){
this.teachermodel.id=row.id;
this.formValue.controls['Id'].setValue(row.Id);
this.formValue.controls['Name'].setValue(row.Name);
this.formValue.controls['Department'].setValue(row.Department);
this.formValue.controls['Gender'].setValue(row.Gender);
this.formValue.controls['Hobby'].setValue(row.Hobby);



}


teacherEdit(){
this.teachermodel.id=this.formValue.value.id;
this.teachermodel.name=this.formValue.value.name;
this.teachermodel.department=this.formValue.value.department;
this.teachermodel.gender=this.formValue.value.gender;
this.teachermodel.hobby=this.formValue.value.hobby;

this.api.editTeacher(this.teachermodel.id,this.teachermodel)
.subscribe(res=>{
  console.log(res);
  alert("Tacher Updated")
  this.formValue.reset();
  this.getAll();
},
err=>{alert("Data Not Updated")}

)

}

}
