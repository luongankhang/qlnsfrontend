import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NhanVien } from 'src/app/models/nhanvien.model';
import { NhanVienOfPhongBan } from 'src/app/models/nhanvienofphongban.model'; // Thay thế bằng đường dẫn đến tệp tin NhanVienOfPhongBan
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-chamcong-them',
  template: `<div class="container-fluid">
    <div class="card">
      <div class="card-body">
        <form class="row g-3" [formGroup]="reacForm">
          <div class="col-12">
            <label for="exampleSelect" class="form-label">Nhân viên</label>
            <select class="form-select" formControlName="nhanVienId">
              <option
                *ngFor="let nhanVien of nhanVien$"
                [value]="nhanVien.nhanVienId"
              >
                {{ nhanVien.tenNhanVien }}
              </option>
            </select>
          </div>

          <div class="col-12">
            <button
              type="submit"
              class="btn btn-primary me-2"
              (click)="themChamCong($event)"
            >
              Thêm thông tin
            </button>
            <a href="chamcong-danhsach" class="btn btn-light">Hủy</a>
          </div>
        </form>
      </div>
    </div>
  </div> `,
})
export class ChamcongThemComponent implements OnInit {
  public reacForm!: FormGroup;
  public nhanVien$!: NhanVien[];
  public nhanVien2$!: NhanVienOfPhongBan[];

  constructor(
    private http: HttpService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.danhSachNhanViens();
    this.danhSachNhanVien2s();
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

  private danhSachNhanVien2s() {
    this.http.getNVOFPBs().subscribe(
      (data: NhanVienOfPhongBan[]) => {
        this.nhanVien2$ = data;
      },
      (err) => {
        alert('Lấy danh sách thất bại.');
      }
    );
  }

  private initForm() {
    this.reacForm = this.fb.group({
      nhanVienId: [],
    });
  }

  public themChamCong(event: any) {
    const nhanVienId = this.reacForm.get('nhanVienId')?.value;
    const nhanVien = this.nhanVien2$.find(
      (nv) => nv.nhanVien.nhanVienId === nhanVienId
    );

    if (nhanVien) {
      const ngayBatDau = new Date(nhanVien.ngayBatDauLamViec);
      const ngayKetThuc = new Date(nhanVien.ngayKetThucLamViec);

      const soNgayLamViec =
        Math.floor(
          (ngayKetThuc.getTime() - ngayBatDau.getTime()) / (1000 * 60 * 60 * 24)
        ) + 1;

      const tienCong = soNgayLamViec * 100000;

      // console.log('Tiền công:', tienCong);

      const chamCong = {
        nhanVienId: nhanVienId,
        tienLuong: tienCong,
      };

      // console.log(chamCong);

      this.http.create('chamcong', chamCong).subscribe(
        (res) => {
          alert(res.message);
          this.router.navigate(['/chamcong-danhsach']);
        },
        (err) => {
          alert(err.message);
        }
      );
    } else {
      alert('Không tìm thấy thông tin nhân viên.');
    }
  }
}
