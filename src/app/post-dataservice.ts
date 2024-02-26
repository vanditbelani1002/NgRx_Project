import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { Post } from "./Model/post.model";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { HttpOptions } from "@ngrx/data/src/dataservices/interfaces";

@Injectable()
export class PostDataService extends DefaultDataService<Post>{
    constructor(http:HttpClient,HttpUrlGenerator:HttpUrlGenerator){
        super('Post',http,HttpUrlGenerator)
    }

    override getAll(options?: HttpOptions | undefined): Observable<Post[]> {
        return this.http.get<Post[]>(`http://localhost:3000/posts`).pipe(map((data)=>{
            const posts:Post[] = []
                posts.push(...data)
            return posts
        }))
    }
    
}