import { Component, OnInit } from '@angular/core';
import { LichDiLam } from 'src/app/models/lichdilam.model';
import { NhanVien } from 'src/app/models/nhanvien.model';
import { NhanVienOfPhongBan } from 'src/app/models/nhanvienofphongban.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-lichdilam-danhsach',
  template: `<!-- Trong file category-list.component.html -->
    <div class="col-lg-12 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
          <div class="mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Nhập từ khóa tìm kiếm..."
              [(ngModel)]="searchKeyword"
            />
          </div>
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Tên nhân viên</th>
                  <th>Phòng ban</th>
                  <th>Các ngày đi làm</th>
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
                    {{ nhanVien.cacNgayTrongTuan }}
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
export class LichdilamDanhsachComponent implements OnInit {
  public object$!: LichDiLam[];
  public nhanVien$!: NhanVienOfPhongBan[];
  public searchKeyword!: string;
  public p: number = 1;

  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.danhSachLichDiLam();
    this.danhSachNhanViens();
    this.enrichData();
  }

  private danhSachLichDiLam() {
    this.http.getLichDiLams().subscribe(
      (data: LichDiLam[]) => {
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
    if (!this.object$) {
      return;
    }

    this.object$.forEach((lichDiLam) => {
      const matchingNhanVien = this.nhanVien$.find(
        (nhanVien) => nhanVien.nhanVien.nhanVienId === lichDiLam.nhanVienId
      );

      if (matchingNhanVien) {
        lichDiLam.tenNhanVien = matchingNhanVien.nhanVien.tenNhanVien;
        lichDiLam.phongBan = matchingNhanVien.phongBan.tenPhongBan;
      }
    });
  }

  public xoaNhanVien(id: any) {
    this.http.delete('lich', id).subscribe(
      (res) => {
        alert('Xóa thành công.');
        this.danhSachLichDiLam();
      },
      (err) => {
        alert(err.message);
      }
    );
  }
}
