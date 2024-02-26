import { Component, OnInit } from '@angular/core';
import { PostService } from '../post-entity-service';
import { Post } from '../Model/post.model';
import { Observable } from 'rxjs';
import { NgFor, NgForOf, NgIf } from '@angular/common';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-postslist',
  standalone: true,
  imports: [NgFor,MatTableModule,NgIf ],
  templateUrl: './postslist.component.html',
  styleUrl: './postslist.component.css'
})
export class PostslistComponent implements OnInit {
  data$!: Observable<Post[]>
  posts: Post[]=[]
  constructor(private Postservice:PostService){}
  dataSource = this.posts;
  displayedColumns: string[] = ['title','description'];
  ngOnInit(): void {
     this.Postservice.getAll().subscribe((data)=>{
       this.posts = data
       this.dataSource=this.posts
       
    })
  }
}
