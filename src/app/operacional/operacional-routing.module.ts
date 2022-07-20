import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperadorComponent } from './operador/operador.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Operacional'
    },
    children: [
      {
        path: '',
        redirectTo: 'operador'
      },
      {
        path: 'operador',
        component: OperadorComponent,
        data: {
          title: 'Operador'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperadorRoutingModule {
}