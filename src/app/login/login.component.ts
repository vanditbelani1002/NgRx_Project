import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule,MatButtonModule,MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private userservice:UserService,private authservice: AuthService,private router:Router,private activeroute:ActivatedRoute){}
  
  @ViewChild('username') username!:ElementRef
  @ViewChild('password') password!:ElementRef

  ngOnInit(): void {
    this.activeroute.queryParamMap.subscribe((query)=>{
      const logout = Boolean(query.get('logout'))
      if(logout){
        this.authservice.logout();
        alert('You are Logged out Successfully')
        this.router.navigate(['/login'])
      }
    })
  }

  onLogin(){
    const username = this.username.nativeElement.value;
    const password = this.password.nativeElement.value;

    const user =this.authservice.login(username,password);
    

    if(user===undefined){
      alert('The Login Credential is not correct')
    }
    else{
      alert(`welcome ${user.name} you are successfully logged in`)
      this.router.navigate([''])
      
    }
  }
}
