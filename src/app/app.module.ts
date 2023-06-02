import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { EstudanteComponent } from './estudante/estudante.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EstudanteFormComponent } from './estudante-form/estudante-form.component';

@NgModule({
  declarations: [
    AppComponent,
    EstudanteComponent,
    EstudanteFormComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
