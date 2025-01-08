import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
//import { AuthorizationComponent } from "./authorization.component";
import { inject } from "@angular/core";
import { AuthService } from "../../data/services/auth.service";

export const authTokenInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
    
    const token = inject(AuthService).token;

    console.log('Intercepted request: ', req, '; token? ', token);
    if (!token) return next (req);

    req = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    });

    return next(req);
}