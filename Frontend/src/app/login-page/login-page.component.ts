import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  arr: any;
  submited: boolean = false;
  constructor(private formBuilder: FormBuilder, private router: Router) {}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required, Validators.minLength(5)],
      password: ['', Validators.required, Validators.minLength(6)],
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  redirectToSignup() {
    this.router.navigateByUrl('/signup');
  }
  onSubmit() {
    var isPresent = true;
    // this.arr =
    //   localStorage.getItem('users') === null
    //     ? []
    //     : JSON.parse(localStorage.getItem('users') || 'null');
    // console.log(this.arr.length);
    // if (this.arr.length > 0) {
    //   for (let index = 0; index < this.arr.length; index++) {
    //     const element = this.arr[index];
    //     // console.log((this.arr[index])['name']);
    //     if (
    //       this.arr[index]['name'] === this.loginForm.value.name &&
    //       this.arr[index]['password'] === this.loginForm.value.password
    //     ) {
    //       isPresent = true;
    //       alert('USer Found');
    //       this.loginForm.reset();
    //       return;
    //     }
    //   }
    // }
    if (!isPresent) {
      alert('User Not Found --- Please Signup before login!');
    } else {
      this.router.navigateByUrl('/profile');
    }
    this.loginForm.reset();
    // console.log(this.arr);
  }
}
