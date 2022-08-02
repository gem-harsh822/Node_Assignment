import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  details = {email:"123", name: "123", username: "123"};
  constructor(private route:ActivatedRoute,private http:HttpClient) { }

    ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const email = routeParams.get('email');
    console.log(email);
    this.http.get<any>(`http://localhost:8000/api/user/profile/${email}`).subscribe(data => {
        console.log(data);
        this.details.email = data.details.email;
        this.details.name = data.details.name;
        this.details.username = data.details.username;
        console.log("hjvkb ",this.details);
    }) 
    
  }

}
