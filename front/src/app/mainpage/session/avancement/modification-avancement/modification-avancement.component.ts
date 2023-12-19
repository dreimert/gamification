import { Component, OnInit } from '@angular/core';
import { CommonModule  } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators, FormControl } from "@angular/forms";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { HeaderComponent } from '../../../header/header.component';
import { Header } from '../../../header/header';
import { SessionService } from '../../../../services/session.service';
import { TeacherSession, Session } from '../../../../models/session.model';
import { niveaux, avancements } from '../avancement';

@Component({
  selector: 'app-modification-avancement',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ReactiveFormsModule, RouterLink,  MatAutocompleteModule, MatInputModule, MatFormFieldModule],
  templateUrl: './modification-avancement.component.html',
  styleUrl: './modification-avancement.component.css'
})
export class ModificationAvancementComponent implements OnInit {

  session!: Session | TeacherSession;
  section: Header = {name:`Session/SESSION_NAME/avancement/modifier`};

  filteredOptions!: Observable<string[]> | undefined;

  constructor(
    private sessionService: SessionService,
    private formBuilder: FormBuilder,
  ){}

  segments = window.location.href.split('/');
  sessionId = decodeURIComponent(this.segments[this.segments.length - 3].replace(/%20/g, ' ')) || 'URL does not have enough segments.';
  ngOnInit(): void {
    // get session info
    this.sessionService.getAvailableSessions().subscribe((sessions: Session[] | TeacherSession[] ) => {
      const sessionInfo = sessions.find((s: Session | TeacherSession) => s.id == this.sessionId);
      if (sessionInfo){
        this.session = sessionInfo;
      }
      else{
        console.log("name of session not found");
      }
      this.section = {
        name:`Session/${this.session.name}/avancement/modifier`
      }
    });

    // filter studient
    this.filteredOptions = this.avancementForm.get('name')?.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  avancementForm = this.formBuilder.group(
    {
      name: ['', [Validators.required, this.validateName.bind(this)]],
      avancement: ['', [Validators.required, this.validateAvance.bind(this)]]
    },
  )

  StuAvance!: string | null ;

  validateName(control: AbstractControl):ValidationErrors | null{
    const name:string = control.value;
    if(name){
      this.StuAvance = this.studients[name];
    }
    if (!name || this.studientsList.includes(name)){
      return null;
    }else{
      control.setErrors({ nameError: "Le nom entré n'existe pas" });
      return { nameError: "Le nom entré n'existe pas" };
    }
  }

  validateAvance(control: AbstractControl):ValidationErrors | null{
    const avance = control.value;
    if (this.StuAvance && avance && avance<this.StuAvance){
      control.setErrors({ avanceError: "Attention ! L'élève va aller à un niveau précédent !" });
      return { avanceError: "Attention ! L'élève va aller à un niveau précédent !" };
    }else{
      return null
    }
  }


  niveaux = Object.entries(niveaux).map(([key, value], index)=>{
    return{ id:index, key:key, value:value, }
  })
  avancements = [...avancements]
  studients: { [key:string]:string } = this.avancements.reduce((result: Record<string, string>, avancement)=>{
    result[avancement.name] = avancement.niveau;
    return result;
  }, {})
  studientsList = Object.keys(this.studients);


  private _filter(value: string | null): string[] {
    if (value){
      const filterValue = value.toLowerCase();
      return this.studientsList.filter(stu => stu.toLowerCase().includes(filterValue));
    }
    return this.studientsList
  }


  onSubmit(){
    window.location.href = `/session/${this.sessionId}/lookup/`;
  }
}