import { Injectable } from '@angular/core';
import { User } from './Model/user.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  users:User[]=[
    // {id:1,name:'John Smith',username:'js',password:'12345',hasAccess:true},
    // {id:2,name:'Steve Smith',username:'ts',password:'12345',hasAccess:false},
    // {id:3,name:'Gem Smith',username:'ks',password:'12345',hasAccess:false},
    // {id:4,name:'Smith',username:'ms',password:'12345',hasAccess:true}
  ]
  user!:User
  userName?:User

  getalluser(){
    this.http.get<User[]>('http://localhost:3000/Users').subscribe((data)=>{
      this.users=data
    })
    return this.http.get<User[]>('http://localhost:3000/Users')
  }

  createUser(name:string,password:string,username:string){
    this.userName=this.users.find((u)=> { return u.username===username})
    if(this.userName==undefined){
   this.user={
    id:(this.users.length+1).toString(),
    name:name,
    username:username,
    password:password,
    hasAccess:false
   }
   this.http.post<User>('http://localhost:3000/Users',this.user).subscribe((res)=>{
    console.log(res);
    alert(`${res.name}, You have Registered Successfully`)
   })
  }
  else{
    alert("Username is already Exists")
  }
}
}
