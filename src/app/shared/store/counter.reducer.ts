import { createReducer, on } from "@ngrx/store"
import { initialState } from "./counter.state"
import { customincrement, decrement, increment, reset } from "./counter.actions"

const _counterReducer = createReducer(initialState,
    on(increment,(state)=>{
        return {
            
            ...state,
            counter: state.counter + 1
        }
    }),
    on(decrement,(state)=>{
        return {
            ...state,
            counter: state.counter - 1
        }
    }),
    on(reset,(state)=>{
        return {
            ...state,
            counter: 0
        }
    }),
    on(customincrement,(state,action)=>{
        return {
            ...state,
            counter: action.action=='add'?state.counter+action.vlaue:state.counter-action.vlaue
        }
    })
    
    )



export function counterReducer(state:any,action:any){
    return _counterReducer(state,action)
}