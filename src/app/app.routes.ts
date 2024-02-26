import { Routes } from '@angular/router';
import { CounterbuttonComponent } from './counterbutton/counterbutton.component';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { PostslistComponent } from './postslist/postslist.component';
import { ReactiveformComponent } from './reactiveform/reactiveform.component';
import { LoginComponent } from './login/login.component';
import { canActivate } from './auth.guard';
import { BlogcardComponent } from './blogcard/blogcard.component';
import { SignupComponent } from './signup/signup.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'counter',component:CounterbuttonComponent},
    {path:'blog',loadComponent:()=>import('../app/blog/blog.component').then(m=>m.BlogComponent)},
    {path:'blog/:id',component:BlogcardComponent},
    {path:'posts',component:PostslistComponent, canActivate:[canActivate]},
    {path:'form',loadComponent:()=>import('../app/reactiveform/reactiveform.component').then(m=>m.ReactiveformComponent),canDeactivate:[(component:ReactiveformComponent)=>{component.canExit()}]},
    {path:'login',component:LoginComponent},
    {path:'signup',component:SignupComponent},
    {path:'**',component:PagenotfoundComponent}
];
