import { blogReducer } from "../Blog/blog.reducer";
import { counterReducer } from "../counter.reducer";



export const Appstate={
    counter:counterReducer,
    blog:blogReducer
}