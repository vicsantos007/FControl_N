import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AvatarModule, ButtonModule, CardModule, FormModule, GridModule, ModalModule, TableModule } from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { OperadorAutenticado } from '../shared/util/operador-autenticado-util';
import { ValidacaoForms } from '../shared/util/validacao-forms-util';
import { OperadorComponent } from './operador/operador.component';
import { OperadorService } from '../services/cadastro-service/operador.service';
import { OperadorRoutingModule } from '../operacional/operacional-routing.module';

@NgModule({
  imports: [
    CardModule,
    GridModule,
    AvatarModule,
    ButtonModule,
    FormModule,
    TableModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OperadorRoutingModule,
    IconModule,
    ModalModule,
    NgxPaginationModule
  ],
  declarations: [
    OperadorComponent
  ],
  providers:[
    OperadorService,
    OperadorAutenticado,
    ValidacaoForms,
    IconSetService,
    DatePipe
  ],  
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class OperacionalModule { }
