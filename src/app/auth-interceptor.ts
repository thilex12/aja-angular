import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // return next(req);
  req = req.clone({
    headers: req.headers.set('Authorization', 'Basic '+ btoa(localStorage.getItem("username") + ":" + atob(localStorage.getItem("password")!)))
    .set('Content-Type', 'application/json')
  });
  return next(req);
};
