import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { filter, map, take } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.currentUser.pipe(
    filter((val) => val !== null),
    take(1),
    map((isAutenticated) => {
      console.log('isAutenticated :', isAutenticated);
      if (isAutenticated) {
        return true;
      } else {
        return router.createUrlTree(['/']);
      }
    })
  );
};
// 36 min guard по тек.времени сделан
