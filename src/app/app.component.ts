import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Event, NavigationEnd, NavigationStart, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CounterbuttonComponent } from './counterbutton/counterbutton.component';
import { CounterdisplayComponent } from './counterdisplay/counterdisplay.component';
import { CustomcounterComponent } from './customcounter/customcounter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReactiveformComponent } from './reactiveform/reactiveform.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EntityDataService } from '@ngrx/data';
import { PostDataService } from './post-dataservice';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSort } from '@angular/material/sort';
import { UserService } from './user.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './auth.service';
import { NgIf } from '@angular/common';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CounterbuttonComponent,CounterdisplayComponent,CustomcounterComponent,FormsModule,ReactiveFormsModule,RouterLink,HttpClientModule,MatTableModule,MatSortModule,MatToolbarModule,MatButtonModule,RouterLinkActive,NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit,DoCheck{
  title = 'ng-rg-project';
  spinner:boolean=false;
  login:boolean=false;
  
  constructor(entityDataService:EntityDataService,PostDataService:PostDataService,private userservice:UserService, private router: Router,private authservice:AuthService){
    entityDataService.registerService('Post',PostDataService)
  }
  ngOnInit(): void {
    this.userservice.getalluser()
  }
 ngDoCheck(): void {
    this.login=this.authservice.islogged
    // console.log(this.login);
    
  }
  
}
