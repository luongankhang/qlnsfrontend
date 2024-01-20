import { Component, OnInit } from '@angular/core';
import { NhanVien } from 'src/app/models/nhanvien.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-nhanvien-danhsach',
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
              (input)="timKiemNhanVien(searchKeyword)"
            />
          </div>
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Tên nhân viên</th>
                  <th>Ngày sinh</th>
                  <th>Địa chỉ</th>
                  <th>Vị trí công việc</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  *ngFor="
                    let nhanVien of search$
                      | paginate : { itemsPerPage: 10, currentPage: p }
                  "
                >
                  <td>
                    {{ nhanVien.tenNhanVien }}
                  </td>
                  <td>
                    {{ nhanVien.ngaySinh }}
                  </td>
                  <td>
                    {{ nhanVien.diaChi }}
                  </td>
                  <td>
                    {{ nhanVien.viTriCongViec }}
                  </td>
                  <td>
                    <button
                      class="btn btn-warning"
                      style="margin-right: 5px; background-color: #ffc107;border-color: #ffc107;color: #000;"
                    >
                      Sửa
                    </button>
                    <button
                      class="btn btn-danger"
                      style="margin-right: 5px;background-color: #dc3545; border-color: #dc3545; color: #fff;"
                      (click)="xoaNhanVien(nhanVien.nhanVienId)"
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
export class NhanvienDanhsachComponent implements OnInit {
  public object$!: NhanVien[];
  public search$!: NhanVien[];
  public searchKeyword!: string;
  public p: number = 1;

  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.danhSachNhanViens();
  }

  private danhSachNhanViens() {
    this.http.getNhanViens().subscribe(
      (data: NhanVien[]) => {
        this.object$ = data;
        this.search$ = this.object$;
      },
      (err) => {
        alert('Lấy danh sách thất bại.');
      }
    );
  }

  public xoaNhanVien(id: any) {
    this.http.delete('nhanvien', id).subscribe(
      (res) => {
        alert('Xóa thành công.');
        this.danhSachNhanViens();
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  public timKiemNhanVien(query: string) {
    this.http.timKiemNhanVien('nhanvien', query).subscribe(
      (data: NhanVien[] | any) => {
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

        // else if (this.search$.length == 0 || this.search$ == null) {
        //   alert('Không có nhân viên: ' + this.searchKeyword);
        // }
      },
      (err) => {
        console.error('Search error:', err);
        this.search$ = [];
        alert('Tìm kiếm thất bại.');
      }
    );
  }
}
