import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-nhanvien-them',
  template: `
    <div class="container-fluid">
      <div class="card">
        <div class="card-body">
          <form class="row g-3" [formGroup]="reacForm">
            <div class="col-12">
              <label for="exampleInputUsername1" class="form-label"
                >Tên nhân viên</label
              >
              <input
                type="text"
                class="form-control"
                formControlName="tenNhanVien"
              />
            </div>
            <div class="col-12">
              <label for="exampleInputUsername1" class="form-label"
                >Ngày sinh</label
              >
              <input
                type="date"
                class="form-control"
                formControlName="ngaySinh"
              />
            </div>
            <div class="col-12">
              <label for="exampleInputUsername1" class="form-label"
                >Địa chỉ</label
              >
              <textarea
                style="height: 10vh"
                type="text"
                class="form-control"
                formControlName="diaChi"
              ></textarea>
            </div>
            <div class="col-12">
              <label for="exampleInputUsername1" class="form-label"
                >Vị trí công việc</label
              >
              <input
                type="text"
                class="form-control"
                formControlName="viTriCongViec"
              />
            </div>
            <div class="col-12">
              <button
                type="submit"
                class="btn btn-primary me-2"
                (click)="themNhanVien($event)"
              >
                Thêm thông tin
              </button>
              <a href="nhanvien-danhsach" class="btn btn-light">Hủy</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
})
export class NhanvienThemComponent implements OnInit {
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
      tenNhanVien: [],
      ngaySinh: [],
      diaChi: [],
      viTriCongViec: [],
    });
  }

  public themNhanVien(event: any) {
    const nhanVien = {
      tenNhanVien: this.reacForm.get('tenNhanVien')?.value,
      ngaySinh: this.reacForm.get('ngaySinh')?.value,
      diaChi: this.reacForm.get('diaChi')?.value,
      viTriCongViec: this.reacForm.get('viTriCongViec')?.value,
    };
    this.http.create('nhanvien', nhanVien).subscribe(
      (res) => {
        alert(res.message);
        this.router.navigate(['/nhanvien-danhsach']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }
}
