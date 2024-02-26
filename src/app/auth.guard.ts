import { inject } from "@angular/core"
import { AuthService } from "./auth.service"
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router"
import { ReactiveformComponent } from "./reactiveform/reactiveform.component"
import { UserService } from "./user.service"
import { map } from "rxjs"

export const canActivate = ()=>{
    const authservice = inject(AuthService)
    const router = inject(Router)
    // return checkUserAccess()
    if(authservice.isAuthenticated() && authservice.hasAccess){
        return true
    }
    else if(authservice.isAuthenticated() && !authservice.hasAccess){
        alert('You dont have access of posts page')
            return false
    }
    else{
        alert('You are not Logged in Please Login to access posts page')
        router.navigate(['/login'])
        return false
    }
}

// export const checkUserAccess = ()=>{
//     const userservice = inject(UserService)
//     return userservice.getalluser().pipe(map((data)=>{
//         if(data.find((d)=>d.username==='js')?.hasAccess){
//             return true
//           }
//           else{
//             alert('You dont have access of posts page')
//             return false
//           }
//     }))
// }
