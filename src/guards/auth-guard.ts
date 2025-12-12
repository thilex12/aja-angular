import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // Verfier si l'utilisateur est authentifié
  const isAuthenticated = document.cookie.includes('email') && document.cookie.includes('password');
  // return isAuthenticated;
  if (isAuthenticated) {
    return true;
  } else {
    // Rediriger vers la page de login si non authentifié
    const router = inject(Router);
    router.navigate(['/login']);
    return false;
  }
};
