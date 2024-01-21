import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-login',
  template: `<!-- Sign In Start -->
    <div class="container-fluid">
      <div
        class="row h-100 align-items-center justify-content-center"
        style="min-height: 100vh"
      >
        <div class="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
          <div class="bg-light rounded p-4 p-sm-5 my-4 mx-3">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <a href="#" class="">
                <h3 class="text-primary">
                  <i class="fa fa-hashtag me-2"></i>DASHMIN
                </h3>
              </a>
              <h3>Đăng nhập</h3>
            </div>
            <form [formGroup]="reacForm">
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  id="floatingInput"
                  formControlName="username"
                />
                <label for="floatingInput">Tài khoản</label>
              </div>
              <div class="form-floating mb-4">
                <input
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  formControlName="password"
                />
                <label for="floatingPassword">Mật khẩu</label>
              </div>
              <button
                type="submit"
                class="btn btn-primary py-3 w-100 mb-4"
                (click)="login($event)"
              >
                Đăng nhập
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Sign In End --> `,
})
export class LoginComponent implements OnInit {
  public reacForm!: FormGroup;

  constructor(
    private http: HttpService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.reacForm = this.fb.group({
      username: [],
      password: [],
    });
  }

  public login(event: any) {
    const newObj = {
      username: this.reacForm.get('username')?.value,
      password: this.reacForm.get('password')?.value,
    };
    this.http.create('auth', newObj).subscribe(
      (res) => {
        if (res.data === 'ADMIN') {
          alert('Đăng nhập thành công.');
          sessionStorage.setItem('currentUser', newObj.username);
          this.router.navigate(['/nhanvien-danhsach']);
        } else {
          alert('Tài khoản không đủ quyền truy cập.');
        }
      },
      (err) => {
        alert(err.message);
      }
    );
  }
}
