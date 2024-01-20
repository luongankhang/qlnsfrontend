import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NhanVien } from 'src/app/models/nhanvien.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-lichdilam-them',
  template: ` <div class="container-fluid">
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
            <label for="ngayDiLam" class="form-label">Ngày đi làm</label>
            <select class="form-select" formControlName="cacNgayTrongTuan">
              <option *ngFor="let option of ngayDiLamOptions" [value]="option">
                {{ option }}
              </option>
            </select>
          </div>

          <div class="col-12">
            <button
              type="submit"
              class="btn btn-primary me-2"
              (click)="themLichDiLam($event)"
            >
              Thêm thông tin
            </button>
            <a href="lichdilam-danhsach" class="btn btn-light">Hủy</a>
          </div>
        </form>
      </div>
    </div>
  </div>`,
})
export class LichdilamThemComponent implements OnInit {
  public reacForm!: FormGroup;
  public nhanVien$!: NhanVien[];
  public ngayDiLamOptions: string[] = ['Mọi ngày trong tuần'];

  constructor(
    private http: HttpService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.danhSachNhanViens();
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

  private initForm() {
    this.reacForm = this.fb.group({
      nhanVienId: [],
      cacNgayTrongTuan: [],
    });
  }

  public themLichDiLam(event: any) {
    const lich = {
      nhanVienId: this.reacForm.get('nhanVienId')?.value,
      cacNgayTrongTuan: this.reacForm.get('cacNgayTrongTuan')?.value,
    };
    this.http.create('lich', lich).subscribe(
      (res) => {
        alert(res.message);
        this.router.navigate(['/lichdilam-danhsach']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }
}
