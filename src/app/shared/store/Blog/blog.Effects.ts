import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MasterService } from "./master.services";
import { LOAD_BLOG, addblog, addblogsuccess, deleteblog, deleteblogsuccess, loadblogfail, loadblogsuccess, updateblog, updateblogsuccess } from "./blog.actions";
import { EMPTY, catchError, exhaustAll, exhaustMap, map, of } from "rxjs";


@Injectable()

export class BlogEffects {
    constructor(private action$: Actions, private service: MasterService) { }

    _blog = createEffect(() =>
        this.action$.pipe(
            ofType(LOAD_BLOG),
            exhaustMap((action) => {
                return this.service.getAllBlogs().pipe(
                    map((data) => {
                        return loadblogsuccess({ bloglist: data })
                    }),
                    catchError((error) =>of(loadblogfail({Errortext:error.message})))
                )
            })
        )
    )
    _Addblog = createEffect(() =>
        this.action$.pipe(
            ofType(addblog),
            exhaustMap((action) => {
                return this.service.createBlogs(action.bloginput).pipe(
                    map((data) => { 
                        return addblogsuccess({ bloginput: action.bloginput })
                    }),
                    catchError((error) =>of(loadblogfail({Errortext:error.message})))
                )
            })
        )
    )
    _Updateblog = createEffect(() =>
        this.action$.pipe(
            ofType(updateblog),
            exhaustMap((action) => {
                return this.service.updateBlog(action.bloginput).pipe(
                    map(() => { 
                        return updateblogsuccess({ bloginput: action.bloginput })
                    }),
                    catchError((error) =>of(loadblogfail({Errortext:error.message})))
                )
            })
        )
    )
    _Deleteblog = createEffect(() =>
        this.action$.pipe(
            ofType(deleteblog),
            exhaustMap((action) => {
                return this.service.deleteBlogs(action.id).pipe(
                    map((data) => {
                        return deleteblogsuccess({ id:action.id })
                    }),
                    catchError((error) =>of(loadblogfail({Errortext:error.message})))
                )
            })
        )
    )

    

}