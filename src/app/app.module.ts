import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { NhanvienThemComponent } from './components/nhanviens/nhanvien-them/nhanvien-them.component';
import { IndexComponent } from './components/index/index.component';
import { PhongbanThemComponent } from './components/phongbans/phongban-them/phongban-them.component';
import { NhanvienDanhsachComponent } from './components/nhanviens/nhanvien-danhsach/nhanvien-danhsach.component';
import { PhongbanDanhsachComponent } from './components/phongbans/phongban-danhsach/phongban-danhsach.component';
import { NvofpbThemComponent } from './components/nhanvienofphongbans/nvofpb-them/nvofpb-them.component';
import { NvofpbDanhsachComponent } from './components/nhanvienofphongbans/nvofpb-danhsach/nvofpb-danhsach.component';
import { LichdilamThemComponent } from './components/lichdilams/lichdilam-them/lichdilam-them.component';
import { LichdilamDanhsachComponent } from './components/lichdilams/lichdilam-danhsach/lichdilam-danhsach.component';
import { ChamcongThemComponent } from './components/chamcongs/chamcong-them/chamcong-them.component';
import { ChamcongDanhsachComponent } from './components/chamcongs/chamcong-danhsach/chamcong-danhsach.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NhanvienThemComponent,
    IndexComponent,
    PhongbanThemComponent,
    NhanvienDanhsachComponent,
    PhongbanDanhsachComponent,
    NvofpbThemComponent,
    NvofpbDanhsachComponent,
    LichdilamThemComponent,
    LichdilamDanhsachComponent,
    ChamcongThemComponent,
    ChamcongDanhsachComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
