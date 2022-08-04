import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  details = { email: '123', name: '123', username: '123' };
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}
  gEmail: any;
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const email = routeParams.get('email');

    console.log(email);
    this.http
      .get<any>(`http://localhost:8000/api/user/profile/${email}`)
      .subscribe((data) => {
        console.log(data);
        this.details.email = data.details.email;
        this.details.name = data.details.name;
        this.details.username = data.details.username;
        console.log('hjvkb ', this.details);
      });
  }
  deleteUser() {
    const routeParams = this.route.snapshot.paramMap;
    const email = routeParams.get('email');
    this.http
      .delete<any>(`http://localhost:8000/api/user/profile/${email}`)
      .subscribe({
        next: (data) => {
          console.log('After Deletion', data);
          Swal.fire({
            title: 'Are you sure want to remove?',
            text: 'You will not be able to recover this file!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it',
          }).then((result) => {
            if (result.value) {
              Swal.fire(
                'Deleted!',
                'User deleted successfully.',
                'success'
              );
              this.router.navigateByUrl('/login');
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire('Cancelled', 'User not deleted :)', 'error');
            }
          });
          
          
        },
        error: (error) => {
          // this.errorMessage = error.message;
          console.error('There was an error!', error);
        },
      });
  }
}
