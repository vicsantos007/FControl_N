import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdentificadorComponent } from './identificador/identificador.component';

import { UsuarioComponent } from './usuario/usuario.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Cadastros'
    },
    children: [
      {
        path: '',
        redirectTo: 'usuario'
      },
      {
        path: 'usuario',
        component: UsuarioComponent,
        data: {
          title: 'Usuario'
        }
      },
      {
        path: 'identificador',
        component: IdentificadorComponent,
        data: {
          title: 'identificador'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroRoutingModule {
}