import { createSelector, createFeatureSelector } from "@ngrx/store"
import { BlogModel, blogs } from "./blog.model"


const getblogstate = createFeatureSelector<blogs>('blog')

export const getblog = createSelector(getblogstate,(state)=>{
   return state.bloglist
})
export const getbloginfo = createSelector(getblogstate,(state)=>{
   return state
})
export const getblogbyid= (blogid:number) => createSelector(getblogstate,(state)=>{
   return state.bloglist.find((blog:BlogModel)=>blog.id===blogid.toString()) as BlogModel
})