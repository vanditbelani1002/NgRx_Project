import { Injectable, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './Model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userservice:UserService) { }
  islogged:boolean = false
  hasAccess:boolean=false


  login(username:string,password:string){
   let user = this.userservice.users.find((u)=>u.username===username && u.password===password)

  if(user===undefined){
    this.islogged =false
  }
  else{
    this.islogged=true
    this.hasAccess=this.checkAccess(user)

  }
  return user
}

  checkAccess(user:User){
    if(this.islogged){
      return user.hasAccess
    }
    else{
      return false
    }
  }

  logout(){
    this.islogged=false
  }

  isAuthenticated(){
    return this.islogged
  }

}