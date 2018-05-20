import { Injectable, Injector} from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'
import { RegisterService } from './register.service'

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private inject : Injector) { }

  intercept(req,next){
    let authService = this.inject.get(RegisterService)
    let tokenizedReq = req.clone({
      setHeaders : {
        Authorization : `Bearer ${authService.getToken()}`
      }
    })
    return next.handle(tokenizedReq)
  }

  //intercept httml for jwt false token

}
