import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {User} from '../../shared/interfaces/user.interface';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;

  constructor(private authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder,
              ) {}

  ngOnInit() {
    this.signinForm = this.formBuilder.group({
      email: new FormControl(null, [ Validators.required, Validators.email ]),
      password: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    const { email, password } = this.signinForm.value;
    this.authService.signin({ email, password } as User).subscribe(
      () => this.router.navigateByUrl('summary'));
    this.signinForm.reset();
  }

}
