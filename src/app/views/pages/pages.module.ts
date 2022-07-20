import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { ButtonModule, CardModule, FormModule, GridModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { LoginService } from 'src/app/services/app-service/login.service';
import { HandleError } from 'src/app/shared/util/handleError-util';
import { HttpOptions } from 'src/app/shared/util/http-options-util';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent,
    Page404Component,
    Page500Component
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormModule,
    FormsModule
  ],
  providers: [
    CookieService,
    LoginService,
    HandleError,
    HttpOptions
  ],
})
export class PagesModule {
}
