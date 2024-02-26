import { BlogModel } from "../Blog/blog.model";
import { counterModel } from "../counter.model";

export interface AppstateModel {
    counter:counterModel,
    blog: BlogModel[]
}