// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  User as FirebaseUser,
} from '@angular/fire/auth';
import { Observable, from } from 'rxjs'; // `from` để chuyển Promise thành Observable
import { map } from 'rxjs/operators';
import { Router } from '@angular/router'; // Để chuyển hướng sau khi login/logout

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // `currentUser$` là một Observable theo dõi trạng thái đăng nhập của người dùng.
  // Nó sẽ phát ra `FirebaseUser` nếu người dùng đã đăng nhập, hoặc `null` nếu chưa.
  currentUser$: Observable<FirebaseUser | null>;

  constructor(private auth: Auth, private router: Router) {
    // `onAuthStateChanged` là một hàm lắng nghe sự thay đổi trạng thái xác thực.
    // Chúng ta bọc nó trong một Observable bằng cách sử dụng `new Observable`
    // để biến đổi các sự kiện thay đổi trạng thái thành một luồng dữ liệu RxJS.
    this.currentUser$ = new Observable<FirebaseUser | null>((subscriber) => {
      // Hàm `onAuthStateChanged` trả về một hàm hủy đăng ký (unsubscribe function).
      // Khi Observable này bị hủy đăng ký, hàm unsubscribe này sẽ được gọi.
      const unsubscribe = onAuthStateChanged(this.auth, (user) => {
        subscriber.next(user); // Phát ra người dùng hiện tại (hoặc null)
      });
      return unsubscribe; // Trả về hàm hủy đăng ký
    });
  }

  /**
   * Đăng ký người dùng mới bằng email và mật khẩu.
   * @param email Email của người dùng.
   * @param password Mật khẩu của người dùng.
   * @returns Observable của thông tin xác thực người dùng.
   */
  register(email: string, password: string): Observable<any> {
    // `createUserWithEmailAndPassword` trả về một Promise.
    // `from` operator của RxJS chuyển Promise này thành một Observable.
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  /**
   * Đăng nhập người dùng bằng email và mật khẩu.
   * @param email Email của người dùng.
   * @param password Mật khẩu của người dùng.
   * @returns Observable của thông tin xác thực người dùng.
   */
  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  /**
   * Đăng xuất người dùng hiện tại.
   * @returns Observable<void> (không phát ra giá trị nào khi hoàn thành).
   */
  logout(): Observable<void> {
    return from(signOut(this.auth)).pipe(
      // Sau khi đăng xuất thành công, chuyển hướng người dùng đến trang đăng nhập.
      map(() => {
        this.router.navigate(['/login']);
      })
    );
  }

  /**
   * Kiểm tra xem người dùng đã đăng nhập hay chưa (đồng bộ).
   * KHÔNG NÊN DÙNG CHO CÁC LOGIC QUAN TRỌNG VỀ UI HOẶC BẢO MẬT ROUTE
   * vì `currentUser` có thể chưa được đồng bộ hóa ngay lập tức.
   * Sử dụng `currentUser$` Observable để xử lý bất đồng bộ là tốt nhất.
   * @returns `true` nếu có người dùng đăng nhập, ngược lại `false`.
   */
  isLoggedIn(): boolean {
    return !!this.auth.currentUser;
  }
}
