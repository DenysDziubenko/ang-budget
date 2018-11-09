import {NgModule} from '@angular/core';
import {SigninComponent} from './signin/signin.component';
import {SignupComponent} from './signup/signup.component';
import {ButtonModule, CardModule, InputTextModule, PasswordModule, TooltipModule} from 'primeng/primeng';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {AuthService} from '../services/auth.service';
import {AuthRoutingModule} from './auth-routing.module';

@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    CardModule,
    InputTextModule,
    TooltipModule,
    ButtonModule,
    AuthRoutingModule,
    SharedModule
  ],
  providers: [AuthService]
})
export class AuthModule {}
