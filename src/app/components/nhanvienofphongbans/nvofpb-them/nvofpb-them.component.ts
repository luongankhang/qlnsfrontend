import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NhanVien } from 'src/app/models/nhanvien.model';
import { PhongBan } from 'src/app/models/phongban.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-nvofpb-them',
  template: `<div class="container-fluid">
    <div class="card">
      <div class="card-body">
        <form class="row g-3" [formGroup]="reacForm">
          <div class="col-12">
            <label for="exampleSelect" class="form-label">Nhân viên</label>
            <select class="form-select" formControlName="nhanVien">
              <option
                *ngFor="let nhanVien of nhanVien$"
                [value]="nhanVien.nhanVienId"
              >
                {{ nhanVien.tenNhanVien }}
              </option>
            </select>
          </div>

          <div class="col-12">
            <label for="exampleSelect" class="form-label">Phòng ban</label>
            <select class="form-select" formControlName="phongBan">
              <option
                *ngFor="let phongBan of phongBan$"
                [value]="phongBan.phongBanId"
              >
                {{ phongBan.tenPhongBan }}
              </option>
            </select>
          </div>

          <div class="col-12">
            <label for="exampleInputUsername1" class="form-label"
              >Ngày bắt đầu làm việc</label
            >
            <input
              type="date"
              class="form-control"
              formControlName="ngayBatDauLamViec"
            />
          </div>

          <div class="col-12">
            <label for="exampleInputUsername1" class="form-label"
              >Ngày kết thúc làm việc</label
            >
            <input
              type="date"
              class="form-control"
              formControlName="ngayKetThucLamViec"
            />
          </div>

          <div class="col-12">
            <button
              type="submit"
              class="btn btn-primary me-2"
              (click)="themNVOFPB($event)"
            >
              Thêm thông tin
            </button>
            <a href="nvofpb-danhsach" class="btn btn-light">Hủy</a>
          </div>
        </form>
      </div>
    </div>
  </div> `,
})
export class NvofpbThemComponent implements OnInit {
  public reacForm!: FormGroup;
  public nhanVien$!: NhanVien[];
  public phongBan$!: PhongBan[];

  constructor(
    private http: HttpService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.danhSachNhanViens();
    this.danhSachPhongBans();
  }

  private initForm() {
    this.reacForm = this.fb.group({
      nhanVien: [],
      phongBan: [],
      ngayBatDauLamViec: [],
      ngayKetThucLamViec: [],
    });
  }

  private danhSachNhanViens() {
    this.http.getNhanViens().subscribe(
      (data: NhanVien[]) => {
        this.nhanVien$ = data;
      },
      (err) => {
        alert('Lấy danh sách thất bại.');
      }
    );
  }

  private danhSachPhongBans() {
    this.http.getPhongBans().subscribe(
      (data: PhongBan[]) => {
        this.phongBan$ = data;
      },
      (err) => {
        alert('Lấy danh sách thất bại.');
      }
    );
  }

  public themNVOFPB(event: any) {
    const of = {
      nhanVien: {
        nhanVienId: this.reacForm.get('nhanVien')?.value,
      },
      phongBan: {
        phongBanId: this.reacForm.get('phongBan')?.value,
      },
      ngayBatDauLamViec: this.reacForm.get('ngayBatDauLamViec')?.value,
      ngayKetThucLamViec: this.reacForm.get('ngayKetThucLamViec')?.value,
    };
    this.http.create('of', of).subscribe(
      (res) => {
        alert(res.message);
        this.router.navigate(['/nvofpb-danhsach']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }
}
