import { Injectable } from "@angular/core";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data";
import { Post } from "./Model/post.model";
@Injectable({
    providedIn:"root"
})
export class PostService extends EntityCollectionServiceBase<Post>{
    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory){
        
        super('Post',serviceElementsFactory)
    }
}