import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../shared/store/Blog/master.services';
import { BlogModel } from '../shared/store/Blog/blog.model';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { AppstateModel } from '../shared/store/global/appstate.model';
import { getbloginfo } from '../shared/store/Blog/blog.selector';
import { loadblog } from '../shared/store/Blog/blog.actions';

@Component({
  selector: 'app-blogcard',
  standalone: true,
  imports: [MatCardModule,MatDivider,MatButtonModule],
  templateUrl: './blogcard.component.html',
  styleUrl: './blogcard.component.css'
})
export class BlogcardComponent implements OnInit{

  constructor(private activatedRoute:ActivatedRoute, private blogservice:MasterService, private router:Router,private store:Store<AppstateModel>){}
  blogid!:any
  bloglist:BlogModel[] = []
  blog?:BlogModel
  ngOnInit(): void {
    this.blogid=this.activatedRoute.snapshot.paramMap.get('id')
    // console.log(this.blogid);
    this.blogservice.getAllBlogs().subscribe((item)=>{
      // this.bloglist=item
      // console.log(this.bloglist);
      this.blog=item.find((blog)=>blog.id==this.blogid);
      // console.log(this.blog); 
    })
    
  }
  goBack(){
    // console.log("Go Back");
    this.router.navigate(['/blog'])
  }
}
