import { createReducer, on } from "@ngrx/store"
import { Blogstate } from "./blog.state"
import { addblog, addblogsuccess, deleteblog, loadblog, loadblogfail, loadblogsuccess, updateblog, updateblogsuccess } from "./blog.actions"
import { BlogModel } from "./blog.model"



const _blogReducer = createReducer(Blogstate,
    on(loadblog,(state)=>{
        return {
            ...state
        }
    }),
    on(addblogsuccess,(state,action)=>{
        const _blog={...action.bloginput}
        _blog.id=(state.bloglist.length+1).toString()
        return {
            ...state,
            bloglist:[...state.bloglist,_blog]
        }
    }),
    on(updateblogsuccess,(state,action)=>{
        const _blog={...action.bloginput}
        // console.log(_blog);
        
        const upadatedblog =state.bloglist.map(blog=>{
            return _blog.id===blog.id?_blog:blog
        })
        return {
            ...state,
            bloglist: upadatedblog  
        }
    }),
    on(deleteblog,(state,action)=>{
        const deleteblog= state.bloglist.filter((data:BlogModel)=>{
            
            return data.id !== action.id.toString()
        })
        return {
            ...state,
            bloglist: deleteblog
        }
    }),
    on(loadblogsuccess,(state,action)=>{
        return {
            ...state,
            bloglist: [...action.bloglist],
            Errormessage:''
        }
    }),
    on(loadblogfail,(state,action)=>{
        return {
            ...state,
            bloglist: [],
            Errormessage:action.Errortext
        }
    })
    
)



export function blogReducer(state:any,action:any){
    return _blogReducer(state,action)
}