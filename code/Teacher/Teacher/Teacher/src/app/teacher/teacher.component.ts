import { Component,OnInit } from '@angular/core';
import { TeacherModel } from './teacher.model';
import { TeacherService } from '../service/teacher.service';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css'
})
export class TeacherComponent  implements OnInit {


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
      // hobby: [''],
      hobby_reading: [false],
    hobby_gaming:[false],
    hobby_fishing:[false],
    hobby_sleeping:[false],
    });
    this.getAll();
  }


  savetacher() {

    this.teachermodel.id = this.formValue.value.id;
    this.teachermodel.name = this.formValue.value.name;
    this.teachermodel.department = this.formValue.value.department;
    this.teachermodel.gender = this.formValue.value.gender;
    // this.teachermodel.hobby = this.formValue.value.hobby;
    let hobbies: string[] = [];
  if (this.formValue.value.hobby_reading) {
    hobbies.push('Reading');
  }
  if (this.formValue.value.hobby_gaming) {
    hobbies.push('Gaming');
  }
  if (this.formValue.value.hobby_fishing){
    hobbies.push('Fishing')
  }
  if (this.formValue.value.hobby_sleeping){
    hobbies.push('Sleeping')
  }
  this.teachermodel.hobby = hobbies;
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
this.formValue.controls['Id'].setValue(row.id);
this.formValue.controls['Name'].setValue(row.name);
this.formValue.controls['Department'].setValue(row.department);
this.formValue.controls['Gender'].setValue(row.gender);
this.formValue.controls['Hobby'].setValue(row.hobby);



}


teacherEdit(){
// this.teachermodel.id=this.formValue.value.id;
// this.teachermodel.name=this.formValue.value.name;
// this.teachermodel.department=this.formValue.value.department;
// this.teachermodel.gender=this.formValue.value.gender;
// this.teachermodel.hobby=this.formValue.value.hobby;
this.teachermodel.id = this.formValue.value.id;
    this.teachermodel.name = this.formValue.value.name;
    this.teachermodel.department = this.formValue.value.department;
    this.teachermodel.gender = this.formValue.value.gender;
    // this.teachermodel.hobby = this.formValue.value.hobby;
    let hobbies: string[] = [];
  if (this.formValue.value.hobby_reading) {
    hobbies.push('Reading');
  }
  if (this.formValue.value.hobby_gaming) {
    hobbies.push('Gaming');
  }
  if (this.formValue.value.hobby_fishing){
    hobbies.push('Fishing')
  }
  if (this.formValue.value.hobby_sleeping){
    hobbies.push('Sleeping')
  }
  this.teachermodel.hobby = hobbies;
this.api.editTeacher(this.teachermodel.id,this.teachermodel)
.subscribe(res=>{
  console.log(res);
  alert("Teacher Updated")
  this.formValue.reset();
  this.getAll();
},
err=>{alert("Teacher Not Updated")}

)

}

}
