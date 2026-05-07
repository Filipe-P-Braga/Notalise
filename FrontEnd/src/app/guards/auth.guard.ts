import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const user = localStorage.getItem('user');

  if (user) return true;

  return inject(Router).createUrlTree(['/login']);
};
