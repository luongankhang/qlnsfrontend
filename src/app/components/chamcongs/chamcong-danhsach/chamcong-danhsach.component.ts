import { Component, OnInit } from '@angular/core';
import { ChamCong } from 'src/app/models/chamcong.model';
import { NhanVienOfPhongBan } from 'src/app/models/nhanvienofphongban.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-chamcong-danhsach',
  template: `<!-- Trong file category-list.component.html -->
    <div class="col-lg-12 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
          <div class="mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Nhập từ khóa tìm kiếm..."
            />
          </div>
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Tên nhân viên</th>
                  <th>Phòng ban</th>
                  <th>Ngày bắt đầu</th>
                  <th>Ngày kết thúc</th>
                  <th>Tiền lương</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  *ngFor="
                    let nhanVien of object$
                      | paginate : { itemsPerPage: 10, currentPage: p }
                  "
                >
                  <td>
                    {{ nhanVien.tenNhanVien }}
                  </td>
                  <td>
                    {{ nhanVien.phongBan }}
                  </td>
                  <td>
                    {{ nhanVien.ngayBatDau }}
                  </td>
                  <td>
                    {{ nhanVien.ngayKetThuc }}
                  </td>
                  <td>
                    {{ nhanVien.tienLuong }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!-- Shop-Pagination -->
    <div class="pagination-area">
      <div class="pagination-number">
        <pagination-controls (pageChange)="p = $event"></pagination-controls>
      </div>
    </div>
    <!-- Shop-Pagination /- --> `,
})
export class ChamcongDanhsachComponent implements OnInit {
  public object$!: ChamCong[];
  public nhanVien$!: NhanVienOfPhongBan[];
  public p: number = 1;

  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.danhSachChamCongs();
    this.danhSachNhanViens();
    this.enrichData();
  }

  private danhSachChamCongs() {
    this.http.getChamCongs().subscribe(
      (data: ChamCong[]) => {
        this.object$ = data;
      },
      (err) => {
        alert('Lấy danh sách thất bại.');
      }
    );
  }

  private danhSachNhanViens() {
    this.http.getNVOFPBs().subscribe(
      (data: NhanVienOfPhongBan[]) => {
        this.nhanVien$ = data;
        this.enrichData();
      },
      (err) => {
        alert('Lấy danh sách thất bại.');
      }
    );
  }

  private enrichData() {
    if (!this.object$ || !this.nhanVien$) {
      return;
    }

    this.object$.forEach((lichDiLam) => {
      const matchingNhanVien = this.nhanVien$.find(
        (nhanVien) => nhanVien.nhanVien.nhanVienId === lichDiLam.nhanVienId
      );

      if (matchingNhanVien) {
        lichDiLam.tenNhanVien = matchingNhanVien.nhanVien.tenNhanVien;
        lichDiLam.phongBan = matchingNhanVien.phongBan.tenPhongBan;
        lichDiLam.ngayBatDau = matchingNhanVien.ngayBatDauLamViec;
        lichDiLam.ngayKetThuc = matchingNhanVien.ngayKetThucLamViec;
      }
    });
  }
}
