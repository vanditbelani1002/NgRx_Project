import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule,FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { User } from '../Model/user.model';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{
  // @ViewChild('username') username!:ElementRef
  // @ViewChild('password') password!:ElementRef
  // @ViewChild('name') name!:ElementRef
  constructor(private userservice:UserService, private router:Router){}
  form!: FormGroup;
  name!:string
  username!:string
  password!:string
  cpassword!:string
  hasAccess=false
  users?:User[]

  onSubmit(data:any){
    this.name=data.name;
    this.password=data.password
    this.cpassword=data.cpassword
    this.username=data.username
    if(this.password===this.cpassword){
      this.userservice.createUser(this.name,this.password,this.username)
      this.router.navigate(['/login'])
    }
    else{
      alert("Please enter Same Password")
    }
  }
  
  ngOnInit(): void {
    this.form= new FormGroup({
      name: new FormControl('',[Validators.required]),
      password: new FormControl(null,Validators.required),
      cpassword: new FormControl(null,Validators.required),
      username: new FormControl(null,Validators.required)
    });
    // this.userservice.getalluser()
    // console.log(this.userservice.users);
    
  }
}
