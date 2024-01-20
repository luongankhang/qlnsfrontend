import { Component, OnInit } from '@angular/core';
import { NhanVienOfPhongBan } from 'src/app/models/nhanvienofphongban.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-nvofpb-danhsach',
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
              (input)="timKiemNVOFPB(searchKeyword)"
            />
          </div>
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Tên nhân viên</th>
                  <th>Tên phòng ban</th>
                  <th>Ngày băt đầu làm việc</th>
                  <th>Ngày kết thúc làm việc</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  *ngFor="
                    let nvofpb of search$
                      | paginate : { itemsPerPage: 10, currentPage: p }
                  "
                >
                  <td>
                    {{ nvofpb.nhanVien.tenNhanVien }}
                  </td>
                  <td>
                    {{ nvofpb.phongBan.tenPhongBan }}
                  </td>
                  <td>
                    {{ nvofpb.ngayBatDauLamViec }}
                  </td>
                  <td>
                    {{ nvofpb.ngayKetThucLamViec }}
                  </td>
                  <td>
                    <button
                      class="btn btn-warning"
                      style="
                      margin-right: 5px;
                      background-color: #ffc107;
                      border-color: #ffc107;
                      color: #000;
                    "
                    >
                      Sửa
                    </button>
                    <button
                      class="btn btn-danger"
                      style="
                      margin-right: 5px;
                      background-color: #dc3545;
                      border-color: #dc3545;
                      color: #fff;
                    "
                      (click)="xoaNVOFPB(nvofpb.nvofpbId)"
                    >
                      Xóa
                    </button>
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
export class NvofpbDanhsachComponent implements OnInit {
  public object$!: NhanVienOfPhongBan[];
  public search$!: NhanVienOfPhongBan[];
  public searchKeyword!: string;
  public p: number = 1;

  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.danhSachNVOFPBs();
  }

  private danhSachNVOFPBs() {
    this.http.getNVOFPBs().subscribe(
      (data: NhanVienOfPhongBan[]) => {
        this.object$ = data;
        this.search$ = this.object$;
      },
      (err) => {
        alert('Lấy danh sách thất bại.');
      }
    );
  }

  public xoaNVOFPB(id: any) {
    this.http.delete('of', id).subscribe(
      (res) => {
        alert('Xóa thành công.');
        this.danhSachNVOFPBs();
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  public timKiemNVOFPB(query: string) {
    this.http.timKiemNVOFPB('of', query).subscribe(
      (data: NhanVienOfPhongBan[] | any) => {
        if (Array.isArray(data)) {
          console.log('Data is an array:', data);
          this.search$ = data;
        } else if (
          typeof data === 'object' &&
          data !== null &&
          Array.isArray(data.data)
        ) {
          console.log('Data is an object with array property:', data);
          this.search$ = data.data;
        } else {
          console.log('Data is not an array:', data);
          this.search$ = [];
        }
      },
      (err) => {
        console.error('Search error:', err);
        this.search$ = [];
        alert('Tìm kiếm thất bại.');
      }
    );
  }
}
