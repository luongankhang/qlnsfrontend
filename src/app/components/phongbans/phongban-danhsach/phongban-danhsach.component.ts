import { Component, OnInit } from '@angular/core';
import { PhongBan } from 'src/app/models/phongban.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-phongban-danhsach',
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
              (input)="timKiemPhongBan(searchKeyword)"
            />
          </div>
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Tên phòng ban</th>
                  <th>Mô tả phòng ban</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  *ngFor="
                    let phongBan of search$
                      | paginate : { itemsPerPage: 10, currentPage: p }
                  "
                >
                  <td>
                    {{ phongBan.tenPhongBan }}
                  </td>
                  <td>
                    {{ phongBan.moTaPhongBan }}
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
                      (click)="xoaPhongBan(phongBan.phongBanId)"
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
export class PhongbanDanhsachComponent implements OnInit {
  public object$!: PhongBan[];
  public search$!: PhongBan[];
  public searchKeyword!: string;
  public p: number = 1;

  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.danhSachPhongBans();
  }

  private danhSachPhongBans() {
    this.http.getPhongBans().subscribe(
      (data: PhongBan[]) => {
        this.object$ = data;
        this.search$ = this.object$;
      },
      (err) => {
        alert('Lấy danh sách thất bại.');
      }
    );
  }

  public xoaPhongBan(id: any) {
    this.http.delete('phongban', id).subscribe(
      (res) => {
        alert('Xóa thành công.');
        this.danhSachPhongBans();
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  public timKiemPhongBan(query: string) {
    this.http.timKiemPhongBan('phongban', query).subscribe(
      (data: PhongBan[] | any) => {
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
