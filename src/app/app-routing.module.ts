import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NhanvienThemComponent } from './components/nhanviens/nhanvien-them/nhanvien-them.component';
import { PhongbanThemComponent } from './components/phongbans/phongban-them/phongban-them.component';
import { NhanvienDanhsachComponent } from './components/nhanviens/nhanvien-danhsach/nhanvien-danhsach.component';
import { PhongbanDanhsachComponent } from './components/phongbans/phongban-danhsach/phongban-danhsach.component';
import { NvofpbThemComponent } from './components/nhanvienofphongbans/nvofpb-them/nvofpb-them.component';
import { NvofpbDanhsachComponent } from './components/nhanvienofphongbans/nvofpb-danhsach/nvofpb-danhsach.component';
import { LichdilamThemComponent } from './components/lichdilams/lichdilam-them/lichdilam-them.component';
import { LichdilamDanhsachComponent } from './components/lichdilams/lichdilam-danhsach/lichdilam-danhsach.component';
import { ChamcongThemComponent } from './components/chamcongs/chamcong-them/chamcong-them.component';
import { ChamcongDanhsachComponent } from './components/chamcongs/chamcong-danhsach/chamcong-danhsach.component';
import { IndexComponent } from './components/index/index.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'index', component: IndexComponent },
  { path: 'nhanvien-them', component: NhanvienThemComponent },
  { path: 'nhanvien-danhsach', component: NhanvienDanhsachComponent },
  { path: 'phongban-them', component: PhongbanThemComponent },
  { path: 'phongban-danhsach', component: PhongbanDanhsachComponent },
  { path: 'nvofpb-them', component: NvofpbThemComponent },
  { path: 'nvofpb-danhsach', component: NvofpbDanhsachComponent },
  { path: 'lichdilam-them', component: LichdilamThemComponent },
  { path: 'lichdilam-danhsach', component: LichdilamDanhsachComponent },
  { path: 'chamcong-them', component: ChamcongThemComponent },
  { path: 'chamcong-danhsach', component: ChamcongDanhsachComponent },
  { path: '**', component: IndexComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
