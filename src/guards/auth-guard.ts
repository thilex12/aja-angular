import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // Verfier si l'utilisateur est authentifié
  // const isAuthenticated = document.cookie.includes('email') && document.cookie.includes('password');
  // const password = document.cookie.split('; ').find(row => row.startsWith('password='))?.split('=')[1];
  // return isAuthenticated;
  const isAuthenticated = localStorage.getItem('email') !== null && localStorage.getItem('password') !== null;
  if (isAuthenticated) {
    return true;
  } else {
    // Rediriger vers la page de login si non authentifié
    const router = inject(Router);
    router.navigate(['/login']);
    return false;
  }
};
