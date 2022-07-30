import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomvalidationService } from '../custom-validations.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  arr: any;
  submitted: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private customValidator: CustomvalidationService
  ) {}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [
        '',
        [Validators.required],
        this.customValidator.userNameValidator.bind(this.customValidator),
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          this.customValidator.patternValidator(),
        ]),
      ],
    });
  }
  get loginFormControl() {
    return this.loginForm.controls;
  }
  redirectToSignup() {
    this.router.navigateByUrl('/signup');
  }
  onSubmit() {
    var isPresent = true;
    if (!isPresent) {
      alert('User Not Found --- Please Signup before login!');
    } else {
      this.router.navigateByUrl('/profile');
    }
    this.loginForm.reset();
    // console.log(this.arr);
  }
}
