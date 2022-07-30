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
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private customValidator: CustomvalidationService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group(
      {
        name: ['', Validators.required, Validators.minLength(5)],
        email: ['', Validators.required],
        password: [
          '',
          Validators.compose([
            Validators.required,
            this.customValidator.patternValidator(),
          ]),
        ],
        confirmPassword: ['', Validators.required, Validators.minLength(6)],
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
