import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.user$.pipe(
    take(1),
    map((user) => {
      if (user) return true;
      else {
        console.warn(
          'Truy cập bị từ chối: Người dùng chưa đăng nhập. Chuyển hướng đến trang đăng nhập.'
        );
        return router.createUrlTree(['/login']);
      }
    })
  );
};
