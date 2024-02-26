import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BlogModel } from "./blog.model";
import { Observable, map, tap } from "rxjs";

@Injectable({
    providedIn:"root"
})

export class MasterService{
    constructor(private http:HttpClient){}
    haveaccess(){
        return true;
    }


    getAllBlogs(): Observable<BlogModel[]> {
        return this.http.get<BlogModel[]>('http://localhost:3000/bloglist')
    }
    createBlogs(bloginput:BlogModel): Observable<BlogModel> {
        return this.http.post<BlogModel>('http://localhost:3000/bloglist',bloginput).pipe(
            tap(()=>{
                this.http.get<BlogModel>(`http://localhost:3000/bloglist`)
            }))
    }
    updateBlog(bloginput:BlogModel): Observable<BlogModel> {
        return this.http.put<BlogModel>(`http://localhost:3000/bloglist/${bloginput.id}`,bloginput)
    }

    deleteBlogs(blogid:number):Observable<BlogModel>{
        return this.http.delete<BlogModel>(`http://localhost:3000/bloglist/${blogid}`)
    }
}