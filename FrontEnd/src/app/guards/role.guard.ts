import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserRole } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const raw = localStorage.getItem('user');

  if (!raw) return router.createUrlTree(['/login']);

  const user = JSON.parse(raw) as { role: UserRole };
  const allowedRoles: UserRole[] = route.data['roles'];

  if (!allowedRoles || allowedRoles.includes(user.role)) return true;
  return router.createUrlTree(['/']);
};
