import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioComponent } from './usuario/usuario.component';
import { IdentificadorComponent } from '../cadastros/identificador/identificador.component';
import { UsuarioService } from '../services/cadastro-service/usuario.service';
import { CadastroRoutingModule } from '../cadastros/cadastro-routing.module';
import { CardModule } from '@coreui/angular';
import { GridModule } from '@coreui/angular';
import { AvatarModule } from '@coreui/angular';
import { ButtonModule } from '@coreui/angular';
import { FormModule } from '@coreui/angular';
import { TableModule } from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OperadorAutenticado } from '../shared/util/operador-autenticado-util';
import { ValidacaoForms } from '../shared/util/validacao-forms-util';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { ModalModule } from '@coreui/angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { DatePipe } from '@angular/common';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [
    UsuarioComponent,
    IdentificadorComponent
  ],
  imports: [ 
    CardModule,
    GridModule,
    AvatarModule,
    ButtonModule,
    FormModule,
    TableModule,
    CommonModule,
    CadastroRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IconModule,
    ModalModule,
    NgxPaginationModule,
    ImageCropperModule
  ],
  exports: [],
  providers: [
    UsuarioService,
    OperadorAutenticado,
    ValidacaoForms,
    IconSetService,
    DatePipe
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CadastroModule {}
