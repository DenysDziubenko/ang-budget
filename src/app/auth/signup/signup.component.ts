import {Component, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {User} from '../../shared/interfaces/user.interface';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  @ViewChild('form') form: FormGroup;

  constructor(private authService: AuthService,
              private router: Router) {}

  onSubmit() {
    const { email, password, firstName, lastName } = this.form.value;
    this.authService.signup({ email, password, firstName, lastName } as User)
      .subscribe(() => this.router.navigateByUrl('/signin'));
    this.form.reset();
  }
}
