import { NhanVien } from './nhanvien.model';
import { PhongBan } from './phongban.model';

export interface NhanVienOfPhongBan {
  nvofpbId: string;
  nhanVien: NhanVien;
  phongBan: PhongBan;
  ngayBatDauLamViec: Date;
  ngayKetThucLamViec: Date;
}
