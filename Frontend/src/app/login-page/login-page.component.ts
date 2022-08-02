import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomvalidationService } from '../custom-validations.service';
import { HttpClient } from '@angular/common/http';
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
    private customValidator: CustomvalidationService,
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
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
    console.log(this.loginForm);

    if (this.loginForm.valid) {
      var data = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      var req = {
        method: 'POST',
        url: 'http://localhost:8000/api/user/login',
        data: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      };
      this.http
        .post<any>(req.url, req.data, { headers: req.headers })
        .subscribe((res) => {
          console.log('res--->', res, res.status);
          console.log('status', res.status);

          if (res.status === 'success') {
            alert('Thanks for loging in.');
            this.router.navigateByUrl('/profile');
          } else {
            alert(res.message);
          }
        });
    }
    // var isPresent = true;
    // if (!isPresent) {
    //   alert('User Not Found --- Please Signup before login!');
    // } else {
    //   this.router.navigateByUrl('/profile');
    // }
    // this.loginForm.reset();
    // console.log(this.arr);
  }
}
