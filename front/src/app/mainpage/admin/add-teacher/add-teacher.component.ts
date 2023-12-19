import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Header} from '../../header/header'
import {FormBuilder,ReactiveFormsModule, ValidationErrors, Validators} from "@angular/forms"
import { timer } from "rxjs";
import { AddTeacher } from '../../../models/admin.model';
import { HeaderComponent } from '../../header/header.component';
@Component({
  selector: 'app-add-teacher',
  standalone: true,
  imports: [CommonModule,HeaderComponent,ReactiveFormsModule],
  templateUrl: './add-teacher.component.html',
  styleUrl: './add-teacher.component.css'
})
export class AddTeacherComponent {
  usersList : User[]=[];
  tps: TP[] = [];
  section : Header={
    name:'Admin/ajouter_encadrant',
  }
  constructor(
    private formBuilder: FormBuilder,
  ){}

  ngOnInit(): void {
    this.fetchUsersList();
    this.fetchTp();
  }

  addTeacherForm = this.formBuilder.group(
    {
        name: ["", [Validators.required]],
        TP: ["", Validators.required],
    },
  );
  fetchUsersList(): void {
    //add a small delay to simulate a real http request
    timer(5000).subscribe(() => {
        this.usersList = users;
    });
  }
  fetchTp(): void {
    //add a small delay to simulate a real http request
    timer(5000).subscribe(() => {
        this.tps = TP;
    });
  }
  onSubmit(id: string) {
    if (id=="save"){
      if(confirm("Etes-vous sûr de vouloir ajouter l'encadrant "+this.addTeacherForm.value.name+" ?")){
        const addTeacher: AddTeacher = {
          name: this.addTeacherForm.value.name as string,
          TPs: this.addTeacherForm.value.TP as string,
        };
      }
      
    }
    window.location.href = "/admin/";
  }
}
interface User {
  firstname: string;
  lastname: string;
  id: string;
}

const users = [
  { firstname:"Damien", lastname:"Reimert", id: "1d234cef65487" },
  { firstname:"Tristan", lastname:"Roussillon", id: "1d4578cab" },
  { firstname:"Stéphane", lastname:"Frenot", id: "7c54de9fa654" },
  { firstname:"Abdel", lastname:"Taya", id: "406e05f94304"},
  { firstname:"Xinyi", lastname:"Zhao", id: "90f9cf8ccf90"},
  { firstname:"Valentin", lastname:"Lemaire", id: "173cae034c4b"}
];

interface TP {
  name: string;
  id: string;
}

const TP = [
  { name:"Tout", id:"173cae034c4b"},
  { name: "Kafka", id: "1d234cef65487" },
  { name: "Scrapping", id: "1d4578cab" },
  { name: "TP2", id: "7c54de9fa654" },
];