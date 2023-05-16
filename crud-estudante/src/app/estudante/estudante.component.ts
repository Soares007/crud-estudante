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
  isEditing: boolean = false;
  formGroupEstudante: FormGroup;

  constructor(private EstudantesService: EstudantesService,
    private formBuilder: FormBuilder

  ) {
    this.formGroupEstudante = formBuilder.group({
      id: [''],
      name: [''],
      email: [''],
      cpf: [''],
      telefone: ['']
    });
  }
  ngOnInit(): void {
    this.loadEstudantes();
  }

  loadEstudantes() {
    this.EstudantesService.getEstudantes().subscribe({
      next: data => this.estudantes = data
    });
  }

  save() {
    if (this.isEditing) {
      this.EstudantesService.update(this.formGroupEstudante.value).subscribe(
        {
          next: () => {
            this.loadEstudantes();
            this.formGroupEstudante.reset();
            this.isEditing = false;
          }

        }
      );
    }
    else {
      this.EstudantesService.save(this.formGroupEstudante.value).subscribe(
        {
          next: data => {
            this.estudantes.push(data)
            this.formGroupEstudante.reset();

          }
        }
      );
    }
  }

  edit(estudantes: Estudante) {
    this.formGroupEstudante.setValue(estudantes);
    this.isEditing = true;
  }

  delete(estudantes: Estudante) {
    this.EstudantesService.delete(estudantes).subscribe(
      {
        next: () => this.loadEstudantes()
      }
    );
  }

  clear() {
    return this.formGroupEstudante.reset();
  }

}
