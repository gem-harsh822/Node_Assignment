import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomvalidationService } from '../custom-validations.service';
import { HttpClient } from '@angular/common/http';
import { switchAll } from 'rxjs';
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
    private customValidator: CustomvalidationService,
    private http: HttpClient
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
    if (this.signupForm.valid) {
      var data = {
        name: this.signupForm.value.name,
        email: this.signupForm.value.email,
        username: this.signupForm.value.username,
        password: this.signupForm.value.password,
        confirmpassword: this.signupForm.value.confirmPassword,
      };
      // console.log(data);

      var req = {
        method: 'POST',
        url: 'http://localhost:8000/api/user/register',
        data: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      };
      this.http
        .post<any>(req.url, req.data, { headers: req.headers })
        .subscribe((res) => {
          console.log('res--->', res);
          // console.log(req.data);
          if (res) {
            alert('Thanks for signing up Redirecting to login page.');
            this.router.navigateByUrl('/login');
          }
        });
    }
    // this.router.navigateByUrl('/login');
  }
}
