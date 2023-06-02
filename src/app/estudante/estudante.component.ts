import { EstudantesService } from './../estudantes.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Estudante } from '../estudantes';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-estudante',
  templateUrl: './estudante.component.html',
  styleUrls: ['./estudante.component.css']
})
export class EstudanteComponent implements OnInit {

  estudantes: Estudante[] = [];
  student: Estudante = {} as Estudante;
  isEditing: boolean = false;
  constructor(private EstudantesService: EstudantesService) {
  }

  ngOnInit(): void {
    this.loadEstudantes();
  }

  loadEstudantes() {
    this.EstudantesService.getEstudantes().subscribe({
      next: data => this.estudantes = data
    });
  }

  onCleanEvent(){
    this.isEditing = false;
  }

  onSaveEvent(student: Estudante) {
    if (this.isEditing) {
      this.EstudantesService.update(student).subscribe(
        {
          next: () => {
            this.loadEstudantes();
            this.isEditing = false;
          }

        }
      );
    }
    else {
      this.EstudantesService.save(student).subscribe(
        {
          next: data => {
            this.estudantes.push(data)
          }
        }
      );
    }
}

edit(Estudante: Estudante) {
  this.student = Estudante;
  this.isEditing = true;
}

delete(student: Estudante) {
  this.EstudantesService.delete(student).subscribe(
    {
      next: () => this.loadEstudantes()
    }
  );
}
}
