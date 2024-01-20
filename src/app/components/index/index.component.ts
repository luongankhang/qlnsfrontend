import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  template: `<!-- partial:partials/_navbar.html -->
    <div *ngIf="isSessionActive()">
      <nav
        class="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex align-items-top flex-row"
      >
        <div
          class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start"
        >
          <div class="me-3">
            <button
              class="navbar-toggler navbar-toggler align-self-center"
              type="button"
              data-bs-toggle="minimize"
            >
              <span class="icon-menu"></span>
            </button>
          </div>
        </div>
        <div class="navbar-menu-wrapper d-flex align-items-top">
          <button
            class="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
            type="button"
            data-bs-toggle="offcanvas"
          >
            <span class="mdi mdi-menu"></span>
          </button>
        </div>
      </nav>
      <!-- partial -->
      <div class="container-fluid page-body-wrapper">
        <!-- partial -->
        <!-- partial:partials/_sidebar.html -->
        <nav class="sidebar sidebar-offcanvas" id="sidebar">
          <ul class="nav">
            <li class="nav-item">
              <a class="nav-link" href="../index.html">
                <i class="mdi mdi-grid-large menu-icon"></i>
                <span class="menu-title">Dashboard</span>
              </a>
            </li>
            <li class="nav-item nav-category">Chức năng</li>
            <li class="nav-item">
              <a
                class="nav-link"
                data-bs-toggle="collapse"
                href="#form-elements"
                aria-expanded="false"
                aria-controls="form-elements"
              >
                <i class="menu-icon mdi mdi-card-text-outline"></i>
                <span class="menu-title">Nhân viên</span>
                <i class="menu-arrow"></i>
              </a>
              <div class="collapse" id="form-elements">
                <ul class="nav flex-column sub-menu">
                  <li class="nav-item">
                    <a class="nav-link" href="nhanvien-them">Thêm nhân viên</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="nhanvien-danhsach"
                      >Danh sách nhân viên</a
                    >
                  </li>
                </ul>
              </div>

              <a
                class="nav-link"
                data-bs-toggle="collapse"
                href="#form-elements2"
                aria-expanded="false"
                aria-controls="form-elements"
              >
                <i class="menu-icon mdi mdi-card-text-outline"></i>
                <span class="menu-title">Phòng ban</span>
                <i class="menu-arrow"></i>
              </a>
              <div class="collapse" id="form-elements2">
                <ul class="nav flex-column sub-menu">
                  <li class="nav-item">
                    <a class="nav-link" href="phongban-them">Thêm phòng ban</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="phongban-danhsach"
                      >Danh sách phòng ban</a
                    >
                  </li>
                </ul>
              </div>

              <a
                class="nav-link"
                data-bs-toggle="collapse"
                href="#form-elements3"
                aria-expanded="false"
                aria-controls="form-elements"
              >
                <i class="menu-icon mdi mdi-card-text-outline"></i>
                <span class="menu-title">NV OF PB</span>
                <i class="menu-arrow"></i>
              </a>
              <div class="collapse" id="form-elements3">
                <ul class="nav flex-column sub-menu">
                  <li class="nav-item">
                    <a class="nav-link" href="nvofpb-them">Thêm NV OF PB</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="nvofpb-danhsach"
                      >Danh sách NV OF PB</a
                    >
                  </li>
                </ul>
              </div>

              <a
                class="nav-link"
                data-bs-toggle="collapse"
                href="#form-elements4"
                aria-expanded="false"
                aria-controls="form-elements"
              >
                <i class="menu-icon mdi mdi-card-text-outline"></i>
                <span class="menu-title">Lịch đi làm</span>
                <i class="menu-arrow"></i>
              </a>
              <div class="collapse" id="form-elements4">
                <ul class="nav flex-column sub-menu">
                  <li class="nav-item">
                    <a class="nav-link" href="lichdilam-them"
                      >Thêm lịch đi làm</a
                    >
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="lichdilam-danhsach"
                      >Danh sách lịch đi làm</a
                    >
                  </li>
                </ul>
              </div>

              <a
                class="nav-link"
                data-bs-toggle="collapse"
                href="#form-elements5"
                aria-expanded="false"
                aria-controls="form-elements"
              >
                <i class="menu-icon mdi mdi-card-text-outline"></i>
                <span class="menu-title">Chấm công</span>
                <i class="menu-arrow"></i>
              </a>
              <div class="collapse" id="form-elements5">
                <ul class="nav flex-column sub-menu">
                  <li class="nav-item">
                    <a class="nav-link" href="chamcong-them">Thêm chấm công</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="chamcong-danhsach"
                      >Danh sách chấm công<</a
                    >
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>
        <!-- partial -->
        <div class="main-panel">
          <div class="content-wrapper">
            <div class="row">
              <router-outlet></router-outlet>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div *ngIf="!isSessionActive()">
      <app-login></app-login>
    </div>`,
})
export class IndexComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.setSessionTimeout(60 * 60 * 1000);
  }

  public isSessionActive(): boolean {
    const currentUser = sessionStorage.getItem('currentUser');
    return currentUser !== null;
  }

  private setSessionTimeout(timeout: number): void {
    setTimeout(() => {
      sessionStorage.removeItem('currentUser');
    }, timeout);
  }
}
