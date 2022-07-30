import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomvalidationService } from '../custom-validations.service';
@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
})
export class SignupPageComponent implements OnInit {
  signupForm!: any;
  submitted: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private customValidator: CustomvalidationService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
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
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: this.customValidator.MatchPassword(
          'password',
          'confirmPassword'
        ),
      }
    );
  }
  get signupFormControl() {
    return this.signupForm.controls;
  }
  onSubmit() {
    console.log('Clicked');
    alert('Thanks for signing up Redirecting to login page.');
    this.router.navigateByUrl('/login');
  }
}
